'use client';
import React from 'react';
import SteamLevel from 'react-steam-level';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation

const MiniProfile = ({
    name,
    lastOnline,
    badgeNumber,
    onFollow,
    onNavigate,
    isFollowed,
}) => {
    const router = useRouter(); // Initialize the router for navigation

    // Handler for follow/unfollow button click
    const handleClick = (e) => {
        e.stopPropagation(); // Prevent click event from bubbling up
        onFollow(); // Trigger the follow/unfollow action
    };

    return (
        <div
            className="flex items-center justify-between my-2 cursor-pointer"
            onClick={onNavigate} // Handle navigation on profile click
        >
            {/* Display user's avatar */}
            <img
                src={`https://ui-avatars.com/api/?name=${name}`} // Generate avatar from user's name
                alt={name} // Alternative text for accessibility
                className="w-10 h-10 rounded-full" // Style for avatar image
            />
            {/* Display user's name and last online status */}
            <div className="text-xs text-gray-400 ml-2">
                <p>{name}</p> {/* User's name */}
                <p>{lastOnline}</p> {/* Last online status */}
            </div>
            {/* Display user's badge level */}
            <div className="ml-2">
                <SteamLevel level={badgeNumber} size={35} /> {/* Badge level */}
            </div>
            {/* Follow/Unfollow button */}
            <button
                className={`ml-2 ${isFollowed ? 'text-red-500' : 'text-blue-500'}`} // Change color based on follow status
                onClick={handleClick} // Handle follow/unfollow click
            >
                {isFollowed ? 'Unfollow' : 'Follow'} {/* Toggle text based on follow status */}
            </button>
        </div>
    );
};

export default MiniProfile;
