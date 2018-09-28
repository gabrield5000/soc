'use strict';

const socialRepository = require('./../repositories/socialRepository');

exports.invites = async (req, res) => {
	try {
		const id = req.headers.authorization;
		const invitesStore = await socialRepository.getInvites(id);
		res.status(200).json(invitesStore); 
	} catch (error) {
		throw error;
	}
};

exports.friends = async (req, res) => {
	try {
		const id =  req.headers.authorization;
		const friendsStore = await socialRepository.getfriends(id);
		res.status(200).json(friendsStore); 
	} catch (error) {
		throw error;
	}
};

exports.addInvite = async (req, res) => {
	try {
		const friendId = req.params.id;
		const id = req.headers.authorization;
		await socialRepository.getInvite(id,friendId);
		res.status(200).json('invite friend');    
	} catch (error) {
		throw error;
	}
};

exports.addFriend = async (req, res) => {
	try {
		const id = req.headers.authorization;
		const friendId = req.body.friendId;
		await socialRepository.addInvite(id,friendId);
		res.status(200).json('add friend'); 
	} catch (error) {
		throw error;
	}
};

exports.deleteInvite = async (req, res) => {
	try {
		const id = req.body.friendId;
		await socialRepository.removeInvite(id);
		res.status(200).json('invite was removed');
	} catch (error) {
		throw error;
	}
};

exports.deleteFriend = async (req, res) => {
	try {
		const id = req.body.friendId;
		await socialRepository.removeFriend(id);
		res.status(200).json('friend was removed');
	} catch (error) {
		throw error;
	}
};