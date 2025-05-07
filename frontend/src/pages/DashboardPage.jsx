import React, { useState, useEffect, lazy, Suspense } from 'react';
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
import { LucideIcon } from 'lucide-react';
import VoiceAssistant from '../components/ui/VoiceAssistant';
import axios from 'axios';

const LazyFitness3DScene = lazy(() => import('../components/ui/Fitness3DScene'));

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardPage = () => {
  const [progressData, setProgressData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
        label: 'Weight Over Time',
        data: progressData ? progressData.map((entry) => entry.weight) : [],
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
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
    <div className="page-container">
      <div className="max-w-7xl mx-auto space-y-6 animate-fadeIn">
        <h1 className="text-4xl font-semibold text-white/90">Fitness Dashboard</h1>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card min-h-[400px] relative overflow-hidden group">
              <h2 className="text-2xl font-semibold mb-6 text-blue-400">3D Progress View</h2>
              <Suspense fallback={
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              }>
                <LazyFitness3DScene progress={progressData?.length > 0 ? 
                  progressData.reduce((acc, entry) => acc + entry.weight, 0) / progressData.length : 0} 
                />
              </Suspense>
            </div>

            <div className="card min-h-[400px]">
              <h2 className="text-2xl font-semibold mb-6 text-blue-400">Voice Assistant</h2>
              <VoiceAssistant />
            </div>

            <div className="card">
              <h2 className="text-2xl font-semibold mb-6 text-blue-400">Progress Chart</h2>
              <div className="h-80">
                <Line 
                  data={chartData} 
                  options={{
                    ...chartOptions,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: 'rgba(255, 255, 255, 0.7)' }
                      },
                      x: {
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: 'rgba(255, 255, 255, 0.7)' }
                      }
                    },
                    plugins: {
                      legend: {
                        labels: { color: 'rgba(255, 255, 255, 0.7)' }
                      }
                    }
                  }}
                />
              </div>
            </div>

            <div className="card">
              <h2 className="text-2xl font-semibold mb-6 text-blue-400">Today's Highlights</h2>
              <div className="space-y-4">
                <button className="btn-glow w-full py-3 text-lg">
                  Start Workout Session
                </button>
                <button className="btn-glow w-full py-3 text-lg">
                  Track Progress
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;