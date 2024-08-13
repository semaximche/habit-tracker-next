"use client"; // Ensure it's a client component
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const db = getFirestore();

const OtherUserProfile = () => {
  const searchParams = useSearchParams();
  const username = searchParams.get('username');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const profilePicture = userData?.profile?.avatarURL || "/images/anonymous.png";

  const mistySkyGradientColors = {
    from: '#3a6186', // Dark blue
    via: '#89253e', // Reddish purple
    to: '#3a6186'   // Dark blue
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (username) {
        try {
          const usersRef = collection(db, 'users');
          const q = query(usersRef, where('uid', '==', username));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            setUserData(userDoc.data());
          } else {
            console.error('User not found');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>User not found.</div>;
  }

  return (
    <div className="relative max-w-screen-xl mx-auto p-5 bg-gray-800">
      <div 
        className="absolute inset-0"
        style={{ 
          background: `linear-gradient(to right, ${mistySkyGradientColors.from}, ${mistySkyGradientColors.via}, ${mistySkyGradientColors.to})`, 
          opacity: 0.7 
        }}
      ></div>
      <div className="relative flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-8 p-8 rounded-lg shadow-lg text-white">
        <div className="flex-shrink-0">
          <img 
            src={profilePicture} 
            alt="Profile" 
            className="w-48 h-48 rounded-full object-cover border-4 border-gray-700 shadow-lg"
          />
        </div>
        <div className="flex-1 flex flex-col space-y-3">
          <h1 className="text-4xl font-bold">{userData.username}&apos;s Profile</h1>
          <p className="text-xl"><span className="font-semibold">Location:</span> {userData.location}</p>
          <p className="text-xl"><span className="font-semibold">Level:</span> {userData.level}</p>
          <p className="text-xl"><span className="font-semibold">XP:</span> {userData.xp}</p>
          <p className="text-xl"><span className="font-semibold">About:</span> {userData.about}</p>
        </div>
      </div>
    </div>
  );
};

export default OtherUserProfile;
