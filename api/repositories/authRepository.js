// const mongoose = require("mongoose");
const User = require('../models/userModel');

exports.find = async (data) => {
    try {
        let dataStore = await User.find({email: data});
        return dataStore;
    }catch (e) {
        throw e;
    }
};

exports.findOne = async (data) => {
    try {
        let dataStore = await User.findOne(data);
        return dataStore;
    }catch (e) {
        throw e;
    }
};

exports.checkPassword = async (item) => {
    try {
        const result = await user.authenticate( req.body.password ); 
        return result;
    } catch (error) {
        throw error;
    }
};
