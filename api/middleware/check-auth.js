const jwt = require('jsonwebtoken'); 

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodeed = jwt.verify(token, 'secret');
        req.userData = decodeed;
        next();
    } catch (error ){
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};