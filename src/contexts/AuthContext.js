'use client';
import { auth } from '@/lib/firebase/appClient';
import { onAuthStateChanged } from 'firebase/auth';
import { useContext, createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    //Firebase user state
    const [user, setUser] = useState(null);

    //On user change effect
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if(currentUser) {
                //There is a user logged in
                setUser(currentUser);
                console.log("user:", currentUser);
            } else {
                //There is no user logged in
                setUser(null);
                console.log("user not logged in");
            }
        });
        return () => unsubscribe();
    }, [user]);

    //Context wrapper
    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
};

export function UserAuth() {
    return useContext(AuthContext);
}