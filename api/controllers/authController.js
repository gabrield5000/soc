'use strict';

require('dotenv').config();
const jwt = require('jsonwebtoken');
const authRepository = require('./../repositories/authRepository');
const userRepository = require('./../repositories/userRepository');

exports.signup = async (req, res) => {
	try {
		const userStore = await authRepository.checkExistsUser(req.body.email);
		if(userStore.length > 0) {
			if( userStore.length >= 1 ) {
				return res.status(409).json({ message: 'user exists' });
			}
		} else {
			const newUser = await userRepository.addUser(req.body);
			const token = jwt.sign(
				{
					email: newUser.email,
					userId: newUser._id,
					username: newUser.username 
				},
				process.env.AUTH_SECRET,
				{
					expiresIn: 60 * 4
				} 
			);
			res.status(201).json({ success: true, token: 'Bearer ' + token });
		}        
	} catch (error) {
		throw error;
	}

};

exports.login = async (req, res) => {
	try {
		let userStore = await userRepository.findOne(req.body.email);
		if(!userStore) {
			return res.status(401).json({ message: 'Auth faild' });
		}
		let result = await authRepository.checkPassword( req.body.password ); 
		if(!result) {
			return res.status(401).json({ massage: 'wrong password' });
		} else {
			const token = jwt.sign(
				{
					email: userStore.email,
					userId: userStore._id,
					username: userStore.username 
				},
				process.env.AUTH_SECRET,
				{
					expiresIn: 60 * 4
				} 
			);
			return res.status(200).json({ success: true, token: 'Bearer ' + token });
		}
	} catch ( error ) {
		throw error;
	}
};

exports.auth = async (req, res) => {
	try {
		const user = await userRepository.findById(req.userId);
		if(!user) {
			return res.status(404).json({ message: 'user no found' });
		}
		res.status(200).json(user);
	} catch (error) {
		return error;
	}
};

exports.delete = async (req, res) => {
	try {
		const user = await userRepository.aciveUser(req.userId);
		if(!user.isActive) {
			res.status(200).json({ user: user.isActive });
		}
	} catch (error) {
		throw error; 
	}
};