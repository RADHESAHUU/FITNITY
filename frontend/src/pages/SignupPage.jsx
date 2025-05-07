import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.post('/api/users/register', { name, email, password });
      if (response.status === 201) {
        navigate('/dashboard');
      } else {
        setError(response.data.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Server error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-deepBlack text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-400 mb-1">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-400 mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-400 mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-400 mb-1">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-fitnityBlue text-white rounded-lg hover:bg-neonPurple transition"
            disabled={isLoading}
          >
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <p className="text-center text-gray-400 mt-4">
          Already have an account? <a href="/login" className="text-fitnityBlue hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
