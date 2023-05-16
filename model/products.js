const mongoose = require('mongoose');

const Products = new mongoose.Schema({
    product_id: { type: String },
    product_name: { type: String },
    description: { type: String },
    price: { type: Number },
    amount: { type: Number },
    image: { type: String }

}, {
    timestamps: true
});

module.exports = mongoose.model('products', Products)

