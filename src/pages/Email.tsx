import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';



const Emails = () => {
  // Dummy email data
  const [emails] = useState([
    {
      id: 1,
      sender: 'john.doe@example.com',
      subject: 'Meeting Reminder',
      content: `Hi there, just a reminder about the meeting tomorrow at 10 AM. Please let me know if you can make it.`,
      timestamp: '2024-12-13 09:45 AM',
    },
    {
      id: 2,
      sender: 'team@newsletter.com',
      subject: 'Weekly Update',
      content: `Here's your weekly update. We've added new features to our platform. Check it out!`,
      timestamp: '2024-12-12 08:30 PM',
    },
    {
      id: 3,
      sender: 'support@service.com',
      subject: 'Password Reset',
      content: `Your password reset request has been processed. If this wasn't you, please contact support immediately.`,
      timestamp: '2024-12-12 03:15 PM',
    },
  ]);

  const [selectedEmail, setSelectedEmail] = useState(null);
  const [replyContent, setReplyContent] = useState('');

  const handleSelectEmail = (email: Email) => {
    setSelectedEmail(email);
    setReplyContent(''); // Clear reply content when switching emails
  };

  const handleReply = () => {
    if (replyContent.trim()) {
      alert(`Reply sent to ${selectedEmail?.sender}:\n\n${replyContent}`);
      setReplyContent('');
    }
  };

  return (
    <> 
     <Breadcrumb pageName='Emails'/>
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">Inbox</h1>
        <div className="flex flex-col lg:flex-row">
          {/* Inbox List */}
          <div className="lg:w-1/3 bg-gray-800 rounded-lg shadow-md p-4 mb-6 lg:mb-0 lg:mr-4">
            <h2 className="text-xl font-semibold text-white mb-4">Emails</h2>
            <ul>
              {emails.map((email) => (
                <li
                  key={email.id}
                  className={`p-3 rounded-lg cursor-pointer mb-3 ${
                    selectedEmail?.id === email.id ? 'bg-blue-100' : 'hover:bg-black'
                  }`}
                  onClick={() => handleSelectEmail(email)}
                >
                  <div className="font-medium text-white">{email.sender}</div>
                  <div className="text-sm text-white truncate">{email.subject}</div>
                  <div className="text-xs text-white">{email.timestamp}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* Email Details */}
          <div className="lg:w-2/3 bg-gray-900 rounded-lg shadow-md p-6">
            {selectedEmail ? (
              <>
                <h2 className="text-2xl font-semibold text-white mb-4">{selectedEmail.subject}</h2>
                <div className="mb-4">
                  <p className="text-white">
                    <strong>From:</strong> {selectedEmail.sender}
                  </p>
                  <p className="text-white text-sm">{selectedEmail.timestamp}</p>
                </div>
                <div className="mb-6">
                  <p className="text-white whitespace-pre-line">{selectedEmail.content}</p>
                </div>
                {/* Reply Form */}
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Reply</h3>
                  <textarea
                    className="w-full border rounded-lg p-2 text-gray-700 bg-gray-500"
                    rows={4}
                    placeholder="Type your reply..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                  />
                  <button
                    className="mt-3 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                    onClick={handleReply}
                    disabled={!replyContent.trim()}
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <p className="text-gray-400">Select an email to view details.</p>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  
  );
};

export default Emails;
