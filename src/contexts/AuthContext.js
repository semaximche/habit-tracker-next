'use client';
import { auth } from '@/lib/firebase/appClient';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useContext, createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    //Firebase user state
    const [user, setUser] = useState();

    //On user change effect
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                //There is a user logged in
                setUser(currentUser);
                console.log('user:', currentUser);
            } else {
                //There is no user logged in
                setUser(null);
                console.log('user not logged in');
            }
        });
        return () => unsubscribe();
    }, [user]);

    //Context wrapper
    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
};

//user.displayName to get name
//user.uid to get uid
export function UseAuth() {
    return useContext(AuthContext);
}

//extra component to validate authentication and redirect to homepage if not authenticated
export function AuthValidation({ children }) {
    const { user } = UseAuth();
    const router = useRouter();

    useEffect(() => {
        if (user === null) {
            router.push('/');
        }
    }, [user]);

    return <>{children}</>;
}
