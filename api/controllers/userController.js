'use strict';

require('dotenv').config();
const userRepository = require('./../repositories/userRepository');

exports.list = async (req, res) => {
	try {
		const userStore = await userRepository.list();
		console.log(userStore);
		if(!userStore) {
			res.status(200).json({ massage: 'no users found' });
		}
		res.status(200).json(userStore);
	} catch (error) {
		throw error;
	}
};

exports.getId = async (req, res) => {
	try {
		const id = req.params.id;
		const userStore = await userRepository.getId(id);
		if(!userStore) {
			res.status(200).json({ massage: 'no user found' });
		}
	} catch (error) {
		throw error;
	}
};