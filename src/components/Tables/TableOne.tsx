import React, { useState } from 'react';
import { BRAND } from '../../types/brand';

const defaultImage = 'path/to/default-image.svg';

const brandData: BRAND[] = [
  { name: 'Noodle', visitors: 3.5, revenues: '5,768', sales: 590, conversion: 4.8, activity: ['Reached 500k new users'], notes: 'Focus on growing B2B partnerships.', contact: { name: 'John Doe', email: 'john.doe@noodle.com', phone: '+1 123 456 7890' } },
  { name: 'Keeper', visitors: 2.2, revenues: '4,635', sales: 467, conversion: 4.3, activity: ['Acquired new influencer partnerships'], notes: 'Monitor engagement metrics.', contact: { name: 'Jane Smith', email: 'jane.smith@keeper.com', phone: '+1 987 654 3210' } },
  { name: 'Shinrin AI Solutions', visitors: 2.1, revenues: '4,290', sales: 420, conversion: 3.7, activity: ['Added 50k new repositories'], notes: 'Explore educational partnerships.', contact: { name: 'Thavir Raju', email: 'raju@shinrinai.com', phone: '+1 456 789 1230' } },
  { name: 'Emo', visitors: 1.5, revenues: '3,580', sales: 389, conversion: 2.5, activity: ['Partnered with new creators'], notes: 'Expand enterprise solutions.', contact: { name: 'Michael Lee', email: 'michael.lee@emo.com', phone: '+1 321 654 9870' } },
  { name: 'Savebook', visitors: 3.5, revenues: '6,768', sales: 390, conversion: 4.2, activity: ['Launched Reels monetization'], notes: 'Prepare for competition.', contact: { name: 'Sarah Johnson', email: 'sarah.johnson@savebook.com', phone: '+1 654 321 0987' } },
];

const Modal = ({ brand, onClose }: { brand: BRAND | null; onClose: () => void }) => {
  if (!brand) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center">
      <div className="bg-white dark:bg-black rounded-lg p-5 w-96 relative">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800  dark:text-[#fad949] dark:hover:text-[#fab949]" onClick={onClose}>
          ✖
        </button>
        <div className="flex flex-col items-center">
          <div className="mb-4 flex justify-center items-center text-[#fad949] bg-black dark:text-black text-4xl font-bold dark:bg-white border rounded-full w-16 h-16">
            {brand.name[0].toUpperCase()}
          </div>
          <h2 className="text-lg font-semibold mb-2 dark:text-white text-black">{brand.name}</h2>
          <div className="mb-4">
            <h3 className="text-sm font-medium dark:text-white text-black">Activity History:</h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-[#fad949]">
              {brand.activity.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-sm font-medium">Notes:</h3>
            <p className="text-gray-700 dark:text-[#fad949]">{brand.notes}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-sm font-medium">Contact Information:</h3>
            <p className="text-gray-700 dark:text-[#fad949]" ><strong className='text-black dark:text-white'>Name:</strong> {brand.contact.name}</p>
            <p className="text-gray-700 dark:text-[#fad949]" ><strong className='text-black dark:text-white'>Email:</strong> {brand.contact.email}</p>
            <p className="text-gray-700 dark:text-[#fad949]"><strong className='text-black dark:text-white'>Phone:</strong> {brand.contact.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TableOne = () => {
  const [selectedBrand, setSelectedBrand] = useState<BRAND | null>(null);

  const handleShowDetails = (brand: BRAND) => {
    setSelectedBrand(brand);
  };

  const handleCloseModal = () => {
    setSelectedBrand(null);
  };

  const sortedBrandData = [...brandData].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="rounded-sm border border-stroke bg-white px-3 pt-3 pb-1.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-15">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">Leads</h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-5 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Company</h5>
          </div>
          <div className="hidden p-2.5 sm:block xl:p-5 col-span-4">
            <h5 className="text-sm font-medium uppercase xsm:text-base text-right">Actions</h5>
          </div>
        </div>

        {sortedBrandData.map((brand, key) => (
          <div
            className={`grid grid-cols-5 sm:grid-cols-6 items-center ${
              key === sortedBrandData.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5 col-span-4">
              <div className="flex-shrink-0">
                {/^[a-zA-Z]/.test(brand.name) ? (
                  <div className="flex justify-center items-center dark:text-black text-[#fad949] text-4xl font-bold dark:bg-white bg-black border rounded-full w-16 h-16">
                    {brand.name[0].toUpperCase()}
                  </div>
                ) : (
                  <img src={defaultImage} alt="Default" />
                )}
              </div>
              <p className="text-black dark:text-white">{brand.name}</p>
            </div>

            <div className="flex justify-end p-2.5 xl:p-5">
              <button
                className="text-sm bg-[#fad949] text-white px-4 py-2 rounded"
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
