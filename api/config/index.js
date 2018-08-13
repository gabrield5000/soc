 'use strict';

const crypto = require('crypto');

module.exports = {
    jwt:{
        secret: crypto.randomBytes(16).toString('hex'),
        expiresIn: '1h'
    }
};