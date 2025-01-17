import React from 'react';

const Unauthorized: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-customblack dark:bg-customblack">
      <div className="rounded-sm bg-white shadow-default dark:bg-customblack p-6 sm:p-12 xl:p-20 w-full max-w-lg text-center">
        <h2 className="mb-6 text-2xl font-bold text-customblack dark:text-white sm:text-title-xl2">
          Thank You for Signing Up!
        </h2>
        <p className="mb-6 text-lg text-customblack dark:text-white">
          We are currently setting you up. We will contact you as soon as the{' '}
          <strong className="text-gold">14-day onboarding period</strong> is over, and your profile is ready to be explored. Thank you for your patience.
        </p>
        <p className="text-customblack dark:text-white">
          Please do not forget to close the tab{' '}
          <span role="img" aria-label="smile">
            😊
          </span>
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;
