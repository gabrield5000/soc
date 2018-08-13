'use strict';

const mongoose = require('mongoose');
const crypto = require('crypto');
const { Schema } = mongoose;

const userSchema = new Schema({
    date: { type: Date, default: Date.now},
    email: { 
      type: String, 
      require: true, 
      unique: true, 
      match: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/ 
    },
    firstname: { type: String, require: true },
    lastname: { type: String, require: true },
    username: { type: String, require: true },
    isActive: { type: Boolean, default: false }, 
    password: String,
    salt: String
});

userSchema.pre('save', function(next) {
  this.password = this.encryptPassword(this.password);
  next();
});

userSchema.methods = {

  authenticate: function(password) {
    return crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
  },

  encryptPassword: function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    return crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
  }
};

module.exports = mongoose.model('User', userSchema);