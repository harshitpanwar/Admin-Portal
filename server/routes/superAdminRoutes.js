// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const superAdminController = require('../controllers/superAdminController');
const superAdminAuth = require('../middlewares/superAdminAuth');

router.post('/create-user', superAdminAuth, superAdminController.createUser);

module.exports = router;
