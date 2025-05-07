import React, { useState, useEffect } from 'react';
import axios from 'axios';

const YogaPage = () => {
  const [filter, setFilter] = useState('All');
  const [yogaSessions, setYogaSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchYogaSessions = async () => {
      try {
        const response = await axios.get('/api/yoga/sessions');
        setYogaSessions(response.data);
      } catch (err) {
        setError('Failed to fetch yoga sessions. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchYogaSessions();
  }, []);

  const filteredSessions = filter === 'All' ? yogaSessions : yogaSessions.filter((session) => session.type === filter);

  return (
    <div className="animate-fadeIn min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-poppins p-6">
      <h1 className="text-3xl font-semibold mb-6">Yoga Sessions</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          {/* Filter Section */}
          <div className="flex gap-4 mb-6">
            {['All', 'Relax', 'Energy Boost', 'Beginner'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-lg ${
                  filter === type ? 'bg-[#00C6FF] text-black' : 'bg-[#1c2433] text-white'
                } hover:scale-105 transition-transform`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Yoga Sessions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredSessions.map((session, index) => (
              <div
                key={index}
                className="bg-[#1c2433] rounded-xl shadow-lg p-4 hover:scale-[1.02] transition-transform"
              >
                <img
                  src={session.thumbnail}
                  alt={session.title}
                  className="rounded-lg mb-4"
                />
                <h2 className="text-xl font-semibold text-teal-300 mb-2">{session.title}</h2>
                <p className="text-white/70 mb-4">Duration: {session.duration}</p>
                <button className="btn-glow">Start</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default YogaPage;