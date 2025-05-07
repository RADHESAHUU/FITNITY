import React, { useState, useEffect, useRef } from 'react';
import Fitness3DScene from './Fitness3DScene';

const AIChatCard = () => {
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi! How can I assist you today?' },
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const chatEndRef = useRef(null);

  const handleSend = async () => {
    if (input.trim()) {
      setMessages((prev) => [...prev, { type: 'user', text: input }]);
      setInput('');
      setIsProcessing(true);

      try {
        const response = await fetch('/api/assistant/respond', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: input }),
        });
        const data = await response.json();
        if (response.ok) {
          setMessages((prev) => [...prev, { type: 'bot', text: data.response }]);
        } else {
          setMessages((prev) => [...prev, { type: 'bot', text: 'Sorry, I could not process your request.' }]);
        }
      } catch (err) {
        setMessages((prev) => [...prev, { type: 'bot', text: 'Server error. Please try again later.' }]);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleMic = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessages((prev) => [...prev, { type: 'user', text: transcript }]);

      // Simulate bot response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { type: 'bot', text: 'This is a simulated response to your voice input.' },
        ]);
      }, 1000);
    };

    recognition.start();
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="relative bg-deepBlack p-4 rounded-lg shadow-lg hover:shadow-neonPurple transition-all duration-300 flex flex-col h-96">
      {/* 3D Model Background */}
      <div className="absolute inset-0 z-0">
        <Fitness3DScene />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10">
        <h2 className="text-xl font-bold text-fitnityBlue mb-4">AI Assistant</h2>
        <div className="flex-1 overflow-y-auto bg-gray-800 p-4 rounded-lg">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded-lg ${
                msg.type === 'bot' ? 'bg-fitnityBlue text-white' : 'bg-gray-700 text-gray-200'
              }`}
            >
              {msg.text}
            </div>
          ))}
          {isProcessing && (
            <div className="mb-2 p-2 rounded-lg bg-gray-700 text-gray-200 animate-pulse">
              Typing...
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        <div className="mt-4 flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="ml-2 px-4 py-2 bg-fitnityBlue text-white rounded-lg hover:bg-neonPurple transition"
          >
            Send
          </button>
          <button
            onClick={handleMic}
            className={`ml-2 px-4 py-2 rounded-lg transition ${
              isListening ? 'bg-red-500 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            {isListening ? 'Listening...' : 'Mic'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatCard;