const express = require('express');
const nutritionController = require('../controllers/nutritionController');

const router = express.Router();

// Route for meal suggestions
router.post('/suggest', nutritionController.suggestMeals);

// Route for grocery list generation
router.post('/generate', nutritionController.generateGroceryList);

module.exports = router;