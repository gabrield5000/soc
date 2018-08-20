'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const Product = require('../models/productModel');

const orderSchema = new Schema({
    // payment: { type: Schema.Types.ObjectId, required: true, ref: 'Payment' },
    // client: { type: Schema.Types.ObjectId, required: true , ref: 'User' },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }],
    quantity: { type: Number, required: true, default: 1 },
    price:{ type: Number, required: true, default: 0 },
    createAt: { type: Date, default: Date.now }
    // closeAt: { type: Date, default: Date.now },
    // status: { type: String, required: true, default: 'Transaction Pending' },
    // hash: { type: String, required: true, default: 'hash' }
});

// orderSchema.pre('save', async function (next) {
//     try {
        
//     } catch (error) {
        
//     }
// });

module.exports = mongoose.model('Order', orderSchema);