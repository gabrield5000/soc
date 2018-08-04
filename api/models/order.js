'use strict';

const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    // name: String,
    // price: Number,
    // date: { type: Date, default: Date.now }
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: {type: Number, default: 1 }
});

module.exports = mongoose.model('Order', orderSchema);