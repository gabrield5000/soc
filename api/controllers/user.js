require('dotenv').config();
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const  User = require('../models/user');

exports.signup = async (req, res, next) => {
    try {
        const checkUser = await User.find({ email: req.body.email });
        if( checkUser.length >= 1 ) {
            return res.status(409).json({ message: 'user exists' });
        }
        let user = new User();
        user.email = req.body.email,
        user.username = req.body.username,
        user.firstname = req.body.firstname,
        user.lastname = req.body.lastname,
        user.setPassword(req.body.password);
        let newUser = await user.save(); 
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
    } catch (error) {
       next(error);
        // res.status(500).json({ error: err });
    }
}

exports.login = async (req, res, next) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if(!user) {
            return res.status(401).json({ message: 'Auth faild' });
        }
        let result = await user.validPassword( req.body.password ); 
        if(!result) {
            return res.status(401).json({ massage: 'Auth failed' });
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
       res.status(500).json({ error: error });
    }
}

exports.auth = async (req, res, next) => {
    
}

exports.delete = async (req, res, next) => {
    try {
        let user = await User.findOne({ _id: req.params.id });
        user.isActive = false;
        res.status(200).json({ message: 'User inactive'});
    } catch (error) {
        res.status(500).json({ error: error });
    }
}