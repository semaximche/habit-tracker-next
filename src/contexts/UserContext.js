'use client';

import { useContext, createContext, useState, useEffect } from 'react';
import { UseAuth } from './AuthContext';
import { db } from '@/lib/firebase/appClient';
import { collection, onSnapshot } from 'firebase/firestore';

const UserContext = createContext();

export const emptyUserData = {
    habits: {},
};

export const UserContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState();
    const { user } = UseAuth();

    //detect whether user authentication has been loaded
    useEffect(() => {
        if (user === null || typeof user === 'undefined') {
            setLoading(true);
            setUserData(emptyUserData);
        } else {
            setLoading(false);
        }
    }, [user]);

    //realtime updater
    useEffect(() => {
        let isMounted = true;
        const userdataRef = collection(db, `/users/${user?.uid}/habits`);

        //habits realtime updates
        onSnapshot(userdataRef, (snapshot) => {
            if (isMounted && !loading) {
                console.log(snapshot);
                //No data in database
                if (snapshot.docs.length === 0) {
                    setUserData((prev) => ({ ...prev, habits: {} }));
                } else {
                    //Data to update
                    snapshot.docs.forEach((doc) => {
                        setUserData((prev) => ({
                            ...prev,
                            habits: {
                                ...prev.habits,
                                [doc.id]: doc.data(),
                            },
                        }));
                    });
                }
                console.log(userData);
            }
        });

        return () => {
            isMounted = false; // return this to true maybe
        };
    }, [setUserData, loading]);

    return (
        <UserContext.Provider value={{ userData }}>
            {children}
        </UserContext.Provider>
    );
};

export function useUserData() {
    return useContext(UserContext);
}
