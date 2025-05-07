const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Middleware for validation
const validateUserRegistration = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateUserLogin = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// User registration route
router.post('/register', validateUserRegistration, registerUser);

// User login route
router.post('/login', validateUserLogin, loginUser);

module.exports = router;