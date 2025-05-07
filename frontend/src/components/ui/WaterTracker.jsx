import React, { useState } from 'react';

const WaterTrackerCard = ({ currentIntake = 0, goal = 8, onUpdate }) => {
  const [intake, setIntake] = useState(currentIntake);
  const [error, setError] = useState(null);

  const incrementIntake = () => {
    try {
      if (intake < goal) {
        const newIntake = intake + 1;
        setIntake(newIntake);
        if (onUpdate) onUpdate(newIntake);
      }
    } catch (err) {
      setError('Failed to update water intake. Please try again.');
    }
  };

  const resetIntake = () => {
    try {
      setIntake(0);
      if (onUpdate) onUpdate(0);
    } catch (err) {
      setError('Failed to reset water intake. Please try again.');
    }
  };

  const progressPercentage = Math.min((intake / goal) * 100, 100);

  return (
    <div className="bg-deepBlack p-4 rounded-lg shadow-lg hover:shadow-neonPurple transition-all duration-300" role="region" aria-labelledby="water-tracker-title">
      <h2 id="water-tracker-title" className="text-xl font-bold text-fitnityBlue mb-4">Water Tracker</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="relative w-full h-6 bg-gray-700 rounded-full overflow-hidden mb-4" aria-label="Water intake progress">
        <div
          className="h-full bg-fitnityBlue transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <p className="text-gray-400 mb-4">
        {intake}/{goal} cups
      </p>
      <div className="flex space-x-4">
        <button
          onClick={incrementIntake}
          className="px-4 py-2 bg-fitnityBlue text-white rounded-lg hover:bg-neonPurple transition"
          aria-label="Add a cup of water"
        >
          + Add Cup
        </button>
        <button
          onClick={resetIntake}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
          aria-label="Reset water intake"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default WaterTrackerCard;