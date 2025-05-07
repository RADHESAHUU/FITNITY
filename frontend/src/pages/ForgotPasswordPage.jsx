import React, { useState } from 'react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/users/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Password reset link sent to your email.');
      } else {
        setMessage(data.message || 'Failed to send reset link.');
      }
    } catch (err) {
      setMessage('Server error. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-deepBlack text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}
        <form onSubmit={handleReset} className="space-y-4">
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
          <button
            type="submit"
            className="w-full py-2 bg-fitnityBlue text-white rounded-lg hover:bg-neonPurple transition"
          >
            Reset Password
          </button>
        </form>
        <p className="text-center text-gray-400 mt-4">
          Remembered your password? <a href="/login" className="text-fitnityBlue hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;