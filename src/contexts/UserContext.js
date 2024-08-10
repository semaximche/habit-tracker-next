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
        }
    }, [userData]);

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

    const updateUserXP = async (xp) => {
        if (!user?.uid) return;

        const profileRef = doc(db, `users/${user.uid}`);
        const level = Math.floor(xp / 100) + 1;

        await updateDoc(profileRef, {
            xp,
            level,
        });
    };

    return (
        <UserContext.Provider value={{ userData, setUserData, isUserDataLoaded, updateUserXP }}>
            {children}
        </UserContext.Provider>
    );
};

export function useUserData() {
    return useContext(UserContext);
}
