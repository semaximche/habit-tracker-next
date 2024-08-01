'use client';

import { useState } from 'react';
import { createUser, signInAsGuest } from '@/lib/firebase/auth';
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
          
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
            <div className="mb-4">
              <Typography className={`text-sm font-bold mb-2 ${darkMode ? 'text-foreground-light' : 'text-foreground-dark'}`}>
                Display Name
              </Typography>
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
  
            <div className="mb-4">
              <Typography className={`text-sm font-bold mb-2 ${darkMode ? 'text-foreground-light' : 'text-foreground-dark'}`}>
                Email
              </Typography>
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
  
            <div className="mb-4">
              <Typography className={`text-sm font-bold mb-2 ${darkMode ? 'text-foreground-light' : 'text-foreground-dark'}`}>
                Password
              </Typography>
              <Input 
                label="Password"
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`text-foreground-light dark:text-foreground-dark border-${darkMode ? 'accent-dark' : 'accent-light'}`} 
              />
            </div>
  
            <Button type="submit" color="blue-gray" className='h-10'>
              Sign Up
            </Button>
            <div className='flex flex-row items-center gap-2'>
                <span className='bg-accent-light block px-10 h-0.5'></span>
                <p className='text-accent-light'>Or</p>
                <span className='bg-accent-light block px-10 h-0.5'></span>
            </div>
            <Button className="h-10" color="blue-gray" onClick={signInAsGuest} >
                Login as Guest
            </Button>
          </form>
        </Card>
    );
}