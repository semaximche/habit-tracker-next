'use client';
import React, { useState, useEffect } from 'react';
import UserProfile from '@/components/profile/UserProfile';
import CategorySummary from '@/components/profile/CategorySummary';
import EditableShowcase from '@/components/profile/EditableShowcase';
import LevelBadge from '@/components/profile/LevelBadge';
import SideInfo from '@/components/profile/SideInfo';
import EditProfile from '@/components/profile/EditProfile';
import { useUserData } from '@/contexts/UserContext'; // Updated import
import RecentCategories from '@/components/profile/RecentCategories';
import { useDarkMode } from '@/contexts/DarkModeContext';

// Import the gradient color options
import {
    darkGradientColors,
    lightGradientColors,
} from '@/components/profile/gradientColors';

function ProfileMain() {
    // Retrieve dark mode status and user data
    const { darkMode } = useDarkMode();
    const { userData, isUserDataLoaded } = useUserData(); // Updated hook
    const [colors, setColors] = useState(darkGradientColors.user.colors);

    // State to manage editing mode and selected gradients
    const [isEditing, setIsEditing] = useState(false);
    const [selectedLightGradient, setSelectedLightGradient] =
        useState('oceanBreeze');
    const [selectedDarkGradient, setSelectedDarkGradient] = useState('user');

    // Check if the user is a guest
    const isGuest = isUserDataLoaded && userData?.isAnonymous;

    useEffect(() => {
        if (isUserDataLoaded && userData) {
            // Update selected gradients based on user data
            setSelectedLightGradient(
                userData.profile?.lightGradient || 'oceanBreeze'
            );
            setSelectedDarkGradient(userData.profile?.darkGradient || 'user');
        }
    }, [isUserDataLoaded, userData]);

    const handleColorChange = (lightColorKey, darkColorKey) => {
        // Update gradients and colors based on user selection
        setSelectedLightGradient(lightColorKey);
        setSelectedDarkGradient(darkColorKey);
        setColors(
            darkMode
                ? darkGradientColors[darkColorKey].colors
                : lightGradientColors[lightColorKey].colors
        );
    };

    useEffect(() => {
        // Update colors when dark mode or selected gradients change
        setColors(
            darkMode
                ? darkGradientColors[selectedDarkGradient].colors
                : lightGradientColors[selectedLightGradient].colors
        );
    }, [darkMode, selectedLightGradient, selectedDarkGradient]);

    return (
        <div className="relative max-w-screen-xl mx-auto p-5 bg-gray-800">
            {/* Background gradient overlay */}
            <div
                className="absolute inset-0"
                style={{
                    background: `linear-gradient(to right, ${colors.from}, ${colors.via}, ${colors.to})`,
                    opacity: 0.7,
                }}
            ></div>
            <div className="relative flex flex-wrap lg:flex-nowrap lg:space-x-5">
                {/* Main content area */}
                <div className="flex-1 flex flex-col space-y-5">
                    {isEditing && !isGuest ? (
                        <EditProfile
                            onCancel={() => setIsEditing(false)}
                            onSave={handleColorChange}
                        />
                    ) : (
                        <>
                            <UserProfile />
                            <SideInfo className="lg:hidden" />
                            <CategorySummary />
                            <EditableShowcase />
                            <RecentCategories />
                        </>
                    )}
                </div>
                {/* Sidebar area */}
                <div className="w-full lg:w-[360px] flex-shrink-0 mt-5 lg:mt-0">
                    <LevelBadge onEdit={() => setIsEditing(true)} />
                    <div className="mt-5 lg:mt-24">
                        <SideInfo className="hidden lg:block" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileMain;
