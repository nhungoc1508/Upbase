const express = require('express');
const router = express.Router();
const admin = require('../controllers/admin');
const catchAsync = require('../utils/catchAsync');

router.route('/products')
    .get(catchAsync(admin.renderProducts))
    .put(catchAsync(admin.updateProduct))
    .delete(catchAsync(admin.deleteProduct));

module.exports = router;