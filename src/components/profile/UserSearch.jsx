'use client';
import React, { useState } from 'react';
import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
} from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';
import { followUser } from './followSYS/Following';
import { unfollowUser } from './followSYS/unFollowing';
import MiniProfile from './MiniProfile';
import { useRouter } from 'next/navigation';

const db = getFirestore();

const UserSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const { user } = useAuth();
    const router = useRouter();

    const handleSearch = async () => {
        if (searchTerm.trim() === '') {
            setMessage('Please enter a search term.');
            return;
        }

        setIsLoading(true);
        setMessage('Searching for users...');
        setSearchResults([]);

        try {
            // Firestore query to search for users with a username matching the searchTerm
            const usersRef = collection(db, 'users');
            const q = query(
                usersRef,
                where('username', '>=', searchTerm),
                where('username', '<=', searchTerm + '\uf8ff')
            );
            const querySnapshot = await getDocs(q);
            const results = [];

            // Iterate through query results and check if the current user follows them
            for (let doc of querySnapshot.docs) {
                const userData = { id: doc.id, ...doc.data() };
                const followQuery = query(
                    collection(db, 'follows'),
                    where('followerId', '==', user.uid),
                    where('followedId', '==', userData.id)
                );
                const followSnapshot = await getDocs(followQuery);
                userData.isFollowed = !followSnapshot.empty;

                // Exclude the current user's own profile from the search results
                if (userData.id !== user.uid) {
                    results.push(userData);
                }
            }

            setSearchResults(results);

            setMessage(results.length === 0 ? 'No users found.' : `Found ${results.length} user(s).`);
        } catch (error) {
            console.error('Error searching for users:', error);
            setMessage('An error occurred while searching. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleFollowToggle = async (friendId, isCurrentlyFollowed) => {
        if (user) {
            try {
                if (isCurrentlyFollowed) {
                    await unfollowUser(user.uid, friendId);
                    setMessage('User unfollowed successfully!');
                } else {
                    await followUser(user.uid, friendId);
                    setMessage('User followed successfully!');
                }

                // Update the local state to reflect the follow/unfollow action
                setSearchResults((prevResults) =>
                    prevResults.map((result) =>
                        result.id === friendId
                            ? { ...result, isFollowed: !isCurrentlyFollowed }
                            : result
                    )
                );
            } catch (error) {
                console.error('Error toggling follow status:', error);
                setMessage('An error occurred. Please try again.');
            }
        } else {
            console.log('User must be logged in to follow/unfollow');
            setMessage('You must be logged in to follow or unfollow users.');
        }
    };

    const handleNavigate = (userId) => {
        router.push(`/profile/${userId}`);
    };

    return (
        <div>
            <div className="relative">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for users..."
                    className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
                    disabled={isLoading} // Disable input while loading to prevent multiple requests
                />
                <button
                    onClick={handleSearch}
                    className="absolute right-0 top-0 mt-2 mr-2 text-white"
                    disabled={isLoading} // Disable button while loading to prevent multiple clicks
                >
                    🔍
                </button>
            </div>

            {message && (
                <div className="mt-4 p-2 bg-gray-700 text-white rounded">
                    {message}
                </div>
            )}

            <div className="mt-4">
                {searchResults.map((result) => (
                    <MiniProfile
                        key={result.id}
                        name={result.username}
                        lastOnline={result.lastOnline || 'Unknown'}
                        badgeNumber={result.badgeNumber || 1}
                        onFollow={() => handleFollowToggle(result.id, result.isFollowed)}
                        onNavigate={() => handleNavigate(result.id)}
                        isFollowed={result.isFollowed}
                    />
                ))}
            </div>
        </div>
    );
};

export default UserSearch;
