const { Subscription, UserSubscription } = require('../models/subscription');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create a new subscription plan
exports.createSubscriptionPlan = async (req, res) => {
  const { name, price, features } = req.body;

  try {
    const newSubscription = new Subscription({ name, price, features });
    await newSubscription.save();
    res.status(201).json({ message: 'Subscription plan created successfully', subscription: newSubscription });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Create a new subscription
exports.createSubscription = async (req, res) => {
  try {
    const { userId, planId } = req.body;

    // Create a Stripe customer
    const customer = await stripe.customers.create({
      metadata: { userId },
    });

    // Create a subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: planId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });

    res.status(200).json({
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ message: 'Failed to create subscription', error: error.message });
  }
};

// Get all subscription plans
exports.getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json({ subscriptions });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Subscribe a user to a plan
exports.subscribeUser = async (req, res) => {
  const { userId, subscriptionId, endDate } = req.body;

  try {
    const newUserSubscription = new UserSubscription({ userId, subscriptionId, endDate });
    await newUserSubscription.save();
    res.status(201).json({ message: 'User subscribed successfully', subscription: newUserSubscription });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get a user's subscriptions
exports.getUserSubscriptions = async (req, res) => {
  const { userId } = req.params;

  try {
    const userSubscriptions = await UserSubscription.find({ userId }).populate('subscriptionId');
    res.status(200).json({ subscriptions: userSubscriptions });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};