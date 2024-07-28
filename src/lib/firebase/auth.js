import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import { auth } from './appClient';

export async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error('Error signing in with google', error);
    }
}

export async function createUser(email, password) {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error('Error creating new user', error);
    }
}

export async function signOut() {
    try {
        return auth.signOut();
    } catch (error) {
        console.error('Error signing out', error);
    }
}
