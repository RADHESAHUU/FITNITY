import React from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import yogaAnimation from '../../assets/animations/yoga.json';

const SplashScreen = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 text-white font-poppins relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 animate-gradient blur-2xl opacity-50"></div>

      {/* Fitnity Logo with Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-center z-10"
      >
        <h1 className="text-5xl font-bold text-white mb-4 animate-pulse">Fitnity</h1>
        <p className="text-lg font-medium text-white/80">India’s #1 AI Fitness Partner</p>
      </motion.div>

      {/* Lottie Animation */}
      <div className="w-48 h-48 mt-6">
        <Lottie animationData={yogaAnimation} loop={true} />
      </div>

      {/* Loading Spinner */}
      <div className="w-12 h-12 border-4 border-t-white border-gray-300 rounded-full animate-spin mt-6"></div>

      {/* Get Started Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="mt-8 px-6 py-3 bg-white text-purple-600 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-purple-100"
      >
        Get Started
      </motion.button>

      {/* Skip Option */}
      <div className="absolute bottom-4 right-4 text-sm text-white/70 cursor-pointer hover:underline">
        Skip
      </div>
    </div>
  );
};

export default SplashScreen;