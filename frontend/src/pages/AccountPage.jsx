import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AccountPage = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    goal: '',
    targetDate: '',
    diet: 'Veg',
    sleepHours: 8,
    subscription: 'Free',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = '123'; // Replace with dynamic user ID if available
        const response = await axios.get(`/api/users/${userId}`);
        setUserData(response.data);
      } catch (err) {
        setError('Failed to fetch user data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSaveChanges = async () => {
    try {
      const userId = '123'; // Replace with dynamic user ID if available
      await axios.put(`/api/users/${userId}`, userData);
      alert('Changes saved successfully!');
    } catch (err) {
      alert('Failed to save changes. Please try again later.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="animate-fadeIn min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-poppins p-6">
      <h1 className="text-3xl font-semibold mb-6">Account Settings</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Info */}
            <div className="bg-[#1c2433] rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-semibold text-[#00C6FF] mb-4">Personal Info</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-white/70 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                    className="input-dark w-full"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    className="input-dark w-full"
                  />
                </div>
              </div>
            </div>

            {/* Fitness Goals */}
            <div className="bg-[#1c2433] rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-semibold text-[#00C6FF] mb-4">Fitness Goals</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-white/70 mb-1">Goal</label>
                  <input
                    type="text"
                    name="goal"
                    value={userData.goal}
                    onChange={handleInputChange}
                    className="input-dark w-full"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-1">Target Date</label>
                  <input
                    type="date"
                    name="targetDate"
                    value={userData.targetDate}
                    onChange={handleInputChange}
                    className="input-dark w-full"
                  />
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-[#1c2433] rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-semibold text-[#00C6FF] mb-4">Preferences</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-white/70 mb-1">Diet</label>
                  <select
                    name="diet"
                    value={userData.diet}
                    onChange={handleInputChange}
                    className="input-dark w-full"
                  >
                    <option>Veg</option>
                    <option>Non-Veg</option>
                    <option>Vegan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/70 mb-1">Sleep Hours</label>
                  <input
                    type="number"
                    name="sleepHours"
                    value={userData.sleepHours}
                    onChange={handleInputChange}
                    className="input-dark w-full"
                  />
                </div>
              </div>
            </div>

            {/* Subscription Management */}
            <div className="bg-[#1c2433] rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-semibold text-[#00C6FF] mb-4">Subscription Management</h2>
              <p className="text-white/70 mb-4">Current Plan: {userData.subscription}</p>
              <button className="btn-glow">Upgrade Plan</button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button onClick={handleSaveChanges} className="btn-glow">
              Save Changes
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AccountPage;