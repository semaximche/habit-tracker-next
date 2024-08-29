'use client';
import {
    getFirestore,
    collection,
    query,
    where,
    deleteDoc,
    getDocs,
} from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Removes a follow relationship in the Firestore database.
 * Queries the 'follows' collection to find and delete the document
 * where the followerId matches the given follower and followed IDs.
 */

const db = getFirestore();

async function unfollowUser(followerId, followedId) {
    try {
        const q = query(
            collection(db, 'follows'),
            where('followerId', '==', followerId),
            where('followedId', '==', followedId)
        );
        const querySnapshot = await getDocs(q);
        for (const docSnapshot of querySnapshot.docs) {
            await deleteDoc(docSnapshot.ref);
        }
    } catch (error) {
        console.error('Error unfollowing user:', error);
    }
}

export { unfollowUser };
