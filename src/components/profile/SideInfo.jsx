import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Badges from './Badges';
import MiniProfile from './MiniProfile';
import UserSearch from './UserSearch';
import { useAuth } from '@/contexts/AuthContext';
import { followUser } from './followSYS/Following';
import { unfollowUser } from './followSYS/unFollowing';
import { getFirestore, collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';

const db = getFirestore();

const SideInfo = ({ className }) => {
  const [followedUsers, setFollowedUsers] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const followsRef = collection(db, 'follows');
      const q = query(followsRef, where('followerId', '==', user.uid));

      const unsubscribe = onSnapshot(q, async (snapshot) => {
        const followedUsersData = [];
        for (const doc of snapshot.docs) {
          const followedUserId = doc.data().followedId;
          const userDoc = await getDocs(query(collection(db, 'users'), where('uid', '==', followedUserId)));
          if (!userDoc.empty) {
            followedUsersData.push({
              id: followedUserId,
              username: userDoc.docs[0].data().username, 
              lastOnline: userDoc.docs[0].data().lastOnline,
              badgeNumber: userDoc.docs[0].data().badgeNumber,
              isFollowed: true
            });
          }
        }
        setFollowedUsers(followedUsersData);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const handleFollow = async (friendId) => {
    if (user) {
      try {
        await followUser(user.uid, friendId);
      } catch (error) {
        console.error("Error following user:", error);
      }
    } else {
      console.log("User must be logged in to follow");
    }
  };

  const handleUnfollow = async (friendId) => {
    if (user) {
      try {
        await unfollowUser(user.uid, friendId);
      } catch (error) {
        console.error("Error unfollowing user:", error);
      }
    }
  };

  const handleNavigateToProfile = (username) => {
    router.push(`/profile/${username}`);
  };

  return (
    <div className={`p-5 bg-gray-950 rounded-lg ${className}`} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="text-xl mb-4">
        <p>Currently {user ? 'Online' : 'Offline'}</p>
        <p className="text-sm text-gray-400">Last Online {user ? 'Now' : '23 days ago'}</p>
      </div>
      <div className="mb-4">
        <Badges />
      </div>
      <div className="mb-4">
        <p className="text-lg">Habits 71</p>
        <p>Something</p>
      </div>
      <div>
        <p className="text-lg mb-2">Following {followedUsers.length}</p>
        {followedUsers.map((friend) => (
          <MiniProfile
            key={friend.id}
            name={friend.username || friend.id}
            lastOnline={friend.lastOnline || 'Unknown'}
            badgeNumber={friend.badgeNumber || 0}
            onFollow={() => friend.isFollowed ? handleUnfollow(friend.id) : handleFollow(friend.id)}
            onNavigate={() => handleNavigateToProfile(friend.username)}
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