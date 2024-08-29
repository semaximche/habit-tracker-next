'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
    getFirestore,
    doc,
    getDoc,
    collection,
    query,
    where,
    getDocs,
} from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';
import MiniProfile from './profile/MiniProfile';
import Badges from './profile/Badges';
import { followUser } from './profile/followSYS/Following';
import { unfollowUser } from './profile/followSYS/unFollowing';
import OtherUserCategorySummary from './OtherUserCategorySummary';
import OtherUserRecentCategories from './OtherUserRecentCategories';
import { useDarkMode } from '@/contexts/DarkModeContext';
import {
    darkGradientColors,
    lightGradientColors,
} from '@/components/profile/gradientColors';

/**
 * Displays another user's profile, including their avatar, username,
 * about section, habit summaries, and badges. Allows following/unfollowing
 * the user and adapts to dark mode.
 *
 * Fetches user data from Firestore based on username or UID.
 * Shows loading state while data is being retrieved.
 */

const db = getFirestore();

const OtherUserProfile = () => {
    const searchParams = useSearchParams();
    const { user } = useAuth();
    const { darkMode } = useDarkMode();
    const [profileUser, setProfileUser] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [habits, setHabits] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [colors, setColors] = useState(darkGradientColors.user.colors);

    useEffect(() => {
        const fetchUserData = async () => {
            const userIdentifier = searchParams.get('username');
            if (!userIdentifier) {
                setIsLoading(false);
                return;
            }

            try {
                let userData;
                // First, try to fetch by UID
                const userDocRef = doc(db, 'users', userIdentifier);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    userData = { id: userDocSnap.id, ...userDocSnap.data() };
                } else {
                    // If not found by UID, try to fetch by username
                    const usersRef = collection(db, 'users');
                    const q = query(
                        usersRef,
                        where('username', '==', userIdentifier)
                    );
                    const querySnapshot = await getDocs(q);

                    if (!querySnapshot.empty) {
                        userData = {
                            id: querySnapshot.docs[0].id,
                            ...querySnapshot.docs[0].data(),
                        };
                    }
                }

                if (userData) {
                    setProfileUser(userData);

                    // Check if the current user is following this user
                    if (user) {
                        const followRef = collection(db, 'follows');
                        const followQuery = query(
                            followRef,
                            where('followerId', '==', user.uid),
                            where('followedId', '==', userData.id)
                        );
                        const followSnapshot = await getDocs(followQuery);
                        setIsFollowing(!followSnapshot.empty);
                    }

                    // Fetch habits
                    const habitsRef = collection(
                        db,
                        `users/${userData.id}/habits`
                    );
                    const habitsSnapshot = await getDocs(habitsRef);
                    const habitsData = habitsSnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setHabits(habitsData);

                    // Set gradient colors
                    const colorKey = userData.profile?.darkGradient || 'user';
                    setColors(
                        darkMode
                            ? darkGradientColors[colorKey].colors
                            : lightGradientColors[colorKey].colors
                    );
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [searchParams, user, darkMode]);

    const handleFollowToggle = async () => {
        if (user && profileUser) {
            if (isFollowing) {
                await unfollowUser(user.uid, profileUser.id);
            } else {
                await followUser(user.uid, profileUser.id);
            }
            setIsFollowing(!isFollowing);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (!profileUser) return <div>User not found</div>;

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
                    <div className="flex items-center space-x-4 mb-4">
                        <img
                            src={profileUser.avatarURL || '/default-avatar.png'}
                            alt={profileUser.username}
                            className="w-20 h-20 rounded-full"
                        />
                        <div>
                            <h1 className="text-3xl font-bold text-white">
                                {profileUser.username}
                            </h1>
                            <p className="text-gray-300">
                                {profileUser.location}
                            </p>
                        </div>
                    </div>
                    <div className="bg-gray-900 bg-opacity-70 p-4 rounded-lg">
                        <h2 className="text-2xl font-semibold mb-2 text-white">
                            About
                        </h2>
                        <p className="text-gray-300">{profileUser.about}</p>
                    </div>
                    <OtherUserCategorySummary userId={profileUser.id} />
                    <OtherUserRecentCategories userId={profileUser.id} />
                </div>
                <div className="w-full lg:w-[360px] flex-shrink-0 mt-5 lg:mt-0">
                    <div className="bg-gray-900 bg-opacity-70 p-4 rounded-lg mb-4">
                        <Badges level={profileUser.level} />
                    </div>
                    <MiniProfile
                        name={profileUser.username}
                        lastOnline={profileUser.lastOnline || 'Unknown'}
                        badgeNumber={profileUser.level || 1}
                        onFollow={handleFollowToggle}
                        isFollowed={isFollowing}
                    />
                </div>
            </div>
        </div>
    );
};

export default OtherUserProfile;
