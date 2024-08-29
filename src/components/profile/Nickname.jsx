'use client';
import React from 'react';
import { UseAuth } from '@/contexts/AuthContext';

const Nickname = () => {
    // Destructure the user and isUserLoaded from the UseAuth context
    const { user, isUserLoaded } = UseAuth();

    // Display a loading message or spinner while the user data is being loaded
    if (!isUserLoaded) {
        return <p>Loading...</p>; // Alternatively, you could use a spinner component here
    }

    // If there is no user (guest), display 'Guest'
    if (!user) {
        return (
            <div>
                <h1 className="text-3xl">Guest</h1>
            </div>
        );
    }

    // If a user is loaded, display their display name or 'Guest' if displayName is not set
    return (
        <div>
            <h1 className="text-3xl">{user.displayName || 'Guest'}</h1>
        </div>
    );
};

export default Nickname;
