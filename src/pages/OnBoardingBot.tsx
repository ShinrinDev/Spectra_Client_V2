import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

const OnboardingBot: React.FC = () => {
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

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="rounded-sm border border-gray-300 bg-white shadow-lg w-full max-w-4xl flex flex-col h-[80%]">
        {/* Header */}
        <div className="bg-black text-white p-4 rounded-t-sm">
          <h1 className="text-lg font-bold">Welcome to Spectra Onboarding</h1>
          <p className="text-sm">
            Let’s get you started with a quick setup! Type "Hi" to activate the
            bot🤖
          </p>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 flex ${
                msg.sender === 'bot' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`${
                  msg.sender === 'bot'
                    ? 'bg-gray-100 text-black'
                    : 'bg-black text-white'
                } rounded-lg p-4 max-w-[80%] break-words`}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="mb-4 flex justify-end">
              <div className="bg-gray-100 text-black rounded-lg p-4 max-w-[80%] break-words">
                <div className="flex items-center space-x-4">
                  <div className="spinner w-6 h-6 border-4 border-blue-500 border-t-transparent border-t-4 rounded-full animate-spin"></div>
                  <span>Loading...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-300">
          <form className="flex items-center" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-lg border border-gray-300 bg-gray-50 py-3 px-4 text-black outline-none focus:border-black focus:ring focus:ring-black focus:ring-opacity-50"
              disabled={isLoading} // Disable input while loading
            />
            <button
              type="submit"
              className="ml-4 bg-black text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition"
              disabled={isLoading} // Disable button while loading
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
