'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    // name: String,
    // price: Number,
    // date: { type: Date, default: Date.now }
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
    product: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }],
    date: { type: Date, default: Date.now },
    quantity: {type: Number, default: 1 }
});

module.exports = mongoose.model('Order', orderSchema);