const Athlete = require('../models/Athlete');

// @desc    Get platform statistics
// @route   GET /api/athletes/stats
// @access  Public
exports.getStats = async (req, res) => {
  try {
    const totalAthletes = await Athlete.countDocuments();
    
    // Count total videos across all athletes
    const athletes = await Athlete.find().select('videoUrls');
    const totalVideos = athletes.reduce((sum, athlete) => sum + (athlete.videoUrls?.length || 0), 0);

    res.json({
      success: true,
      stats: {
        totalAthletes,
        totalVideos
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get athlete profile by ID
// @route   GET /api/athletes/:id
// @access  Public
exports.getAthleteById = async (req, res) => {
  try {
    const athlete = await Athlete.findById(req.params.id).select('-password');
    
    if (!athlete) {
      return res.status(404).json({ message: 'Athlete not found' });
    }

    res.json({
      success: true,
      athlete
    });
  } catch (error) {
    console.error('Get athlete error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update athlete profile
// @route   PUT /api/athletes/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const athlete = await Athlete.findById(req.athlete.id);

    if (!athlete) {
      return res.status(404).json({ message: 'Athlete not found' });
    }

    // Update fields
    const allowedUpdates = ['name', 'age', 'sport', 'position', 'phone', 'location', 'achievements'];
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        athlete[field] = req.body[field];
      }
    });

    // Handle photo upload - Cloudinary URL
    if (req.file) {
      athlete.photo = req.file.path;
    }

    await athlete.save();

    res.json({
      success: true,
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
        photo: athlete.photo,
        videoUrls: athlete.videoUrls
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Add video URL
// @route   POST /api/athletes/videos
// @access  Private
exports.addVideoUrl = async (req, res) => {
  try {
    const { title, url } = req.body;

    if (!title || !url) {
      return res.status(400).json({ message: 'Please provide title and URL' });
    }

    const athlete = await Athlete.findById(req.athlete.id);

    if (!athlete) {
      return res.status(404).json({ message: 'Athlete not found' });
    }

    athlete.videoUrls.push({ title, url });
    await athlete.save();

    res.json({
      success: true,
      videoUrls: athlete.videoUrls
    });
  } catch (error) {
    console.error('Add video error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete video URL
// @route   DELETE /api/athletes/videos/:videoId
// @access  Private
exports.deleteVideoUrl = async (req, res) => {
  try {
    const athlete = await Athlete.findById(req.athlete.id);

    if (!athlete) {
      return res.status(404).json({ message: 'Athlete not found' });
    }

    athlete.videoUrls = athlete.videoUrls.filter(
      video => video._id.toString() !== req.params.videoId
    );

    await athlete.save();

    res.json({
      success: true,
      videoUrls: athlete.videoUrls
    });
  } catch (error) {
    console.error('Delete video error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all athletes
// @route   GET /api/athletes
// @access  Public
exports.getAllAthletes = async (req, res) => {
  try {
    const athletes = await Athlete.find().select('-password');
    
    res.json({
      success: true,
      count: athletes.length,
      athletes
    });
  } catch (error) {
    console.error('Get athletes error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
