import OtherUserProfile from '@/components/OtherUserProfile';
import { Suspense } from 'react';

export default function OtherUserProfilePage() {
    return (
        <div className="bg-gray-900 min-h-screen text-white p-5">
            <Suspense>
                <OtherUserProfile />
            </Suspense>
        </div>
    );
}
