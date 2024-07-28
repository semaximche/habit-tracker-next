'use client';

import { useState, useEffect } from 'react';
import GoogleButton from "@/components/login/GoogleButton";
import { useRouter } from 'next/navigation';
import { UserAuth } from '@/contexts/AuthContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase/appClient';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { user } = UserAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push('/main'); // Redirect if already logged in
        }
    }, [user, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/main'); // Redirect to main page after logging in
        } catch (error) {
            setError('Invalid email or password. Please try again.');
            console.error('Error signing in:', error);
        }
    };

    if (user) {
        return null; // Optionally render a loading state or nothing if the user is already logged in
    }

    return (
        <div className="flex flex-col gap-4">
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="p-2 border border-gray-300 rounded"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="p-2 border border-gray-300 rounded"
                />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded">
                    Log In
                </button>
            </form>
            <GoogleButton />
        </div>
    );
}
