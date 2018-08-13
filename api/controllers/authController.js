'use strict';

require('dotenv').config();
const jwt = require('jsonwebtoken');
const authRepository = require('./../repositories/authRepository');
const userRepository = require('./../repositories/userRepository');

exports.signup = async (req, res, next) => {
    try {
        let userStore = await authRepository.find(req.body.email);
        if(userStore) {
             if( userStore.length >= 1 ) {
                 return res.status(409).json({ message: 'user exists' });
             }
        } else {
            let newUser = await userRepository.addUser(req.body);
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
             res.status(201).json({ massage: 'user created', token: token });
        }        
    } catch (error) {
        throw error;
    }
}

exports.login = async (req, res, next) => {
    try {
        let userStore = await authRepository.findOne(req.body.email);
        if(!userStore) {
            return res.status(401).json({ message: 'Auth faild' });
        }
        let result = await authRepository.checkPassword( req.body.password ); 
        if(!result) {
            return res.status(401).json({ massage: 'wrong password' });
        } else {
            const token = jwt.sign(
                {
                    email: user.email,
                    userId: user._id,
                    username: user.username 
                },
                process.env.AUTH_SECRET,
                {
                    expiresIn: 60 * 4
                } 
            );
            return res.status(200).json({ massage: 'Auth successful', token: token });
        }
    } catch ( error ) {
    //    res.status(500).json({ error: error });
        throw error;
    }
}

exports.auth = async (req, res, next) => {
    try {
        const user = await userRepository.findById(req.userId);
        if(!user) {
            return res.status(404).json({ message: 'user no found' });
        }
        res.status(200).json(user);
    } catch (error) {
        return res.status(500).send("There was a problem finding the user.");
    }
}

exports.logout = async (req, res, next) => {
    
}


exports.delete = async (req, res, next) => {
    try {
        let user = await User.findOne({ _id: req.params.id });
        user.isActive = false;
        res.status(200).json({ message: 'User inactive'});
    } catch (error) {
        throw error; 
    }
}