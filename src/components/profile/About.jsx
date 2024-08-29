import React from 'react';
import { useUserData } from '@/contexts/UserContext';
import Loading from '../loading';

const About = () => {
    const { userData, isUserDataLoaded } = useUserData();
    const location = userData.profile?.location || 'Unknown Location';
    const aboutText =
        userData.profile?.about || 'Login to write about yourself';

    if (!isUserDataLoaded) {
        return (
            <div>
                <p>Loading...</p>
                <Loading></Loading>
            </div>
        ); // or a spinner component
    }
    return (
        <div className="mt-5">
            <div className="flex mt-3">
                <img
                    src="/images/placeholder.png"
                    alt={location}
                    className="w-5 h-5"
                />
                <p className="text-base text-gray-300">{location}</p>
            </div>
            <p className="mt-5 text-gray-300">{aboutText}</p>
        </div>
    );
};

export default About;
