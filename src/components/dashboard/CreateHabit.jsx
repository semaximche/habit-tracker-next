import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Radio,
    Checkbox,
    Select,
    Option,
} from '@/components/MaterialUI';
import { UseAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase/firebaseInit';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

/*
This component allows users to create a new habit within a modal dialog. 
It utilizes various imported UI components and Firebase services. 
Users can enter a habit name, pick a color, select a category, and choose active days for the habit.
Upon submission, the new habit is added to the user's habits collection in Firestore, and the modal is closed.
The form prevents duplicate submissions by tracking the handling state.
*/

export default function CreateHabit({ isModalOpen, toggleModal }) {
    const [handling, setHandling] = useState(false);
    const [category, setCategory] = useState('');
    const [color, setColor] = useState('#aabbcc');
    const { user } = UseAuth();

    // Function to handle form submission for creating a new habit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!handling) {
            toggleModal();
            setHandling(true);
            const habitsRef = collection(db, `/users/${user?.uid}/habits`);
            const formActiveDays = [];
            e.target.elements.activeDays.forEach((element, index) => {
                if (element.checked) {
                    formActiveDays.push(index);
                }
            });
            // Add a new document to the user's habits collection in Firestore
            const docRef = await addDoc(habitsRef, {
                name: e.target.elements.name.value,
                color: color,
                category: category,
                completeDays: [],
                activeDays: formActiveDays,
                isHidden: false, 
            });
            setHandling(false);
        }
    };
    
    return (
        <>
            <Dialog
                open={isModalOpen}
                handler={toggleModal}
                size="xs"
                className="bg-foreground-light dark:bg-foreground-dark"
            >
                <DialogHeader className="text-accent-light dark:text-accent-dark">
                    New Habit
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <DialogBody>
                        <Input
                            className="text-accent-light dark:text-accent-dark"
                            label="Habit Name"
                            placeholder="Exercise"
                            id="name"
                        />
                        <label>Color</label>
                        <HexColorPicker color={color} onChange={setColor} />
                        <label htmlFor="category">Category</label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-2 border rounded text-accent-light dark:text-accent-dark bg-background-light  dark:bg-foreground-dark"
                        >
                            <option value="">Select a category</option>
                            {[
                                'Health',
                                'Fitness',
                                'Productivity',
                                'Learning',
                                'Quitting',
                                'Finance',
                                'Social',
                                'Creative',
                                'Abstract',
                            ].map((cat, index) => (
                                <option key={index} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                        <br />
                        <label>Frequency</label>
                        <div className="flex flex-wrap">
                            {[
                                'Sun',
                                'Mon',
                                'Tue',
                                'Wed',
                                'Thu',
                                'Fri',
                                'Sat',
                            ].map((day, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col justify-center items-center p-0.5"
                                >
                                    <Checkbox
                                        ripple={false}
                                        className="hover:before:opacity-0"
                                        id="activeDays" // Checkbox for selecting active day
                                        value={day}
                                    />
                                    <label className="text-sm">{day}</label>
                                </div>
                            ))}
                        </div>
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            type="button"
                            onClick={toggleModal}
                            className="mr-1"
                        >
                            <span>Cancel</span>
                        </Button>
                        <Button
                            variant="gradient"
                            color="blue-gray"
                            type="submit"
                        >
                            <span>Add Habit</span>
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
        </>
    );
}
