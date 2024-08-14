import { getFirestore, collection, addDoc } from 'firebase/firestore';

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
