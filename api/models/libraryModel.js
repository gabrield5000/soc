'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const librarySchema = new Schema({
    product: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }],
    quantity: {type: Number, default: 1 }
});

module.exports = mongoose.model('Library', librarySchema);