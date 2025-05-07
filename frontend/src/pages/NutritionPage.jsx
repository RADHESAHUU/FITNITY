import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NutritionPage = () => {
  const [mealPlan, setMealPlan] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const [groceryList, setGroceryList] = useState(null);
  const [dietFilter, setDietFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeOfTheDay = async () => {
      try {
        const response = await axios.get('/api/recipes/today');
        setRecipe(response.data);
      } catch (err) {
        setError('Failed to fetch the recipe of the day.');
      }
    };

    fetchRecipeOfTheDay();
  }, []);

  // Updated API endpoints to match the backend
  const generateMealPlan = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/nutrition/suggest', { diet: dietFilter });
      if (response.status === 200) {
        setMealPlan(response.data);
      } else {
        throw new Error(response.data.message || 'Failed to generate meal plan.');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const generateGroceryList = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/nutrition/generate', { mealPlan });
      if (response.status === 200) {
        setGroceryList(response.data);
      } else {
        throw new Error(response.data.message || 'Failed to generate grocery list.');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fadeIn min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-poppins p-6">
      <h1 className="text-3xl font-semibold mb-6">Nutrition Planner</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* AI Meal Suggestion */}
        <div className="bg-[#161b29] rounded-2xl shadow-xl p-5">
          <h2 className="text-2xl font-semibold text-[#00C6FF] mb-4">AI Meal Suggestion</h2>
          <p>Get personalized meal suggestions based on your fitness goals.</p>
          <button onClick={generateMealPlan} className="btn-glow mt-4" disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate Meal Plan'}
          </button>
          {mealPlan && (
            <ul className="mt-4 text-white/70">
              {mealPlan.map((meal, index) => (
                <li key={index}>{meal}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Recipe of the Day */}
        <div className="bg-[#161b29] rounded-2xl shadow-xl p-5">
          <h2 className="text-2xl font-semibold text-[#00C6FF] mb-4">Recipe of the Day</h2>
          {recipe ? (
            <>
              <img
                src={recipe.image}
                alt="Recipe of the Day"
                className="rounded-lg mb-4"
              />
              <p>Calories: {recipe.calories}</p>
              <p>Ingredients: {recipe.ingredients.join(', ')}</p>
            </>
          ) : (
            <p>Loading recipe...</p>
          )}
        </div>

        {/* Grocery List Generator */}
        <div className="bg-[#161b29] rounded-2xl shadow-xl p-5">
          <h2 className="text-2xl font-semibold text-[#00C6FF] mb-4">Grocery List Generator</h2>
          <p>Create a grocery list based on your meal plan.</p>
          <button onClick={generateGroceryList} className="btn-glow mt-4" disabled={isLoading || !mealPlan}>
            {isLoading ? 'Generating...' : 'Download List'}
          </button>
          {groceryList && (
            <ul className="mt-4 text-white/70">
              {groceryList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Diet Filter */}
        <div className="bg-[#161b29] rounded-2xl shadow-xl p-5">
          <h2 className="text-2xl font-semibold text-[#00C6FF] mb-4">Diet Filter</h2>
          <div className="flex gap-2">
            {['All', 'Veg', 'High Protein', 'Jain'].map((diet) => (
              <button
                key={diet}
                onClick={() => setDietFilter(diet)}
                className={`btn-glow ${dietFilter === diet ? 'bg-[#00C6FF] text-black' : ''}`}
              >
                {diet}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default NutritionPage;