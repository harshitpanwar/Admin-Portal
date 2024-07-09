const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    department: {
        type: String,
        required: [true, 'Department is required. Please specify a department.']
    },
    nationality: String,
    idNumber: String,
    mobileNumber: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },  
});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
