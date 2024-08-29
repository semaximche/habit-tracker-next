import React, { useState, useEffect } from 'react';
import { UseAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase/firebaseInit';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Checkbox,
} from '@/components/MaterialUI';

export default function ManageHabitsVisibilityModal({ isOpen, onClose }) {
    const [habits, setHabits] = useState([]); // State to store the list of habits
    const { user } = UseAuth(); // Retrieve the currently authenticated user

    // Effect to fetch habits when the modal opens and the user is authenticated
    useEffect(() => {
        if (user && isOpen) {
            fetchHabits(); // Fetch habits from Firestore
        }
    }, [user, isOpen]);

    // Function to fetch habits from Firestore
    const fetchHabits = async () => {
        const habitsRef = collection(db, `/users/${user?.uid}/habits`); // Reference to the user's habits collection
        const snapshot = await getDocs(habitsRef); // Get all documents in the habits collection
        const habitsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setHabits(habitsData); // Store the fetched habits in the state
    };

    // Function to handle the visibility change of a habit
    const handleVisibilityChange = async (habitId, newVisibility) => {
        const habitRef = doc(db, `/users/${user?.uid}/habits`, habitId); // Reference to the specific habit document
        await updateDoc(habitRef, { isHidden: newVisibility }); // Update the habit's visibility status in Firestore

        // Update the local state to reflect the visibility change
        setHabits(
            habits.map((habit) =>
                habit.id === habitId
                    ? { ...habit, isHidden: newVisibility } // Update the habit's visibility status locally
                    : habit
            )
        );
    };

    return (
        <Dialog
            className="bg-foreground-light dark:bg-foreground-dark" // Apply different background colors based on the theme
            open={isOpen} // Controls the visibility of the modal
            handler={onClose} // Function to handle closing the modal
            size="xs" // Set the size of the modal
        >
            <DialogHeader className="text-accent-light dark:text-accent-dark">
                Habits Visibility
            </DialogHeader>
            <DialogBody>
                {habits.map((habit) => (
                    <div key={habit.id} className="flex items-center mb-2">
                        {/* Checkbox to toggle the visibility of the habit */}
                        <Checkbox
                            id={habit.id}
                            checked={!habit.isHidden} // Checkbox is checked if the habit is not hidden
                            onChange={() =>
                                handleVisibilityChange(
                                    habit.id,
                                    !habit.isHidden
                                )
                            }
                        />
                        <label htmlFor={habit.id} className="ml-2">
                            {habit.name} {habit.isHidden && '(Hidden)'} {/* Display habit name and mark as hidden if necessary */}
                        </label>
                    </div>
                ))}
            </DialogBody>
            <DialogFooter>
                {/* Button to close the modal */}
                <Button
                    variant="text"
                    color="red"
                    onClick={onClose}
                    className="mr-1"
                >
                    Close
                </Button>
            </DialogFooter>
        </Dialog>
    );
}
