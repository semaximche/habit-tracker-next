import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Badges from './Badges';
import MiniProfile from './MiniProfile';
import BadgeModal from './BadgeModal';
import UserSearch from './UserSearch';
import { useAuth } from '@/contexts/AuthContext';
import { followUser } from './followSYS/Following';
import { unfollowUser } from './followSYS/unFollowing';
import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
    onSnapshot,
} from 'firebase/firestore';
import { useUserData } from '@/contexts/UserContext';
import Link from 'next/link';
import AllCategories from './AllCategories';

const db = getFirestore();

const SideInfo = ({ className }) => {
    // State for handling the modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => setIsModalOpen(!isModalOpen);

    // State for storing the list of followed users
    const [followedUsers, setFollowedUsers] = useState([]);
    
    const router = useRouter();
    const { user } = useAuth(); // Accessing the current logged-in user
    const { userData } = useUserData(); // Accessing user data from context

    // Effect to fetch and listen to followed users when the component mounts
    useEffect(() => {
        if (user) {
            const followsRef = collection(db, 'follows');
            const q = query(followsRef, where('followerId', '==', user.uid));

            // Listening for real-time updates on followed users
            const unsubscribe = onSnapshot(q, async (snapshot) => {
                const followedUsersData = [];
                for (const doc of snapshot.docs) {
                    const followedUserId = doc.data().followedId;
                    const userDoc = await getDocs(
                        query(
                            collection(db, 'users'),
                            where('uid', '==', followedUserId)
                        )
                    );
                    if (!userDoc.empty) {
                        followedUsersData.push({
                            id: followedUserId,
                            username: userDoc.docs[0].data().username,
                            lastOnline: userDoc.docs[0].data().lastOnline,
                            badgeNumber: userDoc.docs[0].data().badgeNumber,
                            isFollowed: true,
                        });
                    }
                }
                setFollowedUsers(followedUsersData);
            });

            // Clean up the subscription when the component unmounts
            return () => unsubscribe();
        }
    }, [user]);

    // Function to handle following a user
    const handleFollow = async (friendId) => {
        if (user) {
            try {
                await followUser(user.uid, friendId);
            } catch (error) {
                console.error('Error following user:', error);
            }
        } else {
            console.log('User must be logged in to follow');
        }
    };

    // Function to handle unfollowing a user
    const handleUnfollow = async (friendId) => {
        if (user) {
            try {
                await unfollowUser(user.uid, friendId);
            } catch (error) {
                console.error('Error unfollowing user:', error);
            }
        }
    };

    // Function to navigate to another user's profile
    const handleNavigateToProfile = (username) => {
        router.push(`/OtherUserProfile?username=${username}`);
    };

    return (
        <div
            className={`p-5 bg-gray-950 rounded-lg ${className}`}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
            <div className="text-xl mb-4">
                <p className={user ? 'text-green-500' : 'text-gray-600'}>
                    Currently {user ? 'Online' : 'Offline'}
                </p>
                <p className="text-sm text-gray-400">
                    Last Online {user ? 'Now' : '1 hour ago'}
                </p>
            </div>
            <div className="mb-4">
                {/* Button to open the badges modal */}
                <button
                    onClick={toggleModal}
                    className="text-white font-semibold"
                >
                    <Badges />
                </button>
                <BadgeModal isOpen={isModalOpen} toggleModal={toggleModal} />
            </div>
            <div className="mb-4">
                <p className="text-lg">
                    Habits {Object.keys(userData.habits).length}
                </p>
                {/* Link to the categories page */}
                <Link href="/AllCategories" className="text-white">
                    Categories
                </Link>
            </div>
            <div>
                <p className="text-lg mb-2">Following {followedUsers.length}</p>
                {/* Render a mini profile for each followed user */}
                {followedUsers.map((friend) => (
                    <MiniProfile
                        key={friend.id}
                        name={friend.username || friend.id}
                        lastOnline={friend.lastOnline || 'Unknown'}
                        badgeNumber={friend.badgeNumber || 0}
                        onFollow={() =>
                            friend.isFollowed
                                ? handleUnfollow(friend.id)
                                : handleFollow(friend.id)
                        }
                        onNavigate={() => handleNavigateToProfile(friend.id)}
                        isFollowed={friend.isFollowed}
                    />
                ))}
                <div className="mt-4">
                    <h3 className="text-lg mb-2">Find Users</h3>
                    <UserSearch />
                </div>
            </div>
        </div>
    );
};

export default SideInfo;
