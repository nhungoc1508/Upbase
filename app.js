if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express')
const favicon = require('serve-favicon')
const ejsMate = require('ejs-mate')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
const session = require('express-session')
const path = require('path')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const { parse } = require('json2csv')

const Product = require('./models/product')
const productRoutes = require('./routes/products')

const ExpressError = require('./utils/ExpressError');

const app = express()
const port = process.env.PORT || 3000
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')))
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/upbase';
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const secret = process.env.SECRET || 'asecret';

const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: secret,
    }
});

store.on('error', function (e) {
    console.log("Session store error", e)
});

const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

app.use(session(sessionConfig))
app.use(flash())

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.info = req.flash('info');
    next();
})

app.use('/', productRoutes)

app.all('*', (req, res, next) => {
    next(new ExpressError("Page not found", 404))
})

app.use((err, req, res, next) => {
    let statusCode, message
    if (process.env.NODE_ENV !== "production") {
        statusCode, message = err
    } else {
        statusCode = 404
        message = "Page not found"
    }
    res.status(statusCode).render('error', { message, err });
})