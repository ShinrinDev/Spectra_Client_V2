import { useState } from 'react';
import { Link } from 'react-router-dom';
import UserOne from '../../images/user/user-01.png';
import UserTwo from '../../images/user/user-02.png';
import UserThree from '../../images/user/user-03.png';
import UserFour from '../../images/user/user-04.png';
import UserFive from '../../images/user/user-05.png';

const emailData = [
  {
    avatar: UserOne,
    name: 'Devid Heilo',
    subject: 'Follow-up on our meeting',
    preview: 'How are you?',
    time: 12,
    unreadCount: 3,
    color: '#10B981',
  },
  {
    avatar: UserTwo,
    name: 'Henry Fisher',
    subject: 'Urgent: Please respond',
    preview: 'Waiting for you!',
    time: 12,
    unreadCount: 0,
    color: '#DC3545',
  },
  {
    avatar: UserFour,
    name: 'Jhon Doe',
    subject: 'Quick question',
    preview: "What's up?",
    time: 32,
    unreadCount: 0,
    color: '#10B981',
  },
  {
    avatar: UserFive,
    name: 'Jane Doe',
    subject: 'Project update',
    preview: 'Great',
    time: 32,
    unreadCount: 2,
    color: '#FFBA00',
  },
  {
    avatar: UserOne,
    name: 'Jhon Doe',
    subject: 'Re: Feedback needed',
    preview: 'How are you?',
    time: 32,
    unreadCount: 0,
    color: '#10B981',
  },
  {
    avatar: UserThree,
    name: 'Jhon Doe',
    subject: 'Weekly check-in',
    preview: 'How are you?',
    time: 32,
    unreadCount: 3,
    color: '#FFBA00',
  },
];

const EmailCard = () => {
  const [selectedEmail, setSelectedEmail] = useState(null);

  const handleRespondClick = (email) => {
    setSelectedEmail(email);
  };

  const closePopup = () => {
    setSelectedEmail(null);
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Inbox
      </h4>

      <div>
        {emailData.map((email, key) => (
          <div
            className="flex items-center gap-5 py-3 px-7.5 hover:bg-gray-3 dark:hover:bg-meta-4"
            key={key}
          >
            <div className="relative h-14 w-14 rounded-full">
              <img src={email.avatar} alt="User" />
              <span
                className="absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full border-2 border-white"
                style={{ backgroundColor: email.color }}
              ></span>
            </div>

            <div className="flex flex-1 items-center justify-between">
              <div>
                <h5 className="font-medium text-black dark:text-white">
                  {email.name}
                </h5>
                <p className="text-sm text-black dark:text-white">
                  <strong>{email.subject}</strong>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {email.preview} . {email.time} min ago
                </p>
              </div>
              {email.unreadCount !== 0 && (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                  <span className="text-sm font-medium text-white">
                    {email.unreadCount}
                  </span>
                </div>
              )}
            </div>
            <button
              className="ml-4 rounded-md bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
              onClick={() => handleRespondClick(email)}
            >
              Respond
            </button>
          </div>
        ))}
      </div>

      {selectedEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-semibold">Respond to {selectedEmail.name}</h3>
            <p className="mb-2 text-sm text-gray-700">
              <strong>Subject:</strong> {selectedEmail.subject}
            </p>
            <textarea
              className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Write your response here..."
            ></textarea>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="rounded-md bg-gray-300 px-4 py-2 text-sm text-black hover:bg-gray-400"
                onClick={closePopup}
              >
                Cancel
              </button>
              <button
                className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
                onClick={() => {
                  alert('Response sent!');
                  closePopup();
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailCard;
