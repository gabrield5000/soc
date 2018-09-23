'use strict';

const mongoose = require('mongoose');
const crypto = require('crypto');
const { Schema } = mongoose;

const Product = require('../models/productModel');

const orderSchema = new Schema({
	payment: { type: Schema.Types.ObjectId, ref: 'Payment' },
	products: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }],
	quantity: { type: Number, required: true, default: 1 },
	price:{ type: Number, required: true, default: 0 },
	createAt: { type: Date, default: Date.now },
	closeAt: { type: Date, default: Date.now },
	status: { type: String, required: true, default: 'order is processing' },
	hash: String
});

orderSchema.pre('save', async function (next) {
	try {
		this.hash = this.createHash(this.hash);
		next();
	} catch (error) {
		next(error);
	}
});

orderSchema.methods = {
	createHash: function(hash) {
		return crypto.randomBytes(16).toString('hex');
	}
};

module.exports = mongoose.model('Order', orderSchema);