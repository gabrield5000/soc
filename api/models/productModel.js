'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    title:       { type: String, required: true },
    series:      String,
    book:        Number,
    author:      { type: String, required: true },
    description: { type: String, required: true },
    price:       { type: Number, required: true },
    date:        { type: Date, default: Date.now },
    category:    [{ type: String }],
    imagePath:   { type: String, require: true },
    createAt:    { type: Date, default: Date.now },
    status:      { type: Boolean, default: false }   
});

productSchema.pre('save', function(next) {
    this.status = true;
    next();
});

productSchema.pre('update', function() {
    console.log(this instanceof mongoose.Query); // true
    // this.start = Date.now();
    console.log(this);
});

module.exports = mongoose.model('Product', productSchema);
