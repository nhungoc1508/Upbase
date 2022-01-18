const express = require('express');
const router = express.Router();
const products = require('../controllers/products');
const catchAsync = require('../utils/catchAsync');
const Product = require('../models/product');

router.route('/')
    .get(catchAsync(products.index))
    .post(catchAsync(products.createNewProduct));

router.get('/new', products.renderNewProduct);

router.get('/export', products.exportProducts);

router.route('/:id')
    .get(catchAsync(products.showProduct))
    .post(catchAsync(products.addProduct))
    .put(catchAsync(products.editProduct))
    .delete(catchAsync(products.deleteProduct));

router.get('/:id/edit', catchAsync(products.renderEditProduct));

module.exports = router;