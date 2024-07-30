'use client';
import { UseAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/MaterialUI';
import { signOut } from '@/lib/firebase/auth';
import Link from 'next/link';

export default function UserSignoutGroup() {
    const { user } = UseAuth();

    return (
        <div className="flex-inital flex items-center">
            <div className="p-2 invisible sm:visible">
                <div className=" text-white">{user.displayName}</div>
            </div>
            <div className="p-2">
                <Link href="/dashboard">
                    <Button color="white">Dashboard</Button>
                </Link>
            </div>
            <div className="p-2">
                <Button variant="outlined" color="white" onClick={signOut}>
                    Logout
                </Button>
            </div>
        </div>
    );
}
