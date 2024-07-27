const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); // Adjust path as needed

const router = express.Router();

// Route to get the current user, protected by authMiddleware
router.get('/current_user', authMiddleware, userController.getCurrentUser);

// Route to register a new user
router.post('/register', userController.userRegister);

// Route to log in a user
router.post('/login', userController.userLogin);

module.exports = router;
