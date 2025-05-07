import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SleepAdvisor = () => {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  const toggleModal = () => {
    try {
      setShowModal(!showModal);
    } catch (err) {
      setError('Failed to toggle recommendations. Please try again.');
    }
  };

  return (
    <div className="bg-deepBlack p-4 rounded-lg shadow-lg hover:shadow-neonPurple transition-all duration-300" role="region" aria-labelledby="sleep-advisor-title">
      <h2 id="sleep-advisor-title" className="text-xl font-bold text-fitnityBlue mb-4">Sleep Advisor</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button
        onClick={toggleModal}
        className="px-4 py-2 bg-fitnityBlue text-white rounded-lg hover:bg-neonPurple transition"
        aria-label="Get sleep recommendations"
      >
        Get Recommendations
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" role="dialog" aria-labelledby="sleep-recommendations-title">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h3 id="sleep-recommendations-title" className="text-lg font-bold text-fitnityBlue mb-4">Sleep Recommendations</h3>
            <ul className="list-disc list-inside text-gray-200">
              <li>Maintain a consistent sleep schedule.</li>
              <li>Avoid caffeine and heavy meals before bedtime.</li>
              <li>Create a relaxing bedtime routine.</li>
              <li>Ensure your bedroom is dark and quiet.</li>
            </ul>
            <button
              onClick={toggleModal}
              className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
              aria-label="Close sleep recommendations"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const SleepAdvisorCard = ({ sleepDuration = "7 hrs", quality = "Good" }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate('/sleep-details');
  };

  return (
    <div className="bg-deepBlack p-4 rounded-lg shadow-lg hover:shadow-neonPurple transition-all duration-300">
      <h2 className="text-xl font-bold text-fitnityBlue mb-4">Sleep Advisor</h2>
      <p className="text-gray-400 mb-2">Total Sleep: {sleepDuration}</p>
      <p className="text-gray-400 mb-4">Quality: {quality}</p>
      <button
        onClick={handleViewDetails}
        className="px-4 py-2 bg-fitnityBlue text-white rounded-lg hover:bg-neonPurple transition"
      >
        View Analysis
      </button>
    </div>
  );
};

export { SleepAdvisor };
export default SleepAdvisorCard;