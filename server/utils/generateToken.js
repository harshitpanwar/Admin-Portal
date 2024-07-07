// utils/generateToken.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (userId, role) => {
    return jwt.sign({ _id: userId, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
};

module.exports = { generateToken, verifyToken };
