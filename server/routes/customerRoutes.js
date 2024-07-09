// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const adminAuth = require('../middlewares/auth');

router.post('/create-customer', adminAuth, customerController.createCustomer);
router.get('/customers', adminAuth, customerController.getCustomers);
router.put('/customers/:id', adminAuth, customerController.updateCustomer);
router.delete('/customers/:id', adminAuth, customerController.deleteCustomer);

module.exports = router;
