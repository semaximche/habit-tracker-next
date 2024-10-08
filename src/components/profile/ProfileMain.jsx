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

// The ProfileMain component manages user profile display and editing features.
// It includes user profile details, category summaries, editable showcases, 
// and level badges. It supports both light and dark themes using gradient colors.
// The component handles the state of whether the user is editing their profile 
// and updates gradient colors based on user preferences. It also checks if 
// the user is a guest and adjusts functionalities accordingly.

// Import the gradient color options
import {
    darkGradientColors,
    lightGradientColors,
} from '@/components/profile/gradientColors';

function ProfileMain() {
    const { darkMode } = useDarkMode();
    const { userData, isUserDataLoaded } = useUserData(); // Updated hook
    const [colors, setColors] = useState(darkGradientColors.user.colors);

    const [isEditing, setIsEditing] = useState(false);
    const [selectedLightGradient, setSelectedLightGradient] =
        useState('oceanBreeze');
    const [selectedDarkGradient, setSelectedDarkGradient] = useState('user');

    const isGuest = isUserDataLoaded && userData?.isAnonymous;

    useEffect(() => {
        if (isUserDataLoaded && userData) {
            setSelectedLightGradient(
                userData.profile?.lightGradient || 'oceanBreeze'
            );
            setSelectedDarkGradient(userData.profile?.darkGradient || 'user');
        }
    }, [isUserDataLoaded, userData]);

    const handleColorChange = (lightColorKey, darkColorKey) => {
        setSelectedLightGradient(lightColorKey);
        setSelectedDarkGradient(darkColorKey);
        setColors(
            darkMode
                ? darkGradientColors[darkColorKey].colors
                : lightGradientColors[lightColorKey].colors
        );
    };

    useEffect(() => {
        // Update colors when dark mode changes based on the selected gradient keys
        setColors(
            darkMode
                ? darkGradientColors[selectedDarkGradient].colors
                : lightGradientColors[selectedLightGradient].colors
        );
    }, [darkMode, selectedLightGradient, selectedDarkGradient]);

    return (
        <div className="relative max-w-screen-xl mx-auto p-5 bg-gray-800">
            <div
                className="absolute inset-0"
                style={{
                    background: `linear-gradient(to right, ${colors.from}, ${colors.via}, ${colors.to})`,
                    opacity: 0.7,
                }}
            ></div>
            <div className="relative flex flex-wrap lg:flex-nowrap lg:space-x-5">
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
