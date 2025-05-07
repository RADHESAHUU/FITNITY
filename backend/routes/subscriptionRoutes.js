const express = require('express');
const {
  createSubscription,
  getAllSubscriptions,
  subscribeUser,
  getUserSubscriptions,
} = require('../controllers/subscriptionController');

const router = express.Router();

// Create a new subscription plan
router.post('/', createSubscription);

// Get all subscription plans
router.get('/', getAllSubscriptions);

// Subscribe a user to a plan
router.post('/subscribe', subscribeUser);

// Get a user's subscriptions
router.get('/:userId', getUserSubscriptions);

// Route to create a subscription
router.post('/create', createSubscription);

module.exports = router;