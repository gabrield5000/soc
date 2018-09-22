'use strict';

const socialRepository = require('./../repositories/socialRepository');

exports.getInvites = async (req, res, next) => {
    try {
        const id = req.body.userId;
        const invitesStore = await socialRepository.getInvites(id);
        res.status(200).json(invitesStore);    
    } catch (error) {
        throw error
    }
}

exports.postInvite = async (req, res, next) => {
    try {
        const id = req.body.id;
        const friendId = req.body.friendId;
        const inviteStore = await socialRepository.addInvite(id,friendId);
        return inviteStore;
    } catch (error) {
        throw error;
    }
}

exports.getFriends = async (req, res, next) => {
    try {
        const id = req.body.userId;
        const friendsStore = await socialRepository.getFriends(id);
        res.status(200).json(friendsStore);    
    } catch (error) {
        throw error
    }
}