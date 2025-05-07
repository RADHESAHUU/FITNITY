import React, { useState, useEffect } from 'react';
import axios from 'axios';
import YogaCard from '../components/ui/YogaCard';
import AssistantCard from '../components/ui/AssistantCard';
import ProgressChart from '../components/ui/ProgressChart';
import TaskList from '../components/ui/TaskList';
import WaterTracker from '../components/ui/WaterTracker';
import SleepAdvisor from '../components/ui/SleepAdvisor';
import ErrorBoundary from '../components/ui/ErrorBoundary';
import { LucideIcon } from 'lucide-react';

const PremiumPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [tiers, setTiers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
  }, []);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get('/api/subscriptions');
        setTiers(response.data.subscriptions);
      } catch (err) {
        setError('Failed to fetch subscription plans. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Updated to handle UPI-based payment integration
  const handleUpgrade = async (subscriptionId) => {
    try {
      const response = await axios.post('/api/subscriptions/create', {
        userId: '123', // Replace with dynamic user ID
        planId: subscriptionId,
      });

      if (response.status === 200) {
        const { clientSecret } = response.data;
        // Redirect to payment gateway or handle UPI payment flow
        alert('Redirecting to payment gateway...');
      } else {
        throw new Error(response.data.message || 'Failed to initiate payment.');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="animate-fadeIn min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-poppins p-6">
      <h1 className="text-3xl font-semibold text-center mb-8">Premium Membership</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier._id}
              className={`bg-[#131a2c] rounded-2xl shadow-xl p-6 text-center ${
                tier.name === 'Fitnity Pro' ? 'ring-4 ring-[#00C6FF]' : ''
              }`}
            >
              <h2 className="text-2xl font-semibold text-[#00C6FF] mb-4">{tier.name}</h2>
              <p className="text-lg text-white/80 mb-4">₹{tier.price}</p>
              <ul className="list-disc list-inside text-white/70 mb-4">
                {tier.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <button
                onClick={() => handleUpgrade(tier._id)}
                className="btn-glow"
              >
                Upgrade Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PremiumPage;