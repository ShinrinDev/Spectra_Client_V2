import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

const Resources: React.FC = () => {
  // Dummy data for articles
  const articles = [
    {
      id: 1,
      title: 'Understanding React',
      content: `React is a JavaScript library for building user interfaces. It allows developers to create reusable components that manage their own state. This article introduces the fundamentals of React, such as JSX, components, props, and state management.`,
    },
    {
      id: 2,
      title: 'Introduction to Tailwind CSS',
      content: `Tailwind CSS is a utility-first CSS framework that enables rapid UI development. It provides utility classes that can be composed to build any design, saving you from writing custom CSS. This guide will walk you through the basics of Tailwind CSS.`,
    },
  ];

  // Dummy data for third-party links
  const links = [
    { id: 1, name: 'Some Link', url: 'https://somelink.com/' },
    { id: 2, name: 'Another Link', url: 'https://anotherlink.com/' },
    { id: 3, name: 'Shinrin', url: 'https://shinrinsolutions.co.za/' },
  ];

  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(url);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  return (
    <>
    <Breadcrumb pageName="Resources" />

<div className="bg-gray-800 min-h-screen py-8">
  <div className="container mx-auto px-4 bg-gray-800">
    <h1 className="text-3xl font-bold text-center mb-6 text-white">Resources</h1>
    
    {/* Articles Section */}
    <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-white">Articles</h2>
      {articles.map((article) => (
        <div key={article.id} className="mb-6">
          <h3 className="text-xl font-medium text-white">{article.title}</h3>
          <p className="text-white mt-2">{article.content}</p>
        </div>
      ))}
    </div>

    {/* Third-Party Links Section */}
    <div className="bg-white rounded-lg shadow-md p-6 bg-gray-800">
      <h2 className="text-2xl font-semibold mb-4 text-white">Third Party Links</h2>
      <ul>
        {links.map((link) => (
          <li key={link.id} className="flex items-center justify-between mb-4">
            <span className="text-white">{link.name}</span>
            <div className="flex items-center space-x-2">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Visit
              </a>
              <button
                onClick={() => handleCopy(link.url)}
                className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition"
              >
                {copiedLink === link.url ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
</div>
    </>
  );
};

export default Resources;
