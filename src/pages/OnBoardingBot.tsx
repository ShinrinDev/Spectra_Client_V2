import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, storage } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import jsPDF from 'jspdf';

const OnboardingBot: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    [],
  );
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [questions, setQuestions] = useState([]);
  const [user, loading] = useAuthState(auth);
  const [isSaveLoading, setIsSaveLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      if (user) {
        setIsSaveLoading(true);
        // Step 1: Generate a PDF
        const pdfDoc = new jsPDF();
        pdfDoc.setFont('helvetica', 'bold');
        pdfDoc.setFontSize(18);
        pdfDoc.text('Onboarding Answers', 10, 10);

        pdfDoc.setFont('helvetica', 'normal');
        pdfDoc.setFontSize(10);

        // Add user's email and ID
        pdfDoc.text(`User ID: ${user.uid}`, 10, 20);
        pdfDoc.text(`User email: ${user.email}`, 10, 30);

        pdfDoc.setFont('helvetica', 'normal');
        pdfDoc.setFontSize(12);

        let y = 40; // Set initial y-coordinate below the user details

        questions.forEach((question, index) => {
          pdfDoc.text(`${index + 1}. ${question}`, 10, y);
          y += 10; // Move to the next line
          pdfDoc.text(`Answer: ${answers[index]}`, 20, y);
          y += 15; // Add spacing after each answer
          if (y > 280) {
            // If y-coordinate exceeds page height, add a new page
            pdfDoc.addPage();
            y = 20; // Reset y-coordinate for the new page
          }
        });

        const pdfBlob = pdfDoc.output('blob');

        // Step 2: Upload the PDF to Firebase Storage
        const storageRef = ref(storage, `onboardingAnswers/${user.uid}.pdf`);
        await uploadBytes(storageRef, pdfBlob);

        // Step 3: Get the Download URL
        const pdfUrl: string = await getDownloadURL(storageRef);

        // Step 4: Save the URL in Firestore
        await setDoc(doc(db, 'onboardingAnswers', user.uid), {
          uid: user.uid,
          pdfUrl,
          responses: answers.map((a, index) => ({
            q: questions[index],
            a,
          })),
          createdAt: new Date(),
        });

        setIsSaveLoading(false);
        alert('Wait for approval before joining platform');
        navigate('/auth/signin');
      }
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    // Add the user's message to the chat
    const newMessages = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput(''); // Clear the input field
    setIsLoading(true); // Show the spinner

    try {
      // Send the user's message to the Express chatbot server
      const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.uid, message: userInput }), // Replace with a dynamic userId if needed
      });

      const data = await response.json();

      console.log(data);
      if (data.isComplete) {
        setIsComplete(true);
        setQuestions(data.questions);
        setAnswers(data.answers);
      }

      // Add the bot's response to the chat
      setMessages([...newMessages, { sender: 'bot', text: data.message }]);
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

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth/signup');
    }
  }, [loading, user]);

  return (
    <div className="flex items-center justify-center h-screen bg-customblack">
      <div className="rounded-lg border border-gray-700 bg-gray-800 shadow-xl w-full max-w-4xl flex flex-col h-[80%] relative">
        {/* Header */}
        <div className="bg-customblack text-white p-6 rounded-t-lg">
          <h1 className="text-2xl font-bold">Welcome to Spectra Onboarding</h1>
          <p className="text-md text-[#fad949] mt-2">
            Let’s get you started with a quick setup! Type "Hi" to activate the
            bot 🤖
          </p>
        </div>

        {/* Chat Area */}
        <div
          className={clsx('flex-1 overflow-y-auto p-6 bg-customDarkGray', {
            hidden: isComplete,
          })}
        >
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
        <div
          className={clsx('p-4 border-t border-gray-700 bg-customblack', {
            hidden: isComplete,
          })}
        >
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

        {/* Verify Answers Section */}
        <div
          className={clsx('p-6 bg-customDarkGray flex-1 overflow-y-auto', {
            hidden: !isComplete,
          })}
        >
          <h2 className="text-xl font-bold text-white mb-4">
            Review and Edit Your Answers
          </h2>
          <form>
            {questions.map((q, index) => (
              <div key={`${q}${index}`} className="mb-4">
                <label className="block text-white mb-2 font-bold">{q}</label>
                <input
                  type="text"
                  value={answers[index]}
                  onChange={(e) => {
                    const updatedAnswers: string[] = [...answers];
                    updatedAnswers[index] = e.target.value;
                    setAnswers(updatedAnswers);
                  }}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring focus:ring-[#fad949]"
                />
              </div>
            ))}
            <button
              type="button"
              disabled={isSaveLoading}
              className="mt-4 bg-[#fad949] text-black px-6 py-3 rounded-lg hover:bg-opacity-90 transition"
              onClick={handleSubmit}
            >
              {isSaveLoading ? 'Loading...' : 'Save Answers'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingBot;
