import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import CoverOne from '../images/cover/cover-01.png';
import CoverTwo from "../images/cover/SpectraBlackTransparent.png";
import userSix from '../images/logo/lead3.jpeg';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    companyName: 'Shinrin AI Solutions',
    industry: 'AI Automation',
    coreOffer: 'End-to-end AI-powered automation solutions for businesses',
    ticketSize: '$20,000 - $100,000',
    currentRevenue: '$80,000/month',
    goalRevenue: '$250,000/month',
    clientTechnologies: ['TensorFlow', 'Azure AI', 'AWS SageMaker', 'OpenAI API'],
    keywords: ['AI Automation', 'Predictive Analytics', 'Intelligent Workflow', 'RPA (Robotic Process Automation)'],
    market: 'AI Automation, Workflow Optimization, Predictive Analytics',
    adjacentMarkets: 'Healthcare, Finance, Customer Support, Marketing Technology',
    geography: 'Global with a focus on North America, Europe, and Asia-Pacific',
    companyHeadcount: '6-12 employees',
    targetTitles: ['CTO', 'Head of Automation', 'Product Manager', 'AI Engineer'],
    caseStudy:
      'Recently, we helped a fintech company reduce customer churn by 40% and improve decision-making accuracy with an AI-powered predictive analytics platform tailored to their needs.',
    caseStudyLink: 'https://shinrinai.com/case-studies',
    painPoints: [
      'Time-intensive manual workflows',
      'Limited adoption of AI in key operational areas',
      'Inefficient decision-making due to fragmented data systems',
      'High costs and delays in implementing automation solutions',
    ],
    landingPage: 'https://shinrinsolutions.co.za/',
    bookingPage: 'https://shinrinsolutions.co.za/contact-us/',
    thankYouPage: 'https://shinrinsolutions.co.za/meet-the-team/',
    contactDetails: {
      phone: '+1-800-555-6789',
      email: 'shaun@shinrinai.co.za',
      address: '6969 Shinrin Cave, My basement, Moms house',
    },
    
  });

  const [editing, setEditing] = useState({
    companyName: false,
    industry: false,
    coreOffer: false,
    ticketSize: false,
    currentRevenue: false,
    goalRevenue: false,
    clientTechnologies: false,
    keywords: false,
    market: false,
    adjacentMarkets: false,
    geography: false,
    companyHeadcount: false,
    targetTitles: false,
    caseStudy: false,
    caseStudyLink: false,
    painPoints: false,
    landingPage: false,
    bookingPage: false,
    thankYouPage: false,
    contactDetails: false,
  });

  const handleInputChange = (field, value) => {
    setProfileData({
      ...profileData,
      [field]: value,
    });
  };

  const handleNestedInputChange = (nestedField, key, value) => {
    setProfileData({
      ...profileData,
      [nestedField]: {
        ...profileData[nestedField],
        [key]: value,
      },
    });
  };

  const toggleEdit = (field) => {
    setEditing({
      ...editing,
      [field]: !editing[field],
    });
  };

  return (
    <>
      <Breadcrumb pageName="Profile" />

      <div className="overflow-hidden rounded-sm border border-stroke bg-white dark:bg-black shadow-default dark:border-strokedark dark:bg-customblack">
        <div className="relative z-20 h-35 md:h-65">
          <img
            src={CoverTwo}
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center bg-white dark:bg-customblack "
          />
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
        <div className="relative z-20 mx-auto -mt-20 h-20 w-full max-w-10 rounded-full bg-white/20 p-2 backdrop-blur sm:h-39 sm:max-w-44 sm:p-3">
  <div className="relative drop-shadow-2">
    {/^[a-zA-Z]/.test(profileData.companyName) ? (
      <div className="flex justify-center items-center text-white dark:text-black text-9xl font-bold bg-black dark:bg-white border border-gray-300 rounded-full w-43 h-43 leading-none">
        {profileData.companyName[0].toUpperCase()}
      </div>
    ) : (
      <img src={userSix} alt="Default" className="w-40 h-35 rounded-full" />
    )}
  </div>
</div>

          <div className="mt-4 dark:bg-black bg-white">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-[#fad949]">
              {editing.companyName ? (
                <input
                  type="text"
                  value={profileData.companyName}
                  onChange={(e) =>
                    handleInputChange('companyName', e.target.value)
                  }
                  className="text-center border border-gray-300 rounded px-2"
                />
              ) : (
                profileData.companyName
              )}
              <button
                onClick={() => toggleEdit('companyName')}
                className="ml-2 text-blue-500 hover:underline"
              >
                {editing.companyName ? 'Save' : 'Edit'}
              </button>
            </h3>
            <p className="font-medium text-[#fad949]">
              {editing.industry ? (
                <input
                  type="text"
                  value={profileData.industry}
                  onChange={(e) =>
                    handleInputChange('industry', e.target.value)
                  }
                  className="text-center border border-gray-300 rounded px-2"
                />
              ) : (
                profileData.industry
              )}
              <button
                onClick={() => toggleEdit('industry')}
                className="ml-2 text-blue-500 hover:underline"
              >
                {editing.industry ? 'Save' : 'Edit'}
              </button>
            </p>
            <div>
              <h4 className='text-lg font-bold text-black dark:text-white'>Company Details</h4>
              
              <ul className='mt-4 text-left'>
              
                <li className='dark:text-[#fad949]'>
                  <strong className='dark:text-white text-black'>Phone:</strong> {editing.contactDetails.phone ? (
                    <input
                      type="text"
                      value={profileData.contactDetails.phone}
                      onChange={(e) => handleNestedInputChange('contactDetails', 'phone', e.target.value)}
                      className="border border-gray-300 rounded px-2"
                    />
                  ) : (
                    profileData.contactDetails.phone
                  )}
                  <button
                    onClick={() => toggleEdit('contactDetails', 'phone')}
                    className="ml-2 text-blue-500 hover:underline"
                  >
                    {editing.contactDetails.phone ? 'Save' : 'Edit'}
                  </button>
                </li>
                <li className='dark:text-[#fad949]'>
                  <strong className='dark:text-white text-black'>Email:</strong> {editing.contactDetails.email ? (
                    <input
                      type="email"
                      value={profileData.contactDetails.email}
                      onChange={(e) => handleNestedInputChange('contactDetails', 'email', e.target.value)}
                      className="border border-gray-300 rounded px-2"
                    />
                  ) : (
                    profileData.contactDetails.email
                  )}
                  <button
                    onClick={() => toggleEdit('contactDetails', 'email')}
                    className="ml-2 text-blue-500 hover:underline"
                  >
                    {editing.contactDetails.email ? 'Save' : 'Edit'}
                  </button>
                </li>
                <li className='dark:text-[#fad949]'>
                  <strong className='dark:text-white text-black'>Address:</strong> {editing.contactDetails.address ? (
                    <input
                      type="text"
                      value={profileData.contactDetails.address}
                      onChange={(e) => handleNestedInputChange('contactDetails', 'address', e.target.value)}
                      className="border border-gray-300 rounded px-2"
                    />
                  ) : (
                    profileData.contactDetails.address
                  )}
                  <button
                    onClick={() => toggleEdit('contactDetails', 'address')}
                    className="ml-2 text-blue-500 hover:underline"
                  >
                    {editing.contactDetails.address ? 'Save' : 'Edit'}
                  </button>
                </li>
                <li className='dark:text-[#fad949]'>
                  <strong className='dark:text-white text-black'>Head Count:</strong> {editing.companyHeadcount ? (<input 
                  type='text'
                  value={profileData.companyHeadcount}
                  onChange={(e) => handleInputChange("companyHeadcount", e.target.value)}
                  className='border border-gray-300 rounded px-2'/>
                  ) :(
                    profileData.companyHeadcount)}
                    <button
                    onClick={() => toggleEdit("companyHeadcount")}
                    className='ml-2 text-blue-500 dark:text-blue hover:underline'>
                      {editing.companyHeadcount ? "Save" : "Edit"}
                    </button>

                </li>
              </ul>
            </div>
            {/* Core Information Section */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-black dark:text-white">
                Core Information
              </h4>
              <ul className="mt-4 text-left">
                <li className='dark:text-[#fad949]'>
                  <strong className='dark:text-white text-black'>Core Offer:</strong>{' '}
                  {editing.coreOffer ? (
                    <input
                      type="text"
                      value={profileData.coreOffer}
                      onChange={(e) =>
                        handleInputChange('coreOffer', e.target.value)
                      }
                      className="border border-gray-300 rounded px-2"
                    />
                  ) : (
                    profileData.coreOffer
                  )}
                  <button
                    onClick={() => toggleEdit('coreOffer')}
                    className="ml-2 text-blue-500 hover:underline"
                  >
                    {editing.coreOffer ? 'Save' : 'Edit'}
                  </button>
                </li>
                <li className='dark:text-[#fad949]'>
                  <strong className='dark:text-white text-black'>Ticket Size:</strong>{' '}
                  {editing.ticketSize ? (
                    <input
                      type="text"
                      value={profileData.ticketSize}
                      onChange={(e) =>
                        handleInputChange('ticketSize', e.target.value)
                      }
                      className="border border-gray-300 rounded px-2"
                    />
                  ) : (
                    profileData.ticketSize
                  )}
                  <button
                    onClick={() => toggleEdit('ticketSize')}
                    className="ml-2 text-blue-500 hover:underline"
                  >
                    {editing.ticketSize ? 'Save' : 'Edit'}
                  </button>
                </li>
                <li className='dark:text-[#fad949]'>
                  <strong className='dark:text-white text-black'>Current Monthly Revenue:</strong>{' '}
                  {editing.currentRevenue ? (
                    <input
                      type="text"
                      value={profileData.currentRevenue}
                      onChange={(e) =>
                        handleInputChange('currentRevenue', e.target.value)
                      }
                      className="border border-gray-300 rounded px-2"
                    />
                  ) : (
                    profileData.currentRevenue
                  )}
                  <button
                    onClick={() => toggleEdit('currentRevenue')}
                    className="ml-2 text-blue-500 hover:underline"
                  >
                    {editing.currentRevenue ? 'Save' : 'Edit'}
                  </button>
                </li>
                <li className='dark:text-[#fad949]'>
                  <strong className='dark:text-white text-black'>Goal Monthly Revenue (12 months):</strong>{' '}
                  {editing.goalRevenue ? (
                    <input
                      type="text"
                      value={profileData.goalRevenue}
                      onChange={(e) =>
                        handleInputChange('goalRevenue', e.target.value)
                      }
                      className="border border-gray-300 rounded px-2"
                    />
                  ) : (
                    profileData.goalRevenue
                  )}
                  <button
                    onClick={() => toggleEdit('goalRevenue')}
                    className="ml-2 text-blue-500 hover:underline"
                  >
                    {editing.goalRevenue ? 'Save' : 'Edit'}
                  </button>
                </li>
              </ul>
            </div>

            {/* Lead Scraping Information Section */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-black dark:text-white">
                Lead Scraping Information
              </h4>
              <ul className="mt-4 text-left">
                <li className='dark:text-[#fad949]'>
                  <strong className='dark:text-white text-black'>Technologies Used:</strong>{' '}
                  {editing.clientTechnologies ? (
                    <input
                      type="text"
                      value={profileData.clientTechnologies.join(', ')}
                      onChange={(e) =>
                        handleInputChange(
                          'clientTechnologies',
                          e.target.value.split(', '),
                        )
                      }
                      className="border border-gray-300 rounded px-2"
                    />
                  ) : (
                    profileData.clientTechnologies.join(', ')
                  )}
                  <button
                    onClick={() => toggleEdit('clientTechnologies')}
                    className="ml-2 text-blue-500 hover:underline"
                  >
                    {editing.clientTechnologies ? 'Save' : 'Edit'}
                  </button>
                </li>
                <li className='dark:text-[#fad949]'>
                  <strong className='dark:text-white text-black'>Keywords:</strong>
                  {editing.keywords ? (
                    <input
                      type="text"
                      value={profileData.keywords.join(', ')}
                      onChange={(e) =>
                        handleInputChange(
                          'keywords',
                          e.target.value.split(', '),
                        )
                      }
                      className="border border-gray-300 rounded px-2"
                    />
                  ) : (
                    profileData.keywords.join(', ')
                  )}
                  <button
                    onClick={() => toggleEdit('keywords')}
                    className="ml-2 text-blue-500 hover:underline"
                  >
                    {editing.keywords ? 'Save' : 'Edit'}
                  </button>
                </li>
                <li className='dark:text-[#fad949]'>
                  <strong className='dark:text-white text-black'>Market/Industry:</strong>{' '}
                  {editing.market ? (
                    <input
                      type="text"
                      value={profileData.market}
                      onChange={(e) =>
                        handleInputChange('market', e.target.value)
                      }
                      className="border border-gray-300 rounded px-2"
                    />
                  ) : (
                    profileData.market
                  )}
                  <button
                    onClick={() => toggleEdit('market')}
                    className="ml-2 text-blue-500 hover:underline"
                  >
                    {editing.market ? 'Save' : 'Edit'}
                  </button>
                </li>
                <li className='dark:text-[#fad949]'>
                  <strong className='dark:text-white text-black'>Adjacent Markets:</strong>{' '}
                  {editing.adjacentMarkets ? (
                    <input
                      type="text"
                      value={profileData.adjacentMarkets}
                      onChange={(e) =>
                        handleInputChange('adjacentMarkets', e.target.value)
                      }
                      className="border border-gray-300 rounded px-2"
                    />
                  ) : (
                    profileData.adjacentMarkets
                  )}
                  <button
                    onClick={() => toggleEdit('adjacentMarkets')}
                    className="ml-2 text-blue-500 hover:underline"
                  >
                    {editing.adjacentMarkets ? 'Save' : 'Edit'}
                  </button>
                </li>
                <li className='dark:text-[#fad949]'>
                  <strong className='dark:text-white text-black'>Target Titles:</strong> {editing.targetTitles ? (
                    <input
                    value={profileData.targetTitles.join(", ")}
                    className='border border-gray-500 rounded px-2'
                    onChange={(e) => handleInputChange('targetTitles', e.target.value.split(", "))}/>

                  ) : ( profileData.targetTitles.join(", "))}
                  <button
                  className='ml-2 text-blue-500 hover:underline'
                  onClick={() => toggleEdit("targetTitles")}>
                    {editing.targetTitles ? "Save" :"Edit"}
                  </button>

                </li>
                <li className='dark:text-[#fad949]'>
                  <strong className='dark:text-white text-black'>Geography:</strong>{' '}
                  {editing.geography ? (
                    <input
                      type="text"
                      value={profileData.geography}
                      onChange={(e) =>
                        handleInputChange('geography', e.target.value)
                      }
                      className="border border-gray-300 rounded px-2"
                    />
                  ) : (
                    profileData.geography
                  )}
                  <button
                    className="ml-2 text-blue-500 hover:underline"
                    onClick={() => toggleEdit('geography')}
                  >
                    {editing.geography ? 'Save' : 'Edit'}
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='text-lg font-bold text-black dark:text-white'>Case Studies</h4>
              <ul className='mt-4 text-left'>
                  <li className='dark:text-[#fad949]'>
                    {editing.caseStudy ? ( 
                    <textarea
                    className=' border border-gray-300 px-25'
                    value={profileData.caseStudy}
                    onChange={(e) => handleInputChange("caseStudy", e.target.value)}>

                    </textarea>) : (profileData.caseStudy)}
                    <button
                    className='ml-2 text-blue-500 hover:underline'
                    onClick={() => toggleEdit("caseStudy")}>
                      {editing.caseStudy ? "Save" : "Edit"}
                    </button>
                  </li>
                  <li className='dark:text-[#fad949]'>
                   <strong className='dark:text-white text-black'>Case Study Link: </strong> {editing.caseStudyLink ? (<input
                    onChange={(e) => handleInputChange("caseStudyLink", e.target.value)}
                    value={profileData.caseStudyLink}
                    className='border border-gray-300 px-10'/>) : (profileData.caseStudyLink)}
                    <button
                    className='ml-2 text-blue-500 hover:underline'
                    onClick={() => toggleEdit("caseStudyLink")}>
                      {editing.caseStudyLink ? "Save" : "Edit"}
                    </button>
                  </li>
              </ul>
            </div>
           
            <div>
              <h4 className='text-lg font-bold text-black dark:text-white'>Pain Points</h4>
              <ul className='mt-4 text-left'>
                <li className='dark:text-[#fad949]'>
                  {editing.painPoints ? (<input
                  className='border border-gray-300 px-15'
                  value={profileData.painPoints.join(", ")}
                  onChange={(e) => handleInputChange("painPoints", e.target.value.split(', '))}
                  />):(profileData.painPoints.join(', '))}
                  <button
                  className='ml-2 text-blue-500'
                  onClick={()=> toggleEdit("painPoints")}>
                    
                    {editing.painPoints? "Save":"Edit"}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
