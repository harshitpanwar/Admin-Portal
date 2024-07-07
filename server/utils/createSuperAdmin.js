const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Adjust the path as necessary
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

console.log(MONGO_URI)
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

const createSuperAdmin = async () => {
    const username = 'superadmin';
    const password = 'superadminpassword'; // Change to a secure password
    const hashedPassword = await bcrypt.hash(password, 8);

    const superAdmin = new User({
        username,
        password: hashedPassword,
        role: 'superadmin',
        name: 'Super Admin',
        department: 'admin-reserved-department'
    });

    try {
        await superAdmin.save();
        console.log('Super Admin created successfully');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error creating Super Admin', error);
        mongoose.connection.close();
    }
};

createSuperAdmin();
