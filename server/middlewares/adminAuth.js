// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const ADMIN_ROLES = ['admin', 'superadmin'];
const REQUEST_TIMEOUT = 1000 * 60 * 60; // 1 hour

const auth = async(req, res, next) => {

    try {
        // const token = req?.cookies?.token;
        const token = req.header('Authorization').replace('Bearer ', '');
        if(!token) throw new Error("Missing token")

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id });

        if (!user || !user.lastRequestAt || Date.now() - user.lastRequestAt > REQUEST_TIMEOUT) {
            throw new Error();
        }
        user.lastRequestAt = Date.now();
        await user.save();

        req.user = user;

        if(!ADMIN_ROLES.includes(user.role)){
            return res.status(403).json({ error: 'Access denied. Only Admins can access this resource.' });
        }

        next();
    } catch (e) {
        res.status(401).send({ message: 'Please authenticate' });
    }
};

module.exports = auth;