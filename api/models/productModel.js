'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    title:       { type: String, required: true },
    series:        String,
    book:          Number,
    author:      { type: String, required: true },
    description: { type: String, required: true },
    price:       { type: Number, required: true },
    date:        { type: Date, default: Date.now },
    category:    { type: Schema.Types.ObjectId, required: true, ref: 'Category'},
    imagePath:   { type: String, require: true }
});

module.exports = mongoose.model('Product', productSchema);
