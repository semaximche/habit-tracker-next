'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UseAuth } from '@/contexts/AuthContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebaseInit';
import { Button, Input } from '@/components/MaterialUI';
import { signInAsGuest, signInWithGoogle } from '@/lib/firebase/auth';

/**
 * LoginForm component allows users to log in to the application
 * using email and password, Google, or as a guest. It handles
 * user authentication and redirects to the dashboard if the user
 * is already logged in or after a successful login.
 */

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { user } = UseAuth();
    const router = useRouter();

    // Effect to redirect to the dashboard if the user is already logged in
    useEffect(() => {
        if (user) {
            router.push('/dashboard'); // Redirect if already logged in
        }
    }, [user, router]);


    
    //Handles the form submission for email and password login.
    // It attempts to sign in the user and redirects to the dashboard
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/dashboard'); // Redirect to main page after logging in
        } catch (error) {
            setError('Invalid email or password. Please try again.');
            console.error('Error signing in:', error);
        }
    };

    return (
        <div className="flex flex-col items-center gap-3">
            <Button
                className="flex items-center gap-2 w-52 h-10"
                color="blue"
                onClick={signInWithGoogle}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-google"
                    viewBox="0 0 16 16"
                >
                    <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                </svg>
                Login with Google
            </Button>
            <Button
                className="w-52 h-10"
                color="blue-gray"
                onClick={signInAsGuest}
            >
                Login as Guest
            </Button>
            <div className="flex flex-row items-center gap-2">
                <span className="bg-accent-light block px-20 h-0.5"></span>
                <p className="text-accent-light">Or</p>
                <span className="bg-accent-light block px-20 h-0.5"></span>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <form
                onSubmit={handleSubmit}
                className="flex flex-col w-52 items-center gap-3"
            >
                <Input
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="JohnSmith@gmail.com"
                    required
                    className="p-2 w-52"
                />
                <Input
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="p-2 w-52"
                />
                <Button type="submit" className="w-52 h-10" color="blue-gray">
                    Login
                </Button>
            </form>
        </div>
    );
}
