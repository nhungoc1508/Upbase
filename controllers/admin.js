const Product = require('../models/product');

module.exports.renderProducts = async (req, res) => {
    const products = await Product.find({});
    res.render('admin/manage-products', { products })
};

module.exports.updateProduct = async (req, res) => {
    const productId = req.query.product;
    const { name, price, stock } = req.body.product;
    const product = await Product.findByIdAndUpdate(productId, { name, price, stock }, { new: true });
    await product.save();
    req.flash('success', `Successfully updated ${product.name}!`);
    res.redirect('/manage/products')
};

module.exports.deleteProduct = async (req, res) => {
    const id = req.query.product;
    const product = await Product.findById(id);
    const productName = product.name;
    await Product.findByIdAndDelete(id);
    req.flash('success', `Successfully deleted ${productName}!`);
    res.redirect('/manage/products')
};