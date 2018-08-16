'use strict';

const User = require('../models/userModel');

exports.checkPassword = async (item) => {
    try {
        const result = await User.authenticate( req.body.password ); 
        return result;
    } catch (error) {
        throw error;
    }
};
