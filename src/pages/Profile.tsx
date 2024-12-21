import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import CoverOne from '../images/cover/cover-01.png';
import CoverTwo from "../images/cover/SpectraBlackTransparent.png";
import userSix from '../images/logo/lead3.jpeg';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    companyName: 'Alpha Logs',
    industry: 'Logistics',
    coreOffer: 'Efficient supply chain solutions',
    ticketSize: '$5,000 - $10,000',
    currentRevenue: '$50,000/month',
    goalRevenue: '$150,000/month',
    clientTechnologies: ['Shopify', 'AWS', 'Oracle'],
    keywords: ['E-commerce', 'Fulfillment', 'Supply Chain'],
    market: 'Logistics and Supply Chain',
    adjacentMarkets: 'Retail, Manufacturing',
    geography: 'North America',
    companyHeadcount: '50-200 employees',
    targetTitles: ['CEO', 'COO', 'Operations Manager'],
    caseStudy:
      'Just recently we helped a logistics company increase their monthly revenue from $12k to $34k with a tailored 3-step funnel in one month.',
    caseStudyLink: 'https://example.com/case-studies',
    painPoints: [
      'Inefficient supply chain processes',
      'High operational costs',
      'Lack of real-time tracking systems',
    ],
    landingPage: 'To be completed',
    bookingPage: 'To be completed',
    thankYouPage: 'To be completed',
    contactDetails: {
      phone: '123-456-7890',
      email: 'info@alphalogs.com',
      address: '123 Alpha Street, Logistics City, NA',
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

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-65">
          <img
            src={CoverTwo}
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center bg-white dark:bg-gray-900 "
          />
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative drop-shadow-2">
              <img
                src={userSix}
                alt="profile"
                className="w-40 h-42 rounded-full"
              />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
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
            <p className="font-medium">
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
              
                <li>
                  <strong>Phone:</strong> {editing.contactDetails.phone ? (
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
                <li>
                  <strong>Email:</strong> {editing.contactDetails.email ? (
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
                <li>
                  <strong>Address:</strong> {editing.contactDetails.address ? (
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
                <li>
                  <strong>Head Count:</strong> {editing.companyHeadcount ? (<input 
                  type='text'
                  value={profileData.companyHeadcount}
                  onChange={(e) => handleInputChange("companyHeadcount", e.target.value)}
                  className='border border-gray-300 rounded px-2'/>
                  ) :(
                    profileData.companyHeadcount)}
                    <button
                    onClick={() => toggleEdit("companyHeadcount")}
                    className='ml-2 text-blue-500 dark:text-red hover:underline'>
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
                <li>
                  <strong>Core Offer:</strong>{' '}
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
                <li>
                  <strong>Ticket Size:</strong>{' '}
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
                <li>
                  <strong>Current Monthly Revenue:</strong>{' '}
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
                <li>
                  <strong>Goal Monthly Revenue (12 months):</strong>{' '}
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
                <li>
                  <strong>Technologies Used:</strong>{' '}
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
                <li>
                  <strong>Keywords:</strong>
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
                <li>
                  <strong>Market/Industry:</strong>{' '}
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
                <li>
                  <strong>Adjacent Markets:</strong>{' '}
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
                <li>
                  <strong>Target Titles:</strong> {editing.targetTitles ? (
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
                <li>
                  <strong>Geography:</strong>{' '}
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
              <h4 className='text-lg font-bold text-black dark:text-white'>Case Study</h4>
              <ul className='mt-4 text-left'>
                  <li>
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
                  <li>
                   <strong>Case Study Link: </strong> {editing.caseStudyLink ? (<input
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
                <li>
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
