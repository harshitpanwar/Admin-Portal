const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.createUser = async (req, res) => {

    try {
        let { username, password, role, department, name, nationality, idNumber, mobileNumber } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        if(department === 'admin-reserved-department') throw new Error("Please choose some other department name, this name is reserved");

        const hashedPassword = await bcrypt.hash(password, 10);

        if(role!='user' && req.user.role=='admin') throw new Error("Admin can only create normal users")

        if(req.user.role === 'admin'){
            department = req.user.department;
        }

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
        res.status(500).json({ message: error.message });
    }
};

exports.getAllUsersInDepartment = async (req, res) => {
    try {
      const { page = 1, limit = 10, from, to } = req.query;

      let filterCondition = {}; // Assuming department is stored in req.user from authentication

      if(req.user.department !== 'admin-reserved-department'){
        filterCondition = { department: req.user.department }
      }

      if (from && to) {
          const toDate = new Date(to);
          toDate.setDate(toDate.getDate() + 1);

          filterCondition.createdAt = { $gte: new Date(from), $lt: toDate };
      } else if (from) {
          filterCondition.createdAt = { $gte: new Date(from) };
      } else if (to) {
          const toDate = new Date(to);
          toDate.setDate(toDate.getDate() + 1);

          filterCondition.createdAt = { $lt: toDate };
      }

      
      const users = await User.find(filterCondition)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({createdAt: -1})
        .exec();
  
      const count = await User.countDocuments(filterCondition);
  
      res.json({
        users,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
exports.deleteUser = async (req, res) => {
  try {
      const { id } = req.params;

      const deletedUser = await User.findByIdAndDelete(id);

      if (!deletedUser) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, nationality, idNumber, mobileNumber, role, password } = req.body;

        const updateObj = { 
          name, 
          nationality, 
          idNumber, 
          mobileNumber, 
          role, 
          updatedAt: Date.now() 
        }

        if(password){
          const hashedPassword = await bcrypt.hash(password, 8);
          updateObj['password'] = hashedPassword;
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            updateObj,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};

