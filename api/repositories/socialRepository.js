'use strict';

const User = require('../models/userModel');
const Social = require('../models/socialModel');

exports.getInvites = async (id) => {
	try {
		return await User.findById(id).populate('social');
	} catch (error) {
		throw error;
	}
};

exports.getFriends = async (id) => {
	try {
		return await User.findById(id).populate('social');
	} catch (error) {
		throw error;
	}
};

exports.getInvite = async (id,friendId) => {
	try {
		const user = await User.findById(friendId);
		return await Social.findByIdAndUpdate(user.social,
	 			  { $push: { invites: id } }
		 );
	} catch (error) {
		throw error;
	}
};

exports.addFriend = async (id,friendId) => {
	try {
		const user = await User.findById(id);
		await Social.findByIdAndUpdate(user.social,
			{ $pull: { invites: friendId } } );
		return await Social.findByIdAndUpdate(user.social,
				{ $push: { friends: friendId } }
	  );	
	} catch (error) {
		throw error;
	}
};

exports.removeInvite = async (id,friendId) => {
	try {
		const user = await User.findById(id);
		return await Social.findByIdAndUpdate(user.social,
			{ $pull: { invites: friendId } } );
	} catch (error) {
		throw error
	}
}

exports.removeFriend = async (id,friendId) => {
	try {
		const user = await User.findById(id);
		return await Social.findByIdAndUpdate(user.social,
			{ $pull: { friend: friendId } } );
	} catch (error) {
		throw error
	}
}



