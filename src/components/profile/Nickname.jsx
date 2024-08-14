'use client';
import React from 'react';
import { UseAuth } from '@/contexts/AuthContext';

const Nickname = () => {
    const { user, isUserLoaded } = UseAuth();

    if (!isUserLoaded) {
        return <p>Loading...</p>; // or a spinner component
    }

    if (!user) {
        return (
            <div>
                <h1 className="text-3xl">Guest</h1>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl">{user.displayName || 'Guest'}</h1>
        </div>
    );
};

export default Nickname;
