'use client';
import { UseAuth } from '@/contexts/AuthContext';
import LogoutButton from '../LogoutButton';
import { Navbar } from '@/components/MaterialUI';

export default function Topbar() {
    const { user } = UseAuth();

    let firstname = 'firstname';

    if (user) {
        firstname = user.displayName.split(' ')[0];
    } else {
        firstname = 'firstname';
    }

    return (
        <Navbar className="text-center flex bg-gray-700 items-center">
            <div className="flex-inital">
                <p>hamburger maybe here</p>
            </div>
            <div className="flex-auto hidden sm:block">
                <h1 className="text-3xl font-bold">
                    Good afternoon, {firstname}
                </h1>
                <p>Have a nice day</p>
            </div>
            <div className="flex-auto block sm:hidden">
                <h1 className="text-3xl font-bold">{firstname}</h1>
            </div>
            <div className="flex-3">
                <LogoutButton />
            </div>
        </Navbar>
    );
}
