// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const REQUEST_TIMEOUT = 1000 * 60 * 60; // 1 hour

const auth = async(req, res, next) => {

    try {
        // const token = req?.cookies?.token;
        const token = req.header('Authorization').replace('Bearer ', '');

        if(!token) throw new Error("Missing token")
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id });

        if (!user || !user.lastRequestAt || Date.now() - user.lastRequestAt > REQUEST_TIMEOUT) {
            throw new Error("Please Authenticate");
        }

        req.user = user;

        if(user.role !== 'superadmin'){
            return res.status(403).json({ error: 'Access denied. Only Super Admins can access this resource.' });
        }

        next();
    } catch (e) {
        res.status(401).send({ message: e.message });
    }
};

module.exports = auth;