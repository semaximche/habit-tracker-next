'use client';
import { auth } from '@/lib/firebase/firebaseInit';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useContext, createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    //Firebase user state
    const [user, setUser] = useState();
    const [isUserLoaded, setIsUserLoaded] = useState(false)

    useEffect(() => {
        //Create observer for auth state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                //There is a user logged in
                setUser(currentUser);
            } else {
                //There is no user logged in
                setUser(null);
            }
            setIsUserLoaded(true);
        }, []);

        //Unsubscribe from auth state change observer when component is unmounted
        return () => unsubscribe();
    }, []);

    //Context wrapper
    return (
        <AuthContext.Provider value={{ user, isUserLoaded }}>{children}</AuthContext.Provider>
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
