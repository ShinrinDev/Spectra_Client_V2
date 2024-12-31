import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

import { useNavigate } from 'react-router-dom';
const OnboardingBot: React.FC = () => {

  const navigate = useNavigate();
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    [],
  );
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    // Add the user's message to the chat
    const newMessages = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput(''); // Clear the input field
    setIsLoading(true); // Show the spinner

    try {
      // Send the user's message to the Flask server
      const response = await fetch(
        'https://flask-app-722769025902.us-central1.run.app/api/onboarding', // Updated URL
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userInput }),
        },
      );

      const data = await response.json();

      // Add the bot's response to the chat
      setMessages([...newMessages, { sender: 'bot', text: data.response }]);
    } catch (error) {
      console.error('Error communicating with the server:', error);
      setMessages([
        ...newMessages,
        { sender: 'bot', text: 'Something went wrong. Please try again.' },
      ]);
    } finally {
      setIsLoading(false); // Hide the spinner
    }
  };

  // Scroll to the bottom when messages are updated
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  const handleLogin = () =>{
    navigate("/auth/signin")
  }
  return (
    <div className="flex items-center justify-center h-screen bg-customblack">
      <div className="rounded-lg border border-gray-700 bg-gray-800 shadow-xl w-full max-w-4xl flex flex-col h-[80%] relative">
        {/* Go to Login Button */}
        <div className="absolute top-4 right-4">
          <button
            onClick={() => {
              window.location.href = '/auth/signin'; // Replace with your login route
            }}
            className="bg-[#fad949] text-black px-4 py-2 rounded-lg text-sm hover:bg-opacity-90 transition"
          >
            Go to Login
          </button>
        </div>

        {/* Header */}
        <div className="bg-customblack text-white p-6 rounded-t-lg">
          <h1 className="text-2xl font-bold">Welcome to Spectra Onboarding</h1>
          <p className="text-md text-[#fad949] mt-2">
            Let’s get you started with a quick setup! Type "Hi" to activate the bot 🤖
          </p>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-customDarkGray">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 flex ${
                msg.sender === 'bot' ? 'justify-start' : 'justify-end'
              }`}
            >
              <div
                className={`${
                  msg.sender === 'bot'
                    ? 'bg-gray-700 text-white'
                    : 'bg-[#fad949] text-black'
                } rounded-lg px-4 py-3 max-w-[75%] break-words`}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="mb-4 flex justify-start">
              <div className="bg-gray-700 text-white rounded-lg px-4 py-3 max-w-[75%] break-words flex items-center space-x-3">
                <div className="w-5 h-5 border-4 border-t-gold border-gold rounded-full animate-spin"></div>
                <span>Loading...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-700 bg-customblack">
          <form className="flex items-center" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-lg border border-gray-700 bg-customDarkGray py-3 px-4 text-white placeholder-gray-500 outline-none focus:ring focus:ring-[#fad949]"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="ml-4 bg-[#fad949] text-black px-6 py-3 rounded-lg hover:bg-opacity-90 transition"
              disabled={isLoading}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingBot;
