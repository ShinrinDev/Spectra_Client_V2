import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

interface Email {
  id: number;
  sender: string;
  subject: string;
  content: string;
  timestamp: string;
  thread: { sender: string; content: string; timestamp: string }[];
}

interface SMS {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  thread: { sender: string; content: string; timestamp: string }[];
}

const Communication = () => {
  const emailSignature = `
Best regards,
Shaun Tsix
CSO
Shinrin AI
Email: shaun@shinrin.com
Phone: +123-456-7890`;

  const smsSignature = `
- Sent via Spectra SMS Service`;

  const [emails, setEmails] = useState<Email[]>([
    {
      id: 1,
      sender: 'john.doe@example.com',
      subject: 'Meeting Reminder',
      content: `Hi there, just a reminder about the meeting tomorrow at 10 AM. Please let me know if you can make it.`,
      timestamp: '2024-12-13 09:45 AM',
      thread: [
        { sender: 'shaun@shinrin.com', content: `Got it, John. I’ll be there.\n\n${emailSignature}`, timestamp: '2024-12-13 10:00 AM' },
        { sender: 'john.doe@example.com', content: 'Perfect! Let’s meet in the conference room.', timestamp: '2024-12-13 10:15 AM' },
        { sender: 'shaun@shinrin.com', content: `Sounds good. See you then!\n\n${emailSignature}`, timestamp: '2024-12-13 10:30 AM' },
      ],
    },
    {
      id: 2,
      sender: 'team@newsletter.com',
      subject: 'Weekly Update',
      content: `Here's your weekly update. We've added new features to our platform. Check it out!`,
      timestamp: '2024-12-12 08:30 PM',
      thread: [
        { sender: 'you@example.com', content: `Thanks for the update. I’ll take a look.\n\n${emailSignature}`, timestamp: '2024-12-12 09:00 PM' },
        { sender: 'team@newsletter.com', content: 'Let us know if you have any feedback.', timestamp: '2024-12-12 09:15 PM' },
        { sender: 'you@example.com', content: `Will do. Appreciate the improvements!\n\n${emailSignature}`, timestamp: '2024-12-12 09:30 PM' },
      ],
    },
    {
      id: 3,
      sender: 'support@service.com',
      subject: 'Password Reset',
      content: `Your password reset request has been processed. If this wasn't you, please contact support immediately.`,
      timestamp: '2024-12-12 03:15 PM',
      thread: [
        { sender: 'you@example.com', content: `Thanks for confirming. I’ll reset it now.\n\n${emailSignature}`, timestamp: '2024-12-12 03:30 PM' },
        { sender: 'support@service.com', content: 'Let us know if you encounter any issues.', timestamp: '2024-12-12 03:45 PM' },
      ],
    },
  ]);

  const [smsMessages, setSmsMessages] = useState<SMS[]>([
    {
      id: 1,
      sender: '+1234567890',
      content: `Hey, can we reschedule our meeting to next week?`,
      timestamp: '2024-12-13 08:30 AM',
      thread: [
        { sender: 'you', content: `Sure, let me know your availability.\n${smsSignature}`, timestamp: '2024-12-13 08:45 AM' },
        { sender: '+1234567890', content: `Thank you! I’ll get back to you by the end of the day.`, timestamp: '2024-12-13 09:00 AM' },
        { sender: 'you', content: `Looking forward to it.\n${smsSignature}`, timestamp: '2024-12-13 09:15 AM' },
      ],
    },
    {
      id: 2,
      sender: '+9876543210',
      content: `Can you send me the latest report?`,
      timestamp: '2024-12-13 10:00 AM',
      thread: [
        { sender: 'you', content: `Sure thing. Sending it over now.\n${smsSignature}`, timestamp: '2024-12-13 10:15 AM' },
        { sender: '+9876543210', content: `Got it. Thanks!`, timestamp: '2024-12-13 10:30 AM' },
        { sender: 'you', content: `Let me know if you have any questions.\n${smsSignature}`, timestamp: '2024-12-13 10:45 AM' },
      ],
    },
    {
      id: 3,
      sender: '+4561237890',
      content: `Can we confirm the delivery address?`,
      timestamp: '2024-12-12 05:30 PM',
      thread: [
        { sender: 'you', content: `Yes, the address is 123 Main St. Is that correct?\n${smsSignature}`, timestamp: '2024-12-12 05:45 PM' },
        { sender: '+4561237890', content: `Confirmed. Thanks for checking.`, timestamp: '2024-12-12 06:00 PM' },
        { sender: 'you', content: `Great! The package will arrive tomorrow.\n${smsSignature}`, timestamp: '2024-12-12 06:15 PM' },
      ],
    },
  ]);

  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [selectedSms, setSelectedSms] = useState<SMS | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const handleSelectEmail = (email: Email) => {
    setSelectedEmail(email);
    setSelectedSms(null);
    setReplyContent('');
  };

  const handleSelectSms = (sms: SMS) => {
    setSelectedSms(sms);
    setSelectedEmail(null);
    setReplyContent('');
  };

  const handleReplyEmail = () => {
    if (replyContent.trim() && selectedEmail) {
      const replyWithSignature = `${replyContent}\n\n${emailSignature}`;
      const updatedEmails = emails.map((email) =>
        email.id === selectedEmail.id
          ? {
              ...email,
              thread: [
                ...email.thread,
                { sender: 'you@example.com', content: replyWithSignature, timestamp: new Date().toLocaleString() },
              ],
            }
          : email
      );
      setEmails(updatedEmails);
      setReplyContent('');
    }
  };

  const handleReplySms = () => {
    if (replyContent.trim() && selectedSms) {
      const replyWithSignature = `${replyContent}\n\n${smsSignature}`;
      const updatedSmsMessages = smsMessages.map((sms) =>
        sms.id === selectedSms.id
          ? {
              ...sms,
              thread: [
                ...sms.thread,
                { sender: 'you', content: replyWithSignature, timestamp: new Date().toLocaleString() },
              ],
            }
          : sms
      );
      setSmsMessages(updatedSmsMessages);
      setReplyContent('');
    }
  };

  return (
    <>
      <Breadcrumb pageName="Interested Leads" />
      <div className="min-h-screen bg-white dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">Inbox</h1>
          <div className="flex flex-col lg:flex-row">
            {/* Emails Section */}
            <div className="lg:w-1/3 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6 lg:mb-0 lg:mr-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Emails</h2>
              <ul>
                {emails.map((email) => (
                  <li
                    key={email.id}
                    className={`p-3 rounded-lg cursor-pointer mb-3 ${
                      selectedEmail?.id === email.id ? 'bg-blue-100' : 'hover:bg-black'
                    }`}
                    onClick={() => handleSelectEmail(email)}
                  >
                    <div className="font-medium text-gray-600 dark:text-white">{email.sender}</div>
                    <div className="text-sm text-gray-400 dark:text-white truncate">{email.subject}</div>
                    <div className="text-xs text-gray-200 dark:text-white">{email.timestamp}</div>
                  </li>
                ))}
              </ul>
            </div>

            {/* SMS Section */}
            <div className="lg:w-1/3 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6 lg:mb-0 lg:mr-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">SMS</h2>
              <ul>
                {smsMessages.map((sms) => (
                  <li
                    key={sms.id}
                    className={`p-3 rounded-lg cursor-pointer mb-3 ${
                      selectedSms?.id === sms.id ? 'bg-blue-100' : 'hover:bg-black'
                    }`}
                    onClick={() => handleSelectSms(sms)}
                  >
                    <div className="font-medium text-gray-600 dark:text-white">{sms.sender}</div>
                    <div className="text-sm text-gray-400 dark:text-white truncate">{sms.content}</div>
                    <div className="text-xs text-gray-200 dark:text-white">{sms.timestamp}</div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Details Section */}
            <div className="lg:w-2/3 bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
              {selectedEmail ? (
                <>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{selectedEmail.subject}</h2>
                  <ul className="mb-4">
                    {selectedEmail.thread.map((message, index) => (
                      <li key={index} className="mb-4">
                        <p className="text-gray-600 dark:text-white">
                          <strong>{message.sender}:</strong>
                          <br />
                          {message.content}
                        </p>
                        <p className="text-xs text-gray-400">{message.timestamp}</p>
                      </li>
                    ))}
                  </ul>
                  <textarea
                    className="w-full border-gray-300 rounded-md p-2 mb-4 text-black"
                    rows={4}
                    placeholder="Write your reply..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                  />
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    onClick={handleReplyEmail}
                  >
                    Send Reply
                  </button>
                </>
              ) : selectedSms ? (
                <>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{selectedSms.sender}</h2>
                  <ul className="mb-4">
                    {selectedSms.thread.map((message, index) => (
                      <li key={index} className="mb-4">
                        <p className="dark:text-white">
                          <strong>{message.sender}:</strong>
                          <br />
                          {message.content}
                        </p>
                        <p className="text-xs text-gray-400">{message.timestamp}</p>
                      </li>
                    ))}
                  </ul>
                  <textarea
                    className="w-full border-gray-300 rounded-md p-2 mb-4 text-black"
                    rows={4}
                    placeholder="Write your reply..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                  />
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    onClick={handleReplySms}
                  >
                    Send Reply
                  </button>
                </>
              ) : (
                <p className="text-gray-400">Select an email or SMS to view details.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Communication;
