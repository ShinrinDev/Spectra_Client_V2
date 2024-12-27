import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

interface Message {
  id: number;
  type: 'email' | 'sms';
  sender: string;
  subject?: string;
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

const [emails, setEmails] = useState<Message[]>([
  {
    id: 1,
    type: 'email',
    sender: 'john.doe@example.com',
    subject: 'Meeting Reminder',
    content: `Hi there, just a reminder about the meeting tomorrow at 10 AM.`,
    timestamp: '2024-12-13 09:45 AM',
    thread: [
      { sender: 'shaun@shinrin.com', content: `Got it, John. I’ll be there.\n\n${emailSignature}`, timestamp: '2024-12-13 10:00 AM' },
      { sender: 'john.doe@example.com', content: `Great! See you then.\n\nBest, John`, timestamp: '2024-12-13 10:10 AM' },
      { sender: 'shaun@shinrin.com', content: `Looking forward to it!`, timestamp: '2024-12-13 10:15 AM' },
    ],
  },
  {
    id: 2,
    type: 'email',
    sender: 'project.manager@bigcorp.com',
    subject: 'Status Update Request',
    content: `Could you provide the latest update on Project Phoenix?`,
    timestamp: '2024-12-12 04:15 PM',
    thread: [
      { sender: 'shaun@shinrin.com', content: `Sure, I'll send you the details shortly.\n\n${emailSignature}`, timestamp: '2024-12-12 04:45 PM' },
      { sender: 'project.manager@bigcorp.com', content: `Thanks, looking forward to it.`, timestamp: '2024-12-12 05:00 PM' },
      { sender: 'shaun@shinrin.com', content: `Just sent over the report. Let me know if you need any additional info.\n\n${emailSignature}`, timestamp: '2024-12-12 05:10 PM' },
      { sender: 'project.manager@bigcorp.com', content: `Got it, Shaun. I’ll review and reach out if needed.`, timestamp: '2024-12-12 05:20 PM' },
    ],
  },
  {
    id: 3,
    type: 'email',
    sender: 'hr@startup.org',
    subject: 'Job Offer Follow-up',
    content: `Hi Shaun, just checking if you’ve had a chance to review the job offer we sent last week.`,
    timestamp: '2024-12-10 09:00 AM',
    thread: [
      { sender: 'shaun@shinrin.com', content: `Yes, I’ll get back to you by EOD tomorrow.\n\n${emailSignature}`, timestamp: '2024-12-10 09:15 AM' },
      { sender: 'hr@startup.org', content: `Looking forward to hearing from you!`, timestamp: '2024-12-10 09:30 AM' },
      { sender: 'shaun@shinrin.com', content: `I’ve reviewed the offer. I’ll send my response soon.\n\n${emailSignature}`, timestamp: '2024-12-10 10:00 AM' },
    ],
  },
  {
    id: 4,
    type: 'email',
    sender: 'tech.support@hardwareco.com',
    subject: 'Hardware Issue: Case #4578',
    content: `Our records show your reported hardware issue has been resolved. Please confirm.`,
    timestamp: '2024-12-08 01:30 PM',
    thread: [
      { sender: 'shaun@shinrin.com', content: `Confirmed. Everything is working perfectly now.\n\n${emailSignature}`, timestamp: '2024-12-08 02:00 PM' },
      { sender: 'tech.support@hardwareco.com', content: `Glad to hear that! Let us know if you need further assistance.`, timestamp: '2024-12-08 02:15 PM' },
      { sender: 'shaun@shinrin.com', content: `Will do. Thanks for the prompt resolution!\n\n${emailSignature}`, timestamp: '2024-12-08 02:30 PM' },
    ],
  },
  {
    id: 5,
    type: 'email',
    sender: 'legal@consultfirm.com',
    subject: 'Contract Review Feedback',
    content: `Attached is the revised contract for your review. Let us know your comments.`,
    timestamp: '2024-12-07 11:15 AM',
    thread: [
      { sender: 'shaun@shinrin.com', content: `Thanks, I'll review and revert soon.\n\n${emailSignature}`, timestamp: '2024-12-07 12:00 PM' },
      { sender: 'legal@consultfirm.com', content: `Let us know if you need any clarifications.\n\nBest regards, Legal Team`, timestamp: '2024-12-07 12:30 PM' },
      { sender: 'shaun@shinrin.com', content: `Just sent my feedback. Please review.\n\n${emailSignature}`, timestamp: '2024-12-07 01:00 PM' },
      { sender: 'legal@consultfirm.com', content: `Received, we will make the necessary adjustments. Thanks for your input!`, timestamp: '2024-12-07 01:15 PM' },
    ],
  },
]);

const [smsMessages, setSmsMessages] = useState<Message[]>([
  {
    id: 6,
    type: 'sms',
    sender: '+1234567890',
    content: `Hey, can we reschedule our meeting to next week?`,
    timestamp: '2024-12-13 08:30 AM',
    thread: [
      { sender: 'you', content: `Sure, let me know your availability.\n${smsSignature}`, timestamp: '2024-12-13 08:45 AM' },
      { sender: '+1234567890', content: `I’m available on Tuesday or Thursday after 2 PM. How about you?`, timestamp: '2024-12-13 09:00 AM' },
      { sender: 'you', content: `Thursday works for me. Let’s confirm the time tomorrow.\n${smsSignature}`, timestamp: '2024-12-13 09:30 AM' },
    ],
  },
  {
    id: 7,
    type: 'sms',
    sender: '+9876543210',
    content: `Reminder: Your appointment is scheduled for tomorrow at 3 PM.`,
    timestamp: '2024-12-12 02:00 PM',
    thread: [
      { sender: 'you', content: `Thanks for the reminder.\n${smsSignature}`, timestamp: '2024-12-12 02:15 PM' },
      { sender: '+9876543210', content: `No problem, see you tomorrow!`, timestamp: '2024-12-12 02:20 PM' },
      { sender: 'you', content: `See you then!`, timestamp: '2024-12-12 02:25 PM' },
    ],
  },
  {
    id: 8,
    type: 'sms',
    sender: '+1112223333',
    content: `Can you send me the latest presentation deck?`,
    timestamp: '2024-12-11 09:45 AM',
    thread: [
      { sender: 'you', content: `Sure, I'll email it shortly.\n${smsSignature}`, timestamp: '2024-12-11 10:00 AM' },
      { sender: '+1112223333', content: `Great, thanks!`, timestamp: '2024-12-11 10:05 AM' },
    ],
  },
  {
    id: 9,
    type: 'sms',
    sender: '+4445556666',
    content: `Happy holidays, Shaun! Hope all is well!`,
    timestamp: '2024-12-10 07:30 PM',
    thread: [
      { sender: 'you', content: `Thanks! Happy holidays to you too.\n${smsSignature}`, timestamp: '2024-12-10 07:45 PM' },
      { sender: '+4445556666', content: `Hope you’re enjoying some downtime!`, timestamp: '2024-12-10 08:00 PM' },
      { sender: 'you', content: `Definitely, taking it easy. Thanks again!\n${smsSignature}`, timestamp: '2024-12-10 08:15 PM' },
    ],
  },
  {
    id: 10,
    type: 'sms',
    sender: '+9998887777',
    content: `Don’t forget to submit your expense report by this Friday.`,
    timestamp: '2024-12-09 03:00 PM',
    thread: [
      { sender: 'you', content: `Will do. Thanks for the heads-up.\n${smsSignature}`, timestamp: '2024-12-09 03:15 PM' },
      { sender: '+9998887777', content: `Looking forward to it, thanks!`, timestamp: '2024-12-09 03:30 PM' },
      { sender: 'you', content: `No problem. I’ll have it ready.\n${smsSignature}`, timestamp: '2024-12-09 03:45 PM' },
    ],
  },
]);

const combinedMessages = [...emails, ...smsMessages].sort((a, b) =>
  new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
);

  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const handleSelectMessage = (message: Message) => {
    setSelectedMessage(message);
    setReplyContent('');
  };

  const handleReply = () => {
    if (replyContent.trim() && selectedMessage) {
      const replyWithSignature =
        selectedMessage.type === 'email'
          ? `${replyContent}\n\n${emailSignature}`
          : `${replyContent}\n\n${smsSignature}`;

      const updatedThread = {
        sender: 'you',
        content: replyWithSignature,
        timestamp: new Date().toLocaleString(),
      };

      if (selectedMessage.type === 'email') {
        setEmails((prev) =>
          prev.map((email) =>
            email.id === selectedMessage.id
              ? { ...email, thread: [...email.thread, updatedThread] }
              : email
          )
        );
      } else {
        setSmsMessages((prev) =>
          prev.map((sms) =>
            sms.id === selectedMessage.id
              ? { ...sms, thread: [...sms.thread, updatedThread] }
              : sms
          )
        );
      }
      setReplyContent('');
    }
  };

  return (
    <>
      <Breadcrumb pageName="Communication" />
      <div className="min-h-screen bg-white dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">Inbox</h1>
          <div className="flex flex-col lg:flex-row">
            {/* Message List */}
            <div className="lg:w-1/3 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6 lg:mb-0 lg:mr-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Messages</h2>
              <ul>
                {combinedMessages.map((message) => (
                  <li
                    key={message.id}
                    className={`p-3 rounded-lg cursor-pointer mb-3 ${
                      selectedMessage?.id === message.id ? 'bg-blue-100' : 'hover:bg-gray-200'
                    }`}
                    onClick={() => handleSelectMessage(message)}
                  >
                    <div className="font-medium text-gray-600 dark:text-white">
                      {message.type === 'email' ? message.sender : `SMS from ${message.sender}`}
                    </div>
                    {message.type === 'email' && (
                      <div className="text-sm text-gray-400 dark:text-white truncate">{message.subject}</div>
                    )}
                    <div className="text-xs text-gray-200 dark:text-white">{message.timestamp}</div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Message Details */}
            <div className="lg:w-2/3 bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
              {selectedMessage ? (
                <>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    {selectedMessage.type === 'email'
                      ? selectedMessage.subject
                      : `Conversation with ${selectedMessage.sender}`}
                  </h2>
                  <ul className="mb-4">
                    {selectedMessage.thread.map((message, index) => (
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
                    onClick={handleReply}
                  >
                    Send Reply
                  </button>
                </>
              ) : (
                <p className="text-gray-400">Select a message to view details.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Communication;
