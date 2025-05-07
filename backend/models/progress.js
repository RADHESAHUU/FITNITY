const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  weight: {
    type: Number,
    required: true,
  },
  caloriesBurned: {
    type: Number,
    required: true,
  },
  steps: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Progress', progressSchema);