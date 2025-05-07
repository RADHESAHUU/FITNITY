import React, { useState } from 'react';
import { Send } from 'lucide-react';

const AssistantPage = () => {
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi! How can I assist you today?' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { type: 'user', text: input }]);
      setInput('');
      setTimeout(() => {
        setMessages((prev) => [...prev, { type: 'bot', text: 'This is a simulated response.' }]);
      }, 1000);
    }
  };

  return (
    <div className="animate-fadeIn min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-poppins flex flex-col">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 w-full bg-[#1d263a] text-white py-4 px-6 shadow-lg z-50">
        <h1 className="text-2xl font-semibold">Ask Fitnity AI</h1>
      </div>

      {/* Main Chat Box */}
      <div className="flex-1 mt-16 p-6 overflow-y-auto bg-[#1d263a] rounded-xl mx-6">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 p-3 rounded-lg ${
              msg.type === 'bot' ? 'bg-[#2e394f] text-white' : 'bg-[#00C6FF] text-black'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="flex items-center bg-[#2e394f] rounded-full px-4 py-2 mx-6 mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-transparent text-white placeholder:text-white/50 focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="ml-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full hover:scale-105 transition-transform"
        >
          <Send />
        </button>
      </div>
    </div>
  );
};

export default AssistantPage;