import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../../firebase';
import {
  default as YourLogo,
  default as YourLogoDark,
} from '../../images/logo/slogo.png'; // Light mode logo

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address:'',
    contact:'',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(userDetails);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        userDetails.email,
        userDetails.password
      );

      await setDoc(doc(db, 'users', user.uid), {
        name: userDetails.name,
        email: userDetails.email,
        createdAt: new Date(),
        uid: user.uid,
        isVerified: false,
        borded: false,
        done:false,
        phone: userDetails.phone,
        address: userDetails.address,
        contact:userDetails.contact,
      });

      console.log('User created and added to Firestore');
      navigate('/onboarding');
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Error signing up. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails({
      ...userDetails,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-customblack dark:bg-boxdark">
      <div className="rounded-sm bg-customblack shadow-default flex">
        {/* Left Half */}
        <div
          className="hidden w-full xl:flex xl:w-1/2 text-white items-center justify-center"
          style={{
            backgroundColor: '#000000',
            maxHeight: '100vh',
            overflowY: 'auto',
          }}
        >
          <div className="py-17.5 px-26 text-center">
            <Link className="inline-block" to="/auth/signin">
              <img
                className="hidden dark:block"
                src={YourLogoDark}
                alt="Your Logo"
                style={{ borderRadius: '20px' }}
              />
              <img
                className="dark:hidden"
                src={YourLogo}
                alt="Your Logo"
                style={{ borderRadius: '10px' }}
              />
            </Link>
          </div>
        </div>

        {/* Right Half */}
        <div className="w-full border border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <span className="mb-1.5 block font-medium text-gold">
              Get Leads
            </span>
            <h2 className="mb-2 text-2xl font-bold text-white dark:text-white sm:text-title-xl2">
              Create Your Account
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="mb-2.5 block font-medium text-gold dark:text-white">
                  Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your full name"
                    onChange={handleChange}
                    className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 text-white outline-none focus:border-gold focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-2">
                <label className="mb-2.5 block font-medium text-gold dark:text-white">
                  Contact Person
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="contact"
                    placeholder="Enter your full name"
                    onChange={handleChange}
                    className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 text-white outline-none focus:border-gold focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-2">
                <label className="mb-2.5 block font-medium text-gold dark:text-white">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 text-white outline-none focus:border-gold focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-2">
                <label className="mb-2.5 block font-medium text-gold dark:text-white">
                  Phone
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="phone"
                    onChange={handleChange}
                    placeholder="(+101) 234 5678"
                    className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 text-white outline-none focus:border-gold focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-2">
                <label className="mb-2.5 block font-medium text-gold dark:text-white">
                  Address
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="address"
                    onChange={handleChange}
                    placeholder="Enter your address"
                    className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 text-white outline-none focus:border-gold focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-2">
                <label className="mb-2.5 block font-medium text-gold dark:text-white">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    onChange={handleChange}
                    id="password"
                    placeholder="Enter your password"
                    className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 text-white outline-none focus:border-gold focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-2">
                <input
                  type="submit"
                  value="Create Account"
                  className="w-full cursor-pointer rounded-lg border border-primary bg-gold p-2 text-white transition hover:bg-opacity-90"
                />
              </div>
              <div className="mt-2 text-center">
                <p>
                  Already have an account?{' '}
                  <Link to="/auth/signin" className="text-gold">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
