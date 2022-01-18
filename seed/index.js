const mongoose = require('mongoose');
const products = require('./products');
const Product = require('../models/product');

if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/upbase';

mongoose.connect(dbUrl, {
    useNewUrlParser    : true,
    useUnifiedTopology : true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

let num_items
if (isNaN(parseInt(process.argv[2]))) {
    num_items = 20
} else {
    num_items = parseInt(process.argv[2])
}

const seedDB = async () => {
    await Product.deleteMany({});
    let randProducts = products.sort(() => .5 - Math.random()).slice(0, num_items)
    for (let i = 0; i < randProducts.length; i++) {
        const product = randProducts[i];
        const newProduct = new Product({
            name: product.product_name,
            price: product.product_price,
        });
        await newProduct.save()
    }
    console.log(`Added ${num_items} random products to database.`)
}

seedDB().then(() => {
    mongoose.connection.close();
})

