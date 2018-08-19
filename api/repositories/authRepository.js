'use strict';

const User = require('../models/userModel');

exports.checkExistsUser = async (data) => {
    try {
        let dataStore = await User.find({email: data});
        return dataStore;
    }catch (e) {
        throw e;
    }
};

exports.checkPassword = async (item) => {
    try {
        const result = await User.authenticate( req.body.password ); 
        return result;
    } catch (error) {
        throw error;
    }
};
