// Mock data for meal suggestions
const mealSuggestions = [
  { meal: 'Grilled Chicken Salad', calories: 300 },
  { meal: 'Vegetable Stir Fry', calories: 250 },
  { meal: 'Protein Smoothie', calories: 200 },
];

// Mock data for grocery list
const groceryList = [
  'Chicken Breast',
  'Mixed Vegetables',
  'Protein Powder',
  'Almond Milk',
];

// Controller function to suggest meals
exports.suggestMeals = (req, res) => {
  const { diet } = req.body;
  // Filter meals based on diet (mock logic)
  const filteredMeals = mealSuggestions.filter((meal) =>
    diet === 'All' || meal.meal.toLowerCase().includes(diet.toLowerCase())
  );
  res.status(200).json(filteredMeals);
};

// Controller function to generate grocery list
exports.generateGroceryList = (req, res) => {
  res.status(200).json(groceryList);
};