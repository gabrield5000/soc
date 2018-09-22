'use strict';

const Social = require('./../models/socialModel');
const User = require('../models/userModel');

exports.getInvites = async (id) => {
    try {
        const user = await User.findOne({ _id: id }).populate('Profile');
        return user.invites;
    } catch (error) {
        throw error;
    }
}

exports.addInvite = async (id,friendId) => {
    try {
        const invites = await User.findOne({ _id: id }).populate('Profile');
        return invites.inviteFriends;
    } catch (error) {
        throw error;
    }
}

exports.addFriend = async (id,friendId) => {
    try {
        const invites = await User.findOne({ _id: id }).populate('Profile');
        return invites.inviteFriends;
    } catch (error) {
        throw error;
    }
}

exports.getFriends = async (id) => {
    try {
        const user = await User.findOne({ _id: id }).populate('Profile');
        return user.friends;
    } catch (error) {
        throw error;
    }
}