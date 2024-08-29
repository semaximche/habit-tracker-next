'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UseAuth } from '@/contexts/AuthContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebaseInit';
import { Button, Input } from '@/components/MaterialUI';
import { signInAsGuest, signInWithGoogle } from '@/lib/firebase/auth';

export default function LoginForm() {
    // State variables to store the user's email, password, and any error messages
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const { user } = UseAuth(); // Retrieves the currently authenticated user from context
    const router = useRouter(); // Next.js router for navigation

    // useEffect hook to redirect the user to the dashboard if they are already logged in
    useEffect(() => {
        if (user) {
            router.push('/dashboard'); // Redirect to the dashboard if the user is already authenticated
        }
    }, [user, router]);

    // Function to handle form submission for logging in with email and password
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            // Attempt to sign in the user with the provided email and password
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/dashboard'); // Redirect to the dashboard upon successful login
        } catch (error) {
            // Display an error message if the login fails
            setError('Invalid email or password. Please try again.');
            console.error('Error signing in:', error);
        }
    };

    return (
        <div className="flex flex-col items-center gap-3">
            {/* Button to sign in with Google */}
            <Button
                className="flex items-center gap-2 w-52 h-10"
                color="blue"
                onClick={signInWithGoogle}
            >
                {/* Google logo SVG */}
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
            
            {/* Button to sign in as a guest */}
            <Button
                className="w-52 h-10"
                color="blue-gray"
                onClick={signInAsGuest}
            >
                Login as Guest
            </Button>
            
            {/* Divider with text "Or" */}
            <div className="flex flex-row items-center gap-2">
                <span className="bg-accent-light block px-20 h-0.5"></span>
                <p className="text-accent-light">Or</p>
                <span className="bg-accent-light block px-20 h-0.5"></span>
            </div>
            
            {/* Display error message if there is one */}
            {error && <p className="text-red-500">{error}</p>}
            
            {/* Login form for email and password */}
            <form
                onSubmit={handleSubmit}
                className="flex flex-col w-52 items-center gap-3"
            >
                {/* Input for the email address */}
                <Input
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="JohnSmith@gmail.com"
                    required
                    className="p-2 w-52"
                />
                
                {/* Input for the password */}
                <Input
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="p-2 w-52"
                />
                
                {/* Submit button */}
                <Button type="submit" className="w-52 h-10" color="blue-gray">
                    Login
                </Button>
            </form>
        </div>
    );
}
