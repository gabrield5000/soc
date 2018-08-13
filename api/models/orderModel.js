'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    payment: { type: Schema.Types.ObjectId, required: true, ref: 'Payment' },
    client: { type: Schema.Types.ObjectId, required: true , ref: 'User' },
    products: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true }
    }],
    price:{ type: Number, required: true, default: 0 },
    createAt: { type: Date, default: Date.now },
    status: { type: String, required: true, default: 'Transaction Pending' },
    hash: { type: String, required: true, default: 'hash' }
});

module.exports = mongoose.model('Order', orderSchema);