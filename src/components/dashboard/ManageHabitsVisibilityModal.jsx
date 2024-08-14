import React, { useState, useEffect } from 'react';
import { UseAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase/firebaseInit';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Checkbox } from '@/components/MaterialUI';

export default function ManageHabitsVisibilityModal({ isOpen, onClose }) {
    const [habits, setHabits] = useState([]);
    const { user } = UseAuth();

    useEffect(() => {
        if (user && isOpen) {
            fetchHabits();
        }
    }, [user, isOpen]);

    const fetchHabits = async () => {
        const habitsRef = collection(db, `/users/${user?.uid}/habits`);
        const snapshot = await getDocs(habitsRef);
        const habitsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setHabits(habitsData);
    };

    const handleVisibilityChange = async (habitId, newVisibility) => {
        const habitRef = doc(db, `/users/${user?.uid}/habits`, habitId);
        await updateDoc(habitRef, { isHidden: newVisibility });
        // Update local state
        setHabits(habits.map(habit => 
            habit.id === habitId ? {...habit, isHidden: newVisibility} : habit
        ));
    };

    return (
        <Dialog className='bg-foreground-light dark:bg-foreground-dark' open={isOpen} handler={onClose} size="xs">
            <DialogHeader className='text-accent-light dark:text-accent-dark'>Habits Visibility</DialogHeader>
            <DialogBody>
                {habits.map(habit => (
                    <div key={habit.id} className="flex items-center mb-2">
                        <Checkbox
                            id={habit.id}
                            checked={!habit.isHidden}
                            onChange={() => handleVisibilityChange(habit.id, !habit.isHidden)}
                        />
                        <label htmlFor={habit.id} className="ml-2">
                            {habit.name} {habit.isHidden && "(Hidden)"}
                        </label>
                    </div>
                ))}
            </DialogBody>
            <DialogFooter>
                <Button variant="text" color="red" onClick={onClose} className="mr-1">
                    Close
                </Button>
            </DialogFooter>
        </Dialog>
    );
}