'use strict';

const User = require('../models/userModel');

// exports.find = async (data) => {
//     try {
//         let dataStore = await User.findOne(data);
//         return dataStore;
//     }catch (e) {
//         throw e;
//     }
// }; 

exports.addUser = async (data) => {
    try {
        console.log(data );
        const newUser = new User(data);
        const registerUser = await newUser.save({_id:false});
        console.log(registerUser );
        return registerUser;

    }catch (error) {
        throw error;
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

exports.aciveUser = async (id) => {
    try {
        const user = await User.findById(id, { password: 0 });
        user.isActive = false;
        return user;
    } catch (error) {
        
    }
}

exports.update = async (id, ...data) => {
    try {
        return this.Size.findOneAndUpdate({ _id: id }, { $set: { ...data }}, { new: true });
    } catch (error) {
        throw error;
    }
}