'use client';

import { useState } from 'react';
import { createUser } from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';
import {
    Button,
    Card,
    Typography,
    Input,
  } from '@material-tailwind/react';
export default function SignUpForm({ darkMode }) {
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
        <Card 
          className={`p-8 rounded-lg shadow-lg ${darkMode ? 'bg-background-dark text-foreground-light' : 'bg-background-light text-foreground-dark'} max-w-sm w-full`}
        >
          {error && <Typography color="red" className="text-red-500 mb-4">{error}</Typography>}
          
          <Typography 
            variant="h1" 
            color={darkMode ? "foreground-light" : "foreground-dark"} 
            className="font-bold text-2xl mb-4"
          >
            Sign Up
          </Typography>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="mb-4">
              <Typography className={`text-sm font-bold mb-2 ${darkMode ? 'text-foreground-light' : 'text-foreground-dark'}`}>
                Username
              </Typography>
              <Input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
                className={`text-${darkMode ? 'foreground-light' : 'foreground-dark'} border-${darkMode ? 'accent-dark' : 'accent-light'}`} 
              />
            </div>
  
            <div className="mb-4">
              <Typography className={`text-sm font-bold mb-2 ${darkMode ? 'text-foreground-light' : 'text-foreground-dark'}`}>
                Email
              </Typography>
              <Input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className={`text-${darkMode ? 'foreground-light' : 'foreground-dark'} border-${darkMode ? 'accent-dark' : 'accent-light'}`} 
              />
            </div>
  
            <div className="mb-4">
              <Typography className={`text-sm font-bold mb-2 ${darkMode ? 'text-foreground-light' : 'text-foreground-dark'}`}>
                Password
              </Typography>
              <Input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className={`text-${darkMode ? 'foreground-light' : 'foreground-dark'} border-${darkMode ? 'accent-dark' : 'accent-light'}`} 
              />
            </div>
  
            <Button 
              type="submit"
              className={`bg-primary-${darkMode ? 'dark' : 'light'} text-foreground-light border-2 border-primary-${darkMode ? 'dark' : 'light'} px-6 py-3 rounded-full w-full hover:bg-primary-${darkMode ? 'dark' : 'light'} hover:text-foreground-light`}
            >
              Sign Up
            </Button>
          </form>
        </Card>
    );
}