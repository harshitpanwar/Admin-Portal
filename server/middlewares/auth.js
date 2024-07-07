// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const ADMIN_ROLES = ['admin', 'superadmin'];

const auth = async(req, res, next) => {

    try {

        const token = req?.cookies?.token;
        if(!token) throw new Error("Missing token")
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id });
        
        if (!user) {
            throw new Error('Please authenticate');
        }

        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ error: e.message });
    }
};

module.exports = auth;