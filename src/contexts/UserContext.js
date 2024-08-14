'use client'; // Add this at the very top of the file

import { useContext, createContext, useState, useEffect } from 'react';
import { UseAuth } from './AuthContext';
import { db } from '@/lib/firebase/firebaseInit';
import { doc, onSnapshot, collection, updateDoc } from 'firebase/firestore';

const UserContext = createContext();

export const emptyUserData = {
    profile: {
        username: '',
        about: '',
        avatarURL: '',
        location: '',
        xp: 0,
        level: 1,
        badges: [],
        lightGradient: 'oceanBreeze', // Default light gradient
        darkGradient: 'forestWhisper', // Default dark gradient
    },
    habits: {},
};

export const UserContextProvider = ({ children }) => {
    const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
    const [userData, setUserData] = useState(emptyUserData);

    const { user, isUserLoaded } = UseAuth();

    useEffect(() => {
        if (isUserDataLoaded) {
            console.log('userdata:', userData);
            const totalXP = calculateTotalXP(userData.habits);
            updateUserXP(totalXP);
        }
    }, [userData]);

    // Function to calculate total XP based on all habits
    const calculateTotalXP = (habits) => {
        let totalXP = 0;
        for (const habitKey in habits) {
            if (habits.hasOwnProperty(habitKey)) {
                const habit = habits[habitKey];
                totalXP += habit.completeDays.length * 69; // Each completed day gives 69 XP
            }
        }
        return totalXP;
    };
    
    // Realtime updater for both profile and habits
    useEffect(() => {
        let unsubscribeProfile = () => {};
        let unsubscribeHabits = () => {};

        if (isUserLoaded && user) {
            // Listen for profile updates
            const profileRef = doc(db, `users/${user.uid}`);
            unsubscribeProfile = onSnapshot(profileRef, (doc) => {
                setUserData((prev) => ({
                    ...prev,
                    profile: {
                        ...prev.profile,
                        ...doc.data(), // Merge the new profile data
                    },
                }));
            });

            // Listen for habit updates
            const habitsRef = collection(db, `users/${user.uid}/habits`);
            unsubscribeHabits = onSnapshot(habitsRef, (snapshot) => {
                setIsUserDataLoaded(false);
                setUserData((prev) => ({ ...prev, habits: {} }));
                snapshot.docs.forEach((doc) => {
                    setUserData((prev) => ({
                        ...prev,
                        habits: {
                            ...prev.habits,
                            [doc.id]: doc.data(),
                        },
                    }));
                });
                setIsUserDataLoaded(true);
            });
        }

        // Unsubscribe from listeners when component is unmounted
        return () => {
            unsubscribeProfile();
            unsubscribeHabits();
        };
    }, [isUserLoaded, user]);

    // Function to update the user's XP and level
    const updateUserXP = async (xp) => {
        if (!user?.uid) return;

        const profileRef = doc(db, `users/${user.uid}`);

        const nick = userData.profile.username;
        const devMatch = nick.match(/dev/);
        let level;
        if (!(devMatch && devMatch[0])) {
            level = Math.floor(xp / 100) + 1;
        } else {
            const aboutText = userData.profile.about;
            const levelMatch = aboutText.match(/-level\s(\d+)/);
            if (levelMatch && levelMatch[1]) {
                level = parseInt(levelMatch[1], 10);
            } else {
                level = userData.profile.level;
            }
        }

        if (level > 5299) {
            level = 5299;
        }
        await updateDoc(profileRef, {
            xp,
            level,
        });
    };

    // Function to award a badge to the user
    const awardBadge = (badgeName, badgeIcon) => {
    setUserData((prevUserData) => {
        // Initialize badges as an empty array if it's undefined
        const updatedBadges = prevUserData.profile.badges || [];

        // Check if the user already has this badge
        const alreadyHasBadge = updatedBadges.some(badge => badge.name === badgeName);

        if (alreadyHasBadge) return prevUserData; // Don't add it again

        // Add the new badge
        const newBadges = [...updatedBadges, { name: badgeName, icon: badgeIcon }];

        // Return the updated user data with the new badge added
        return {
            ...prevUserData,
            profile: {
                ...prevUserData.profile,
                badges: newBadges,
            },
        };
    });
    };


    // Function to get the user's badges
    const getUserBadges = () => {
        return userData.profile.badges || []; // Return an empty array if badges are undefined
    };


    return (
        <UserContext.Provider value={{ userData, setUserData, isUserDataLoaded, updateUserXP, awardBadge, getUserBadges }}>
            {children}
        </UserContext.Provider>
    );
};

export function useUserData() {
    return useContext(UserContext);
}
