'use client';
import React, { useState } from 'react';
import { getFirestore, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';
import { followUser } from './followSYS/Following';

const db = getFirestore();

const UserSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { user } = useAuth();

  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      setMessage('Please enter a search term.');
      return;
    }

    setIsLoading(true);
    setMessage('Searching for users...');
    setSearchResults([]);

    try {
      const usersRef = collection(db, 'users');
      const q = query(
        usersRef, 
        where('username', '>=', searchTerm), 
        where('username', '<=', searchTerm + '\uf8ff')
      );
      const querySnapshot = await getDocs(q);
      const results = [];

      for (let doc of querySnapshot.docs) {
        const userData = { id: doc.id, ...doc.data() };
        // Check if the current user already follows this user
        const followQuery = query(
          collection(db, 'follows'),
          where('followerId', '==', user.uid),
          where('followedId', '==', userData.id)
        );
        const followSnapshot = await getDocs(followQuery);
        userData.isFollowed = !followSnapshot.empty;

        if (userData.id !== user.uid) {
          results.push(userData);
        }
      }

      setSearchResults(results);

      if (results.length === 0) {
        setMessage('No users found.');
      } else {
        setMessage(`Found ${results.length} user(s).`);
      }
    } catch (error) {
      console.error("Error searching for users:", error);
      setMessage('An error occurred while searching. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFollow = async (friendId) => {
    if (user) {
      try {
        await followUser(user.uid, friendId);
        setSearchResults(prevResults =>
          prevResults.map(result =>
            result.id === friendId ? { ...result, isFollowed: true } : result
          )
        );
        setMessage('User followed successfully!');
      } catch (error) {
        console.error("Error following user:", error);
        setMessage('An error occurred while following the user. Please try again.');
      }
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <div className="flex mb-4">
        <input 
          type="text" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          placeholder="Search users"
          className="flex-grow px-3 py-2 bg-gray-700 text-white rounded-l-lg focus:outline-none"
          disabled={isLoading}
        />
        <button 
          onClick={handleSearch}
          className={`px-4 py-2 text-white rounded-r-lg focus:outline-none ${
            isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
      
      {message && (
        <div className="mb-4 p-2 bg-gray-700 text-white rounded">
          {message}
        </div>
      )}
      
      <div>
        {searchResults.map(result => (
          <div key={result.id} className="flex items-center justify-between mb-2 p-2 bg-gray-700 rounded-lg">
            <span>{result.username}</span>
            <button 
              onClick={() => handleFollow(result.id)}
              className={`px-3 py-1 text-white rounded focus:outline-none ${
                result.isFollowed ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-600'
              }`}
              disabled={result.isFollowed}
            >
              {result.isFollowed ? 'Following' : 'Follow'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSearch;