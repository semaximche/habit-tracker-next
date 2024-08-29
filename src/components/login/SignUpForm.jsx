'use client';

import { useState } from 'react';
import { createUser, signInAsGuest } from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';
import { Button, Card, Typography, Input } from '@material-tailwind/react';

export default function SignUpForm({ darkMode }) {
    // State variables to manage user input and error messages
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    const router = useRouter(); // Next.js router for navigation

    // Function to handle guest login
    const handleGuest = async () => {
        await signInAsGuest();
        router.push('/dashboard'); // Redirect to the dashboard after logging in as a guest
    };

    // Function to handle form submission for signing up a new user
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        
        // Validate password length
        if (password.length < 6) {
            setError('Password should be at least 6 characters.');
            return;
        }
        
        try {
            // Attempt to create a new user with the provided email, password, and username
            await createUser(email, password, username);
            router.push('/dashboard'); // Redirect to the dashboard upon successful sign-up
        } catch (error) {
            // Display an error message if sign-up fails
            setError(error.message);
            console.error('Error creating user:', error);
        }
    };

    return (
        <Card
            className={`p-8 rounded-lg shadow-lg ${darkMode ? 'bg-background-dark text-foreground-light' : 'bg-background-light text-foreground-dark'} w-fit`}
        >
            {/* Display error message if there is one */}
            {error && (
                <Typography color="red" className="text-red-500 mb-4">
                    {error}
                </Typography>
            )}

            {/* Main heading of the form, visible only on larger screens */}
            <Typography
                variant="h1"
                color={darkMode ? 'accent-light' : 'accent-dark'}
                className="font-bold text-3xl mb-4 text-center hidden sm:block"
            >
                Transform your life, one habit at a time.
            </Typography>

            {/* Subheading for the form */}
            <Typography
                variant="h2"
                color={darkMode ? 'foreground-light' : 'foreground-dark'}
                className="font-bold text-xl mb-4 text-center"
            >
                Sign Up
            </Typography>

            {/* Sign-up form */}
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center gap-4"
            >
                {/* Input for the display name */}
                <div>
                    <Input
                        label="Display Name"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="John Smith"
                        required
                        className={`text-${darkMode ? 'foreground-light' : 'foreground-dark'} border-${darkMode ? 'accent-dark' : 'accent-light'}`}
                    />
                </div>

                {/* Input for the email address */}
                <div>
                    <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="JohnSmith@gmail.com"
                        required
                        className={`text-${darkMode ? 'foreground-light' : 'foreground-dark'} border-${darkMode ? 'accent-dark' : 'accent-light'}`}
                    />
                </div>

                {/* Input for the password */}
                <div>
                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={`text-foreground-dark dark:text-foreground-dark border-${darkMode ? 'accent-dark' : 'accent-light'}`}
                    />
                </div>

                {/* Submit button for the form */}
                <Button type="submit" color="blue-gray" className="h-10">
                    Sign Up
                </Button>

                {/* Divider with text "Or" */}
                <div className="flex flex-row items-center gap-2">
                    <span className="bg-accent-light block px-10 h-0.5"></span>
                    <p className="text-accent-light">Or</p>
                    <span className="bg-accent-light block px-10 h-0.5"></span>
                </div>

                {/* Button to log in as a guest */}
                <Button
                    className="h-10"
                    color="blue-gray"
                    onClick={handleGuest}
                >
                    Login as Guest
                </Button>
            </form>
        </Card>
    );
}
