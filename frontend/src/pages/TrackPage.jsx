import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const TrackPage = () => {
  const [progressData, setProgressData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
    localStorage.setItem('darkMode', !isDarkMode);
  };

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }

    const fetchProgressData = async () => {
      try {
        const userId = '123'; // Replace with dynamic user ID if available
        const response = await axios.get(`/api/progress/${userId}`);
        setProgressData(response.data);
      } catch (err) {
        setError('Failed to fetch progress data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgressData();
  }, []);

  const chartData = {
    labels: progressData ? progressData.map((entry) => entry.date) : [],
    datasets: [
      {
        label: 'Weight Progress',
        data: progressData ? progressData.map((entry) => entry.weight) : [],
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
      },
      {
        label: 'Muscle Gain',
        data: progressData ? progressData.map((entry) => entry.muscleGain) : [],
        borderColor: '#2196F3',
        backgroundColor: 'rgba(33, 150, 243, 0.2)',
      },
      {
        label: 'Calorie Intake',
        data: progressData ? progressData.map((entry) => entry.calories) : [],
        borderColor: '#FF5722',
        backgroundColor: 'rgba(255, 87, 34, 0.2)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Fitness Progress',
      },
    },
  };

  return (
    <div className="animate-fadeIn min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-poppins p-6">
      <div className="text-right mb-4">
        <button onClick={toggleDarkMode} className="btn-glow">
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </div>
      <h1 className="text-3xl font-semibold mb-6">Fitness Tracker</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Weight Progress Chart */}
          <div className="bg-[#1c2433]/80 backdrop-blur-sm shadow-2xl rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-[#00C6FF] mb-4">Weight Progress</h2>
            <Line data={chartData} options={chartOptions} />
          </div>

          {/* Muscle Gain Chart */}
          <div className="bg-[#1c2433]/80 backdrop-blur-sm shadow-2xl rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-[#00C6FF] mb-4">Muscle Gain</h2>
            <Line data={chartData} options={chartOptions} />
          </div>

          {/* Calorie Intake Chart */}
          <div className="bg-[#1c2433]/80 backdrop-blur-sm shadow-2xl rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-[#00C6FF] mb-4">Calorie Intake</h2>
            <Line data={chartData} options={chartOptions} />
          </div>

          {/* Filter Section */}
          <div className="bg-[#1c2433]/80 backdrop-blur-sm shadow-2xl rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-[#00C6FF] mb-4">Filter Progress</h2>
            <select className="input-dark mb-4">
              <option value="month">Month</option>
              <option value="goal">Goal Type</option>
            </select>
            <button className="btn-glow">Apply Filter</button>
          </div>

          {/* Download Report Button */}
          <div className="col-span-1 md:col-span-2 text-center">
            <button className="btn-glow">Download Progress Report</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackPage;