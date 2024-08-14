import React from 'react';
import ProfilePicture from './ProfilePicture';
import Nickname from './Nickname';
import About from './About';

const UserProfile = () => {
    return (
        <div className="p-5 rounded-lg mb-5 flex flex-col lg:flex-row">
            <ProfilePicture />
            <div className="mt-5 lg:mt-0 lg:ml-8 flex-1">
                <Nickname />
                <About />
            </div>
        </div>
    );
};

export default UserProfile;
