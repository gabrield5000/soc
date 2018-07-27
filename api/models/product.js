const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);