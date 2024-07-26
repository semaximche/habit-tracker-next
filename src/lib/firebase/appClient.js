'use client';

// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDMev8VCz-wDogE-jc4mLOG8m1ciNOGeaQ',
    authDomain: 'habit-tracker-148d9.firebaseapp.com',
    projectId: 'habit-tracker-148d9',
    storageBucket: 'habit-tracker-148d9.appspot.com',
    messagingSenderId: '1094967782047',
    appId: '1:1094967782047:web:4a2d4a8767f55eefce50aa',
    measurementId: 'G-SFXSDTBW6Q',
};

// Initialize Firebase
export const app =
    getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
