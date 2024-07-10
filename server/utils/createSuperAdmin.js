const bcrypt = require('bcryptjs');
const User = require('../models/User');

const createSuperAdmin = async () => {

    try {
    const superAdminUsername = process.env.SUPERADMIN_USERNAME;
    const superAdminPassword = process.env.SUPERADMIN_PASSWORD;

    if (!superAdminUsername || !superAdminPassword) throw new Error('Super Admin credentials not found');

    const username = process.env.SUPERADMIN_USERNAME;
    const password = process.env.SUPERADMIN_PASSWORD;
    const hashedPassword = await bcrypt.hash(password, 8);

    //check if superadmin exists
    const superAdminExists = await User.findOne({ role: 'superadmin' });

    //if superadmin exists, delete it
    if (superAdminExists) {
        await User.deleteOne({ role: 'superadmin' });
        console.log('Super Admin deleted successfully');
    }

    const superAdmin = new User({
        username,
        password: hashedPassword,
        role: 'superadmin',
        name: 'Super Admin',
        department: 'admin-reserved-department'
    });

        await superAdmin.save();
        console.log('Super Admin created successfully');
    } catch (error) {
        console.error('Error creating Super Admin', error);
    }
};

module.exports = { createSuperAdmin };