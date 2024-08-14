import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInAnonymously,
    signInWithPopup,
    updateProfile,
} from 'firebase/auth';
import { auth, db } from './firebaseInit';
import { doc, setDoc } from 'firebase/firestore';

export async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    try {
        const userCredential = await signInWithPopup(auth, provider);
        //Create user profile
        await setDoc(profileRef, {
            username: userCredential.user.displayName,
            about: '',
            location: 'Location not known', // Save the selected location
            avatarURL: '',
            level: 0, // Save the user's level
            uid: userCredential.user.uid, // Save the user's UID in the document
        });
    } catch (error) {
        console.error('Error signing in with google', error);
    }
}

export async function signInAsGuest() {
    try {
        const userCredential = await signInAnonymously(auth);
        //Update display name
        await updateProfile(userCredential.user, { displayName: 'Guest' });
        //Create user profile
        const profileRef = doc(db, `users/${userCredential.user.uid}`);
        await setDoc(profileRef, {
            username: 'Guest',
            about: '',
            location: 'Location not known', // Save the selected location
            avatarURL: '',
            level: 0, // Save the user's level
            uid: userCredential.user.uid, // Save the user's UID in the document
        });
    } catch (error) {
        console.error('Error signing in as guest', error);
    }
}

export async function createUser(email, password, username) {
    try {
        //Create user
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        //Update display name
        await updateProfile(userCredential.user, { displayName: username });
        //Create user profile
        const profileRef = doc(db, `users/${userCredential.user.uid}`);
        await setDoc(profileRef, {
            username: username,
            about: '',
            location: 'Location not known', // Save the selected location
            avatarURL: '',
            level: 0, // Save the user's level
            uid: userCredential.user.uid, // Save the user's UID in the document
        });
    } catch (error) {
        console.error('Error creating new user:', error);
        throw error;
    }
}

export async function signOut() {
    try {
        return auth.signOut();
    } catch (error) {
        console.error('Error signing out', error);
    }
}
