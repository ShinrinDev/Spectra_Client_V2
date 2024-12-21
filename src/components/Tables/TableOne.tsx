import React, { useState } from 'react';
import { BRAND } from '../../types/brand';
import BrandOne from '../../images/brand/brand-01.svg';
import BrandTwo from '../../images/brand/brand-02.svg';
import BrandThree from '../../images/brand/brand-03.svg';
import BrandFour from '../../images/brand/brand-04.svg';
import BrandFive from '../../images/brand/brand-05.svg';

// Data with additional information
const brandData: BRAND[] = [
  {
    logo: BrandOne,
    name: 'Google',
    visitors: 3.5,
    revenues: '5,768',
    sales: 590,
    conversion: 4.8,
    activity: ['Reached 500k new users', 'Launched new ad campaign', 'Closed a major B2B deal'],
    notes: 'Focus on growing B2B partnerships and improving ad metrics.',
    contact: { name: 'John Doe', email: 'john.doe@google.com', phone: '+1 123 456 7890' },
  },
  {
    logo: BrandTwo,
    name: 'Twitter',
    visitors: 2.2,
    revenues: '4,635',
    sales: 467,
    conversion: 4.3,
    activity: ['Acquired new influencer partnerships', 'Implemented algorithm changes', 'Released Spaces feature updates'],
    notes: 'Monitor engagement metrics for the next quarter.',
    contact: { name: 'Jane Smith', email: 'jane.smith@twitter.com', phone: '+1 987 654 3210' },
  },
  {
    logo: BrandThree,
    name: 'Github',
    visitors: 2.1,
    revenues: '4,290',
    sales: 420,
    conversion: 3.7,
    activity: ['Added 50k new repositories', 'Improved CI/CD pipeline integrations', 'Hosted DevOps summit'],
    notes: 'Explore partnerships with educational institutions.',
    contact: { name: 'Emily Davis', email: 'emily.davis@github.com', phone: '+1 456 789 1230' },
  },
  {
    logo: BrandFour,
    name: 'Vimeo',
    visitors: 1.5,
    revenues: '3,580',
    sales: 389,
    conversion: 2.5,
    activity: ['Partnered with 10k new creators', 'Rolled out analytics dashboard', 'Hosted global video awards'],
    notes: 'Focus on expanding enterprise solutions.',
    contact: { name: 'Michael Lee', email: 'michael.lee@vimeo.com', phone: '+1 321 654 9870' },
  },
  {
    logo: BrandFive,
    name: 'Facebook',
    visitors: 3.5,
    revenues: '6,768',
    sales: 390,
    conversion: 4.2,
    activity: ['Launched Reels monetization', 'Expanded into new markets', 'Held annual Meta Connect event'],
    notes: 'Prepare for increased competition in social media advertising.',
    contact: { name: 'Sarah Johnson', email: 'sarah.johnson@facebook.com', phone: '+1 654 321 0987' },
  },
];

// Modal Component
const Modal = ({ brand, onClose }: { brand: BRAND | null; onClose: () => void }) => {
  if (!brand) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-5 w-96 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✖
        </button>
        <div className="flex flex-col items-center">
          <img src={brand.logo} alt={`${brand.name} Logo`} className="mb-4" />
          <h2 className="text-lg font-semibold mb-2">{brand.name}</h2>

          <div className="mb-4">
            <h3 className="text-sm font-medium">Activity History:</h3>
            <ul className="list-disc list-inside text-gray-700">
              {brand.activity.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-medium">Notes:</h3>
            <p className="text-gray-700">{brand.notes}</p>
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-medium">Contact Information:</h3>
            <p className="text-gray-700">
              <strong>Name:</strong> {brand.contact.name}
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> {brand.contact.email}
            </p>
            <p className="text-gray-700">
              <strong>Phone:</strong> {brand.contact.phone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Table Component
const TableOne = () => {
  const [selectedBrand, setSelectedBrand] = useState<BRAND | null>(null);

  const handleShowDetails = (brand: BRAND) => {
    setSelectedBrand(brand);
  };

  const handleCloseModal = () => {
    setSelectedBrand(null);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-3 pt-3 pb-1.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-15">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Leads
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Company
            </h5>
          </div>
        
         
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Actions
            </h5>
          </div>
        </div>

        {brandData.map((brand, key) => (
          <div
            className={`grid grid-cols-4 sm:grid-cols-6 ${
              key === brandData.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <img src={brand.logo} alt="Brand" />
              </div>
              <p className="hidden text-black dark:text-white sm:block">
                {brand.name}
              </p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <button
                className="text-sm bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => handleShowDetails(brand)}
              >
                View More
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal brand={selectedBrand} onClose={handleCloseModal} />
    </div>
  );
};

export default TableOne;
