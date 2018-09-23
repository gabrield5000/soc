'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentSchema = new Schema({
	provider: { type: String, required: true },
	codeProvider: { type: Number, required: true },
	price: { type: Number, required: true, default: 0 },
	hash: { type: String, required: true, default: 'hash' },
	createdAt: { type: Number, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);

