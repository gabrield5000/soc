'use strict';

const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    category: { type: String, required: true },
    category_id: { type: Number, required: true }
});

module.exports = mongoose.model('Category', categorySchema);