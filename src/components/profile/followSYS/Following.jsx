import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Initialize Firestore
const db = getFirestore();

// Function to follow a user
export async function followUser(followerId, followedId) {
    try {
        // Add follow relationship to Firestore
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
