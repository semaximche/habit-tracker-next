'use client';
import Link from 'next/link';
import LoginSignupGroup from './LoginSignupGroup';
import { UseAuth } from '@/contexts/AuthContext';
import UserSignoutGroup from './UserSignoutGroup';

// TODO : MAKE THIS RECOGNIZE LOGGED IN USER AND CHANGE BUTTONS

export default function MainTopbar() {
    const { user } = UseAuth();

    return (
        <div className=" bg-blue-gray-700 shadow-xl flex items-center">
            <Link
                href="/"
                className="flex initial text-white font-bold text-2xl m-5"
            >
                Habit Tracker
            </Link>

            <div className="flex-auto"></div>
            {user ? <UserSignoutGroup /> : <LoginSignupGroup />}
        </div>
    );
}
