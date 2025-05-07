const express = require('express');
const {
  addProgress,
  getUserProgress,
  updateProgress,
  deleteProgress,
} = require('../controllers/progressController');
const { logger } = require('../index');

const router = express.Router();

// Add a new progress entry
router.post('/', addProgress);

// Get all progress entries for a user
router.get('/:userId', async (req, res) => {
  try {
    const progress = await getUserProgress(req.params.userId);
    res.status(200).json(progress);
  } catch (error) {
    logger.error(`Error fetching progress for user ${req.params.userId}: ${error.message}`);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update a progress entry
router.put('/:id', updateProgress);

// Delete a progress entry
router.delete('/:id', deleteProgress);

// Added error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

module.exports = router;