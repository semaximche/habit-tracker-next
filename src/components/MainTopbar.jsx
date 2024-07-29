'use client';
import Link from 'next/link';
import LoginSignupGroup from './LoginSignupGroup';
import { UseAuth } from '@/contexts/AuthContext';
import UserSignoutGroup from './UserSignoutGroup';

export default function MainTopbar() {
    const { user, isUserLoaded } = UseAuth();

    return (
        <div className=" bg-blue-gray-500 shadow-xl flex items-center">
            <Link
                href="/"
                className="text-white font-bold text-2xl m-5 hidden sm:block"
            >
                Habit Tracker
            </Link>

            <div className="flex-auto"></div>
            {isUserLoaded ? (user ? <UserSignoutGroup /> : <LoginSignupGroup />) : (<></>)}
        </div>
    );
}
