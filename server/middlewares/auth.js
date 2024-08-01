// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const ADMIN_ROLES = ['admin', 'superadmin'];
const REQUEST_TIMEOUT = 1000 * 60 * 60; // 1 hour

const auth = async(req, res, next) => {

    try {

        // const token = req?.cookies?.token;
        // console.log(req.header('Authorization'))
        const token = req.header('Authorization').replace('Bearer ', '');
        if(!token) throw new Error("Missing token")
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id });

        if (!user || !user.lastRequestAt || Date.now() - user.lastRequestAt > REQUEST_TIMEOUT) {
            throw new Error('Please authenticate');
        }

        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ message: e.message });
    }
};

module.exports = auth;