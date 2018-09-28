'use strict';

const User = require('../models/userModel');
const Social = require('../models/socialModel');
// const Profile = require('../models/profileModel');

exports.list = async () => {
	try {
		return await User.find();
	} catch (error) {
		throw error;
	}
};

exports.find = async (data) => {
	try {
		return await User.findOne(data);
	}catch (error) {
		throw error;
	}
}; 

exports.addUser = async (data) => {
	try {
		const user = new User(data);
		const userStore = await user.save({_id:false});
		const social = new Social({user: userStore._id });
		console.log(social);
		userStore.social = social._id; 
		await social.save({_id:false});
		return await userStore.save({_id:false});
	}catch (error) {
		throw error;
	}
};

exports.findById = async (id) => {
	try {
		return await User.findById(id, { password: 0 });
	} catch (error) {
		throw error;
	}
};

exports.aciveUser = async (id) => {
	try {
		const user = await User.findById(id, { password: 0 });
		user.isActive = false;
		return user;
	} catch (error) {
		throw error;
	}
};

exports.update = async (id, ...data) => {
	try {
		return await User.findOneAndUpdate({ _id: id }, { $set: { ...data }}, { new: true });
	} catch (error) {
		throw error;
	}
};