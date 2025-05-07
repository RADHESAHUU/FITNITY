import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../components/ui/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  
  // If user is already authenticated, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await login(email, password);
      // After successful login, always redirect to dashboard
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container flex items-center justify-center">
      <div className="card w-full max-w-md p-8 animate-fadeIn">
        <h2 className="text-3xl font-semibold text-center mb-6 text-white/90">Welcome Back</h2>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6 text-red-400 text-center">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-white/70 mb-2 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-dark w-full"
              required
              placeholder="your@email.com"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-white/70 mb-2 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-dark w-full"
              required
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="btn-glow w-full py-3 text-lg font-semibold"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Logging in...
              </span>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="mt-6 space-y-2 text-center">
          <p className="text-white/50">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-400 hover:text-blue-300 transition-colors">
              Sign up
            </Link>
          </p>
          <p className="text-white/50">
            <Link to="/forgot-password" className="text-blue-400 hover:text-blue-300 transition-colors">
              Forgot your password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;