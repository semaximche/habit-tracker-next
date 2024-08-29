'use client';
import {
    getFirestore,
    collection,
    query,
    where,
    deleteDoc,
    getDocs,
} from 'firebase/firestore';

const db = getFirestore();

// Function to unfollow a user
async function unfollowUser(followerId, followedId) {
    try {
        // Query to find follow relationship
        const q = query(
            collection(db, 'follows'),
            where('followerId', '==', followerId),
            where('followedId', '==', followedId)
        );
        const querySnapshot = await getDocs(q);

        // Delete all matching documents
        for (const docSnapshot of querySnapshot.docs) {
            await deleteDoc(docSnapshot.ref);
        }
    } catch (error) {
        // Log error
        console.error('Error unfollowing user:', error);
    }
}

export { unfollowUser };
