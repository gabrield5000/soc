'use strict';

const User = require('../models/userModel');
const Profile = require('../models/profileModel');

exports.find = async (data) => {
    try {
        let dataStore = await User.findOne(data);
        return dataStore;
    }catch (error) {
        throw error;
    }
}; 

exports.addUser = async (data) => {
    try {
        const user = new User(data);
        user.profile = new Profile({user: user._id}); 
        await user.profile.save({_id:false});
        const registerUser = await user.save({_id:false});
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