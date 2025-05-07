const express = require('express');
const { getAIResponse } = require('../controllers/assistantController');

const router = express.Router();

// Route to get AI response
router.post('/respond', getAIResponse);

module.exports = router;