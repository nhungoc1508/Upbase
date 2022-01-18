const Product = require('../models/product');

module.exports.index = async (req, res) => {
    let products = await Product.find({}).sort({_id: -1});
    res.render('product/index', { products })
};

module.exports.renderNewProduct = (req, res) => {
    res.render('product/new')
};

module.exports.createNewProduct = async (req, res) => {
    delete req.session.returnTo;
    const product = new Product(req.body.product);
    await product.save();
    res.redirect(`/${product._id}`)
};

module.exports.showProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('product/show', { product })
};

module.exports.renderEditProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('product/edit', { product })
};

module.exports.editProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, { ...req.body.product }, { new: true });
    await product.save();
    req.flash('success', 'Successfully updated product!');
    res.redirect(`/${product._id}`)
};

module.exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted product!')
    res.redirect('/')
};