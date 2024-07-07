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
            throw new Error();
        }

        req.user = user;

        if(!ADMIN_ROLES.includes(user.role)){
            return res.status(403).json({ error: 'Access denied. Only Admins can access this resource.' });
        }

        next();
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

module.exports = auth;