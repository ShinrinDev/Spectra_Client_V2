import React, { useState, useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import CoverTwo from "../images/cover/SpectraBlackTransparent.png";
import userSix from '../images/logo/lead3.jpeg';
import { useAuth } from '../context/AuthContext/AuthContext';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import OnboardingAnswers from '../components/Answers';

interface UserData {
  name: string;
  email: string;
  profileImg?: string;
}

const Profile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const firestore = getFirestore();
        const storage = getStorage();
        const userDocRef = doc(firestore, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const data = userDocSnap.data() as UserData;
          setUserData(data);

          if (data.profileImg) {
            const imageRef = ref(storage, data.profileImg);
            const imageUrl = await getDownloadURL(imageRef);
            setProfileImage(imageUrl);
          }
        }
      }
    };
    fetchUserData();
  }, [user]);

  const handleProfileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const storage = getStorage();
      const imageRef = ref(storage, `profileImages/${user?.uid}`);

      await uploadBytes(imageRef, file);
      const imageUrl = await getDownloadURL(imageRef);

      setProfileImage(imageUrl);

      if (user) {
        const firestore = getFirestore();
        const userDocRef = doc(firestore, 'users', user.uid);
        await updateDoc(userDocRef, { profileImg: `profileImages/${user.uid}` });
      }
    }
  };

  return (
    <>
      <Breadcrumb pageName="Profile" />
      <div className="overflow-hidden rounded-sm border border-stroke bg-white dark:bg-black shadow-default dark:border-strokedark dark:bg-customblack">
        <div className="relative z-20 h-35 md:h-65">
          <img
            src={CoverTwo}
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center bg-white dark:bg-customblack"
          />
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-20 mx-auto -mt-20 h-20 w-full max-w-10 rounded-full bg-white/20 p-2 backdrop-blur sm:h-39 sm:max-w-44 sm:p-3">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="w-40 h-40 rounded-full" />
            ) : (
              <div className="flex justify-center items-center text-white dark:text-black text-9xl font-bold bg-black dark:bg-white border border-gray-300 rounded-full w-43 h-43 leading-none">
                {userData?.name[0].toUpperCase()}
              </div>
            )}
          </div>
          <input type="file" accept="image/*" onChange={handleProfileImageChange} className="mt-4" />
          <h3 className="mt-4 text-2xl font-semibold text-black dark:text-[#fad949]">{userData?.name}</h3>
          <p className="font-medium text-[#fad949]">{userData?.email}</p>
        </div>
            <div>
                    <OnboardingAnswers/>
            </div>

           {/** {/* Core Information Section *}
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

            {/* Lead Scraping Information Section }
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
            </div> */}
          </div>
       
      
    </>
  );
};

export default Profile;
