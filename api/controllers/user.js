const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const  User = require('../models/user');

exports.user_signup = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'user exists'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            email: req.body.email,
                            password: hash
                        });
                        user
                          .save()
                          .then(result => {
                              console.log(result);
                              res.status(201).json({
                                  massage: 'user created'
                              })
                          })
                          .catch( err => {
                              console.log(err);
                              res.status(500).json({ 
                                error: err
                              });
                          });
                    }
                })
            }
        }) 
}

exports.user_login = (req, res, next) => {
    console.log(req.body);
    User.findOne({ email: req.body.email })
        .exec()
        .then(user => {
            if(user.length < 1 ) {
                return res.status(401).json({
                    message: 'Auth faild'
                });
            }
        
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if(err) {
                    return res.status(401).json({
                        massage: 'Auth failed'
                    });
                }
                if(result) {
                    const token = jwt.sign(
                        {
                          email: user.email,
                          userId: user._id
                        }, 
                        'secret',
                        {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        massage: 'Auth successful',
                        token: token
                    });
                }
                res.status(401).json({
                    massage: 'Auth failed'
                })
            });

        })
        .catch( err => {
            console.log(err);
            res.status(500).json({ 
              error: err
            });
        });
}

exports.user_delete = (req, res, next) => {
    User.remove({_id: req.params.id})
        .exec()
        .then( res => {
            res.status(200).json({
                message: 'User deleted'
            })
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({ 
              error: err
            });
        });
}