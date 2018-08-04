'use strict';

require('dotenv').config();
const jwt = require('jsonwebtoken'); 

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = await jwt.verify(token, process.env.AUTH_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error ){
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};