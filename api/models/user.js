const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = mongoose.Schema({
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
    isActive: { type: Boolean, default: true }, 
    hash: String,
    salt: String
});

userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
};
userSchema.methods.validPassword = function(password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
  return this.hash === hash;
};

module.exports = mongoose.model('User', userSchema);