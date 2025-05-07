import React, { useState } from 'react';
import Lottie from 'lottie-react';
import { useNavigate } from 'react-router-dom';
import yogaAnimation from '../../assets/animations/yoga.json';

const YogaCard = ({ sessionName = "Morning Yoga", duration = "30 mins" }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleStartSession = () => {
    try {
      navigate('/yoga-session-details');
    } catch (err) {
      setError('Failed to start the session. Please try again later.');
    }
  };

  return (
    <div className="bg-deepBlack p-4 rounded-lg shadow-lg hover:shadow-neonPurple transition-all duration-300" role="region" aria-labelledby="yoga-session-title">
      <h2 id="yoga-session-title" className="text-xl font-bold text-fitnityBlue mb-4">Today's Yoga Session</h2>
      <div className="w-full h-64 mb-4">
        <Lottie animationData={yogaAnimation} loop={true} aria-label="Yoga animation" />
      </div>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <p className="text-gray-400 mb-2">Session: {sessionName}</p>
      <p className="text-gray-400 mb-4">Duration: {duration}</p>
      <button
        onClick={handleStartSession}
        className="px-4 py-2 bg-fitnityBlue text-white rounded-lg hover:bg-neonPurple transition"
        aria-label="Start yoga session"
      >
        Start Session
      </button>
    </div>
  );
};

export default YogaCard;