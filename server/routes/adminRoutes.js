// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminAuth = require('../middlewares/adminAuth');

router.post('/create-user', adminAuth, adminController.createUser);
router.get('/users', adminAuth, adminController.getAllUsersInDepartment);
router.put('/users/:id', adminAuth, adminController.updateUser);
router.delete('/users/:id', adminAuth, adminController.deleteUser);

module.exports = router;
