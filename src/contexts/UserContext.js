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
    const [isUserDataLoaded, setIsUserDataLoaded] = useState(false)
    const [userData, setUserData] = useState(emptyUserData);

    const { user, isUserLoaded } = UseAuth();

    //check for userdata updates
    useEffect(() => {
        if(isUserDataLoaded) {
            console.log("userdata:", userData);
        }
    }, [userData])

    //realtime updater
    useEffect(() => {
        let unsubscribe = () => {};
        const userdataRef = collection(db, `/users/${user?.uid}/habits`);

        if(isUserLoaded) {
            //Create new database listener
            unsubscribe = onSnapshot(userdataRef, (snapshot) => {
                //No data in database
                if (snapshot.docs.length === 0) {
                    setUserData((prev) => ({ ...prev, habits: {} }));
                } else {
                    //Data to update
                    snapshot.docs.forEach((doc) => {
                        setUserData((prev) => ({ ...prev, habits: {
                            ...prev.habits,
                            [doc.id]: doc.data()
                        }}))
                    })
                }
            });
            setIsUserDataLoaded(true);
        }

        //Unsubscribe from listener when unmounted
        return () => {
            unsubscribe()
        };
    }, [ isUserLoaded ]);

    return (
        <UserContext.Provider value={{ userData, isUserDataLoaded }}>
            {children}
        </UserContext.Provider>
    );
};

export function useUserData() {
    return useContext(UserContext);
}
