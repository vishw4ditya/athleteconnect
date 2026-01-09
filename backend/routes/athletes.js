const express = require('express');
const router = express.Router();
const {
  getStats,
  getAthleteById,
  updateProfile,
  addVideoUrl,
  deleteVideoUrl,
  getAllAthletes
} = require('../controllers/athleteController');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.get('/stats', getStats);
router.get('/', getAllAthletes);
router.get('/:id', getAthleteById);

// Protected routes
router.put('/profile', authMiddleware, upload.single('photo'), updateProfile);
router.post('/videos', authMiddleware, addVideoUrl);
router.delete('/videos/:videoId', authMiddleware, deleteVideoUrl);

module.exports = router;
