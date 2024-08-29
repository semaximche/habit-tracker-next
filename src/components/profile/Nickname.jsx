'use client';
import React from 'react';
import { UseAuth } from '@/contexts/AuthContext';

// Nickname component displays the user's nickname or "Guest" if not logged in.

const Nickname = () => {
    const { user, isUserLoaded } = UseAuth();

    // Show loading state while checking user data
    if (!isUserLoaded) {
        return <p>Loading...</p>; // or a spinner component
    }

    // If the user is not logged in, display "Guest"
    if (!user) {
        return (
            <div>
                <h1 className="text-3xl">Guest</h1>
            </div>
        );
    }
    
    // If the user is logged in, display their display name or "Guest" if not available
    return (
        <div>
            <h1 className="text-3xl">{user.displayName || 'Guest'}</h1>
        </div>
    );
};

export default Nickname;
