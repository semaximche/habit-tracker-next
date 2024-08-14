import React from 'react';
import { useUserData } from '@/contexts/UserContext';
import Loading from '../loading';

const ProfilePicture = () => {
    const { userData, isUserDataLoaded } = useUserData();

    // If data is still loading, show the Loading component
    if (!isUserDataLoaded) {
        return (
            <div className="w-32 h-32 lg:w-64 lg:h-64 border-4 border-gray-800">
                <Loading />
            </div>
        );
    }

    // Once data is loaded, show the profile picture or default image
    const profilePicture =
        userData.profile?.avatarURL || '/images/anonymous.png';

    return (
        <img
            src={profilePicture}
            alt="Profile"
            className="w-32 h-32 lg:w-64 lg:h-64 border-4 border-gray-800"
        />
    );
};

export default ProfilePicture;
