const Customer = require('../models/Customer');
const User = require('../models/User');

exports.getCustomers = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { page = 1, limit = 10, from, to } = req.query;
        const filter = {};

        if (user.role === 'admin') {
            filter.department = user.department;
        } else if (user.role === 'user') {
            filter.createdBy = userId;
        }

        // if (from && to) {
        //     filter.createdAt = { $gte: new Date(from), $lte: new Date(to) };
        // }
        if (from && to) {
            const toDate = new Date(to);
            toDate.setDate(toDate.getDate() + 1);
  
            filter.createdAt = { $gte: new Date(from), $lt: toDate };
        } else if (from) {
            filter.createdAt = { $gte: new Date(from) };
        } else if (to) {
            const toDate = new Date(to);
            toDate.setDate(toDate.getDate() + 1);
  
            filter.createdAt = { $lt: toDate };
        }
  

        const customers = await Customer.find(filter)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Customer.countDocuments(filter);

        res.status(200).json({
            customers,
            totalPages: Math.ceil(total / limit),
            currentPage: parseInt(page),
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Create a new customer
exports.createCustomer = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming req.user is set by the authentication middleware
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let { name, nationality, idNumber, mobileNumber, department } = req.body;

        if(department === 'admin-reserved-department') throw new Error("Please choose some other department name, this name is reserved");

        if(user.role === 'admin' || user.role === 'user'){
            department = user.department;
        }
        const customer = new Customer({
            name,
            department, 
            nationality,
            idNumber,
            mobileNumber,
            createdBy: userId 
        });
        console.log("customer", customer)
        await customer.save();
        res.status(201).json(customer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an existing customer
exports.updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, nationality, idNumber, mobileNumber } = req.body;

        // Ensure only the owner of the department can update
        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const customer = await Customer.findById(id);

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        if (user.role!=='superadmin' && customer.department !== user.department) {
            return res.status(403).json({ message: 'Unauthorized to update customer from a different department' });
        }

        customer.name = name;
        customer.nationality = nationality;
        customer.idNumber = idNumber;
        customer.mobileNumber = mobileNumber;
        customer.updatedAt = Date.now();

        await customer.save();
        res.status(200).json(customer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a customer
exports.deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;

        // Ensure only the owner of the department can delete
        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const customer = await Customer.findById(id);

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        if (user.role!=='superadmin' && customer.department !== user.department) {
            return res.status(403).json({ message: 'Unauthorized to delete customer from a different department' });
        }

        const deletedCustomer = await Customer.findByIdAndDelete(id);
        if (!deletedCustomer) {
            return res.status(404).json({ message: 'User not found' });
        }
  
        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
