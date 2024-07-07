// controllers/userController.js
const User = require('../models/User');

// Get user details
exports.getUserDetails = async (req, res) => {
    try {
        // Fetch user details based on the authenticated user (from req.user)
        const user = await User.findById(req.user._id).select('-password'); // Exclude password from response

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Update user information
exports.updateUser = async (req, res) => {

    try {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['username', 'role', 'department', 'name', 'nationality', 'idNumber', 'mobileNumber'];
    
        // // Validate updates
        // const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    
        // if (!isValidOperation) {
        //     return res.status(400).json({ error: 'Invalid updates!' });
        // }
        const user = await User.findById(req.query.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        allowedUpdates.forEach((update) => user[update] = req.body[update]);
        user['updatedAt'] = Date.now();
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

