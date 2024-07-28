'use client';

import { useState } from 'react';
import { createUser } from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';

export default function SignUpForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.length < 6) {
            setError('Password should be at least 6 characters.');
            return;
        }
        try {
            await createUser(email, password, username);
            router.push('/dashboard'); // Redirect to main page after signing up
        } catch (error) {
            setError(error.message);
            console.error('Error creating user:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && <p className="text-red-500">{error}</p>}
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
                className="p-2 border border-gray-300 rounded"
            />
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
            <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded"
            >
                Sign Up
            </button>
        </form>
    );
}
