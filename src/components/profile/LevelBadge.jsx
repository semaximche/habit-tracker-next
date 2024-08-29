// src/components/profile/LevelBadge.jsx
import React from 'react';
import SteamLevel from 'react-steam-level';
import { UseAuth } from '@/contexts/AuthContext';
import { useUserData } from '@/contexts/UserContext';

const LevelBadge = ({ onEdit }) => {
    // Get the current user and their data
    const { user, isUserLoaded } = UseAuth();
    const { userData } = useUserData();

    // Determine if the user is a guest
    const isGuest = isUserLoaded && user?.isAnonymous;

    // Get the user's current level, default to 1 if not available
    const userLevel = userData.profile?.level || 1;

    return (
        <div className="rounded-lg mb-5">
            {/* Display user's level with a SteamLevel component */}
            <div className="flex items-center justify-between">
                <div className="text-4xl">
                    Level <SteamLevel level={userLevel} size={55} />
                </div>
            </div>
            
            {/* Display a badge image with a description */}
            <div
                className="bg-gray-900 p-2 rounded-lg mt-2"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }} // Background color for the badge section
            >
                <img
                    src="/images/10years.png" // Path to the badge image
                    alt="Badge" // Alternative text for the badge image
                    className="w-16 h-16" // Size of the badge image
                />
                <p className="text-2xl">10 Years of Service</p> {/* Badge description */}
            </div>
            
            {/* Button to edit profile */}
            <button
                className={`text-xl mt-3 bg-black hover:bg-gray-700 hover:shadow-2xl bg-opacity-30 text-white py-2 px-4 rounded duration-150 ${isGuest ? 'cursor-not-allowed opacity-50' : ''}`}
                onClick={!isGuest ? onEdit : undefined} // Enable or disable button based on guest status
                disabled={isGuest} // Disable button if user is a guest
            >
                Edit Profile
            </button>
        </div>
    );
};

export default LevelBadge;
