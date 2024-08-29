import { getFirestore, collection, addDoc } from 'firebase/firestore';

/**
 * Creates a follow relationship in the Firestore database.
 * Adds a document to the 'follows' collection with the follower's ID,
 * followed user's ID, and the current timestamp.
 */

const db = getFirestore();

export async function followUser(followerId, followedId) {
    try {
        await addDoc(collection(db, 'follows'), {
            followerId: followerId,
            followedId: followedId,
            timestamp: new Date(),
        });
    } catch (error) {
        console.error(
            'Error adding follow relationship:',
            error.message,
            error.code,
            error.stack
        );
        throw error;
    }
}
