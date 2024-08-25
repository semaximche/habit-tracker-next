import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Checkbox,
} from '@/components/MaterialUI'; // Import MaterialUI components
import { UseAuth } from '@/contexts/AuthContext'; // Import custom authentication context
import { db } from '@/lib/firebase/firebaseInit'; // Import Firebase initialization
import { addDoc, collection } from 'firebase/firestore'; // Firebase Firestore methods for adding documents
import { useState } from 'react'; // React useState hook for managing state
import { HexColorPicker } from 'react-colorful'; // HexColorPicker component for color selection

export default function CreateHabit({ isModalOpen, toggleModal }) {
    const [handling, setHandling] = useState(false); // State to handle form submission status
    const [category, setCategory] = useState(''); // State to manage the selected category
    const [color, setColor] = useState('#aabbcc'); // State to manage the selected color
    const { user } = UseAuth(); // Get the current user from the authentication context

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        if (!handling) {
            toggleModal(); // Close the modal
            setHandling(true); // Set handling to true to prevent multiple submissions

            const habitsRef = collection(db, `/users/${user?.uid}/habits`); // Reference to the user's habits collection in Firestore

            const formActiveDays = []; // Array to store the selected active days
            e.target.elements.activeDays.forEach((element, index) => {
                if (element.checked) {
                    formActiveDays.push(index); // Add the index of the checked day to the array
                }
            });

            // Add a new habit document to the Firestore collection
            const docRef = await addDoc(habitsRef, {
                name: e.target.elements.name.value, // Habit name from the input field
                color: color, // Selected color
                category: category, // Selected category
                completeDays: [], // Empty array for completed days
                activeDays: formActiveDays, // Selected active days
                isHidden: false, // Habit visibility status, default is false
            });

            setHandling(false); // Reset handling status after submission
        }
    };

    return (
        <>
            {/* Dialog component for the modal */}
            <Dialog
                open={isModalOpen} // Open the modal if isModalOpen is true
                handler={toggleModal} // Toggle modal visibility
                size="xs"
                className="bg-foreground-light dark:bg-foreground-dark"
            >
                <DialogHeader className="text-accent-light dark:text-accent-dark">
                    New Habit {/* Modal title */}
                </DialogHeader>

                {/* Form for creating a new habit */}
                <form onSubmit={handleSubmit}>
                    <DialogBody>
                        {/* Input field for the habit name */}
                        <Input
                            className="text-accent-light dark:text-accent-dark"
                            label="Habit Name"
                            placeholder="Exercise"
                            id="name"
                        />
                        
                        {/* Color picker for selecting the habit color */}
                        <label>Color</label>
                        <HexColorPicker color={color} onChange={setColor} />
                        
                        {/* Dropdown for selecting the habit category */}
                        <label htmlFor="category">Category</label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-2 border rounded text-accent-light dark:text-accent-dark bg-background-light dark:bg-foreground-dark"
                        >
                            <option value="">Select a category</option>
                            {/* Map through the categories and create an option for each */}
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

                        {/* Checkbox group for selecting active days */}
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
                                        id="activeDays"
                                        value={day}
                                    />
                                    <label className="text-sm">{day}</label>
                                </div>
                            ))}
                        </div>
                    </DialogBody>
                    <DialogFooter>
                        {/* Button to cancel and close the modal */}
                        <Button
                            variant="text"
                            color="red"
                            type="button"
                            onClick={toggleModal}
                            className="mr-1"
                        >
                            <span>Cancel</span>
                        </Button>
                        {/* Button to submit the form and add the habit */}
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
