// controllers/superAdminController.js
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Create User (both admin and normal users)
exports.createUser = async (req, res) => {

    try {
        const { username, password, role, department, name, nationality, idNumber, mobileNumber } = req.body;
        // Check if the username is already taken
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        if(department === 'admin-reserved-department') throw new Error("Please choose some other department name, this name is reserved");

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user object
        const newUser = new User({
            username,
            password: hashedPassword,
            role,
            department,
            name,
            nationality,
            idNumber,
            mobileNumber,
        });

        // Save the new user
        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).json({ error: error.message });
    }
};
