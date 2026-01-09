const Athlete = require('../models/Athlete');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// @desc    Register new athlete
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const {
      userID,
      name,
      email,
      age,
      sport,
      position,
      phone,
      location,
      password,
      achievements
    } = req.body;

    // Check if athlete already exists
    const athleteExists = await Athlete.findOne({ $or: [{ email }, { userID }] });
    
    if (athleteExists) {
      return res.status(400).json({ 
        message: 'Athlete with this email or userID already exists' 
      });
    }

    // Handle photo upload - Cloudinary URL
    const photo = req.file ? req.file.path : '';

    // Create athlete
    const athlete = await Athlete.create({
      userID,
      name,
      email,
      age,
      sport,
      position,
      phone,
      location,
      password,
      achievements,
      photo
    });

    // Generate token
    const token = generateToken(athlete._id);

    res.status(201).json({
      success: true,
      token,
      athlete: {
        id: athlete._id,
        userID: athlete.userID,
        name: athlete.name,
        email: athlete.email,
        age: athlete.age,
        sport: athlete.sport,
        position: athlete.position,
        phone: athlete.phone,
        location: athlete.location,
        achievements: athlete.achievements,
        photo: athlete.photo
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration', error: error.message });
  }
};

// @desc    Login athlete
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Find athlete
    const athlete = await Athlete.findOne({ email });

    if (!athlete) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await athlete.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(athlete._id);

    res.json({
      success: true,
      token,
      athlete: {
        id: athlete._id,
        userID: athlete.userID,
        name: athlete.name,
        email: athlete.email,
        age: athlete.age,
        sport: athlete.sport,
        position: athlete.position,
        phone: athlete.phone,
        location: athlete.location,
        achievements: athlete.achievements,
        photo: athlete.photo
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
};

// @desc    Get current athlete profile
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const athlete = await Athlete.findById(req.athlete.id).select('-password');
    
    if (!athlete) {
      return res.status(404).json({ message: 'Athlete not found' });
    }

    res.json({
      success: true,
      athlete
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
