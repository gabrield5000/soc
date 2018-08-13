// const mongoose = require("mongoose");
const User = require('../models/userModel');


exports.addUser = async (data) => {
    try {
        const newUser = new User(data);
        const registerUser = await newUser.save({_id:false});
        return registerUser;
    }catch (e) {
        throw e;
    }
}

exports.findById = async (id) => {
    try {
        const user = await User.findById(id, { password: 0 });
        return user;    
    } catch (error) {
        throw error
    }
}