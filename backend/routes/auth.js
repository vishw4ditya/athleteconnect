const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

// Register route with file upload
router.post('/register', upload.single('photo'), register);

// Login route
router.post('/login', login);

// Get current user profile
router.get('/me', authMiddleware, getMe);

module.exports = router;
