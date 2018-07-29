const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    // name: String,
    // price: Number,
    // date: { type: Date, default: Date.now }
  email: { type: String, require: true },
  password: {type: String, require: true }
});

module.exports = mongoose.model('User', userSchema);