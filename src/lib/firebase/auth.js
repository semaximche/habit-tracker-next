import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
} from 'firebase/auth';
import { auth } from './appClient';

export async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error('Error signing in with Google:', error);
    }
}

export async function createUser(email, password, username) {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        await updateProfile(userCredential.user, { displayName: username });
    } catch (error) {
        console.error('Error creating new user:', error);
        throw error;
    }
}

export async function signOut() {
    try {
        return auth.signOut();
    } catch (error) {
        console.error('Error signing out:', error);
    }
}
