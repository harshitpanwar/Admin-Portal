// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const userController = require('../controllers/userController');

// GET /api/users/me (or similar endpoint)
router.get('/me', auth, userController.getUserDetails);
router.put('/me', auth, userController.updateUser);

module.exports = router;