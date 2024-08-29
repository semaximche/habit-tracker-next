'use client';
import React from 'react';
import SteamLevel from 'react-steam-level';
import { useRouter } from 'next/navigation'; // Changed to next/navigation

const MiniProfile = ({
    name,
    lastOnline,
    badgeNumber,
    onFollow,
    onNavigate,
    isFollowed,
}) => {
    const router = useRouter();

    const handleClick = (e) => {
        e.stopPropagation();
        onFollow();
    };

    return (
        <div
            className="flex items-center justify-between my-2 cursor-pointer"
            onClick={onNavigate}
        >
            <img
                src={`https://ui-avatars.com/api/?name=${name}`}
                alt={name}
                className="w-10 h-10 rounded-full"
            />
            <div className="text-xs text-gray-400 ml-2">
                <p>{name}</p>
                <p>{lastOnline}</p>
            </div>
            <div className="ml-2">
                <SteamLevel level={badgeNumber} size={35} />
            </div>
            <button
                className={`ml-2 ${isFollowed ? 'text-red-500' : 'text-blue-500'}`}
                onClick={handleClick}
            >
                {isFollowed ? 'Unfollow' : 'Follow'}
            </button>
        </div>
    );
};

export default MiniProfile;
