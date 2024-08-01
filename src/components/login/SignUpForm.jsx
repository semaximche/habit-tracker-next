'use client';

import { useState } from 'react';
import { createUser } from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@/components/MaterialUI';

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
        <div className="flex flex-col items-center gap-3">
            <form onSubmit={handleSubmit} className="flex flex-col w-52 items-center gap-3">
                {error && <p className="text-red-500">{error}</p>}
                <Input
                    label="Display Name"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="John Smith"
                    required
                    className="p-2 border border-gray-300 rounded"
                />
                <Input
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="JohnSmith@gmail.com"
                    required
                    className="p-2 border border-gray-300 rounded"
                />
                <Input
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="p-2 border border-gray-300 rounded"
                />
                <Button
                    type="submit"
                    className="w-52 h-10"
                    color="blue-gray"
                >
                    Sign Up
                </Button>
            </form>
        </div>
    );
}