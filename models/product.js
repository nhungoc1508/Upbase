const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        
    },
    stock: {
        type: Number,
        required: true,
        default: 100,
        min: 0,
        
    }
});

module.exports = mongoose.model('Product', ProductSchema);;