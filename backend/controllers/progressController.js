const Progress = require('../models/progress');

// Add a new progress entry
exports.addProgress = async (req, res) => {
  const { userId, weight, caloriesBurned, steps } = req.body;

  try {
    const newProgress = new Progress({
      userId,
      weight,
      caloriesBurned,
      steps,
    });

    await newProgress.save();
    res.status(201).json({ message: 'Progress added successfully', progress: newProgress });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all progress entries for a user
exports.getUserProgress = async (req, res) => {
  const { userId } = req.params;

  try {
    const progress = await Progress.find({ userId });
    res.status(200).json({ progress });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update a progress entry
exports.updateProgress = async (req, res) => {
  const { id } = req.params;
  const { weight, caloriesBurned, steps } = req.body;

  try {
    const updatedProgress = await Progress.findByIdAndUpdate(
      id,
      { weight, caloriesBurned, steps },
      { new: true }
    );

    if (!updatedProgress) {
      return res.status(404).json({ message: 'Progress entry not found' });
    }

    res.status(200).json({ message: 'Progress updated successfully', progress: updatedProgress });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a progress entry
exports.deleteProgress = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProgress = await Progress.findByIdAndDelete(id);

    if (!deletedProgress) {
      return res.status(404).json({ message: 'Progress entry not found' });
    }

    res.status(200).json({ message: 'Progress deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};