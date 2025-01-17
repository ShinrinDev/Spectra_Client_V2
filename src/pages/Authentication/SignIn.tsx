import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase'; // Ensure correct path to your firebase config
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase'; // Ensure correct path to Firestore configuration

import YourLogo from '../../images/logo/SpectraWhiteTrans.png'; // Light mode logo
import YourLogoDark from '../../images/logo/SpectraWhiteTrans.png'; // Dark mode logo

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Authenticate the user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check the "borded" field in Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();

        if (userData.borded === true) {
          console.log('User is onboarded:', userData);
          navigate('/', { state: { user: userData } }); // Pass user data to the home page
        } else {
          console.log('User is not onboarded:', userData);
          navigate('/unauthorized');
        }
      } else {
        setError('User data not found in Firestore.');
        console.error('No such document!');
      }
    } catch (err: any) {
      console.error('Login error:', err.message);
      setError('Failed to login. Please check your credentials.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-customblack dark:bg-customblack">
      <div className="rounded-sm bg-white shadow-default dark:bg-customblack flex">
        {/* Left Half */}
        <div className="hidden w-full xl:flex xl:w-1/2 bg-customblack text-white items-center justify-center">
          <div className="py-17.5 px-26 text-center">
            <Link className="mb-5.5 inline-block" to="/auth/signin">
              <img src={YourLogoDark} alt="Your Logo" />
            </Link>
          </div>
        </div>

        {/* Right Half */}
        <div className="w-full bg-customblack border border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <span className="mb-1.5 block text-gold font-medium">Get Leads Today</span>
            <h2 className="mb-9 text-2xl font-bold text-white dark:text-white sm:text-title-xl2">
              Login
            </h2>

            <form onSubmit={handleSubmit}>
              {error && <p className="mb-4 text-red-500">{error}</p>}
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-gold dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-white outline-none focus:border-gold dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-gold dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="6+ Characters, 1 Capital letter"
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-white outline-none focus:border-gold dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>

              <div className="mb-5">
                <button
                  type="submit"
                  className="w-full rounded-lg border border-primary bg-gold p-4 text-white hover:bg-opacity-90"
                >
                  Login
                </button>
              </div>

              <div className="mt-6 text-center">
                <p>
                  Don’t have an account?{' '}
                  <Link to="/auth/signup" className="text-gold">
                    Sign Up
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

export default SignIn;
