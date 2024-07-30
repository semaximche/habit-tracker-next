'use client';
import { useContext, createContext, useState, useEffect } from 'react';
import { UseAuth } from './AuthContext';
import { db } from '@/lib/firebase/firebaseInit';
import { collection, onSnapshot } from 'firebase/firestore';

const UserContext = createContext();

export const emptyUserData = {
    habits: {},
};

export const UserContextProvider = ({ children }) => {
    const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
    const [userData, setUserData] = useState(emptyUserData);

    const { user, isUserLoaded } = UseAuth();

    //check for userdata updates
    useEffect(() => {
        if (isUserDataLoaded) {
            console.log('userdata:', userData.habits);
        }
    }, [userData]);

    //realtime updater
    useEffect(() => {
        let unsubscribe = () => {};
        const habitsRef = collection(db, `/users/${user?.uid}/habits`);

        if (isUserLoaded) {
            //Create new database listener
            unsubscribe = onSnapshot(habitsRef, (snapshot) => {
                //When executing set loading and refresh previous data
                setIsUserDataLoaded(false);
                setUserData((prev) => ({ ...prev, habits: {} }));
                //Update data
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

        //Unsubscribe from listener when unmounted
        return () => {
            unsubscribe();
        };
    }, [isUserLoaded]);

    return (
        <UserContext.Provider value={{ userData, isUserDataLoaded }}>
            {children}
        </UserContext.Provider>
    );
};

export function useUserData() {
    return useContext(UserContext);
}
