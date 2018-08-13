'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentSchema = new Schema({
    name: { type: String, required: true },
    icon: { type: String, required: true, default: '/img/payment/placeholder.png' },
    url: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    createdAt: { type: Number, default: Date.now },
    updatedAt: { type: Number, default: Date.now }
});

module.exports = mongoose.model('Bookshelf', paymentSchema);