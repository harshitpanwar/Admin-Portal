const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required. Please provide a username.'],
        unique: [true, 'Username must be unique. This username is already taken.']
    },
    password: {
        type: String,
        required: [true, 'Password is required. Please provide a password.']
    },
    role: {
        type: String,
        enum: {
            values: ['superadmin', 'admin', 'user'],
            message: 'Role must be either superadmin, admin, or user.'
        },
        required: [true, 'Role is required. Please specify a role.']
    },
    department: {
        type: String,
        required: [true, 'Department is required. Please specify a department.']
    },
    name: String,
    nationality: String,
    idNumber: String,
    mobileNumber: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },  
});

const User = mongoose.model('User', userSchema);
module.exports = User;
