import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ProgressChartCard = ({
  data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Weight Loss (kg)',
        data: [5, 4.5, 4, 3.5, 3, 2.5],
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
      },
      {
        label: 'Muscle Gain (kg)',
        data: [1, 1.5, 2, 2.5, 3, 3.5],
        borderColor: '#2196F3',
        backgroundColor: 'rgba(33, 150, 243, 0.2)',
      },
    ],
  },
  options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Progress Over Time',
      },
    },
  },
  isLoading = false,
}) => {
  // Added skeleton loader for better user experience during loading
  if (isLoading) {
    return (
      <div className="bg-deepBlack p-4 rounded-lg shadow-lg hover:shadow-neonPurple transition-all duration-300">
        <h2 className="text-xl font-bold text-fitnityBlue mb-4">Progress Chart</h2>
        <div className="h-64 flex items-center justify-center">
          <div className="w-full h-full bg-gray-700 animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!data || !data.labels || !data.datasets) {
    return <p className="text-red-500">Invalid chart data</p>;
  }

  return (
    <div className="bg-deepBlack p-4 rounded-lg shadow-lg hover:shadow-neonPurple transition-all duration-300">
      <h2 className="text-xl font-bold text-fitnityBlue mb-4">Progress Chart</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default ProgressChartCard;