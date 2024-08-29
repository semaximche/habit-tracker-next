'use client';

import { useDarkMode } from '@/contexts/DarkModeContext'; // Importing the custom hook to access dark mode context

export default function DarkModeToggle() {
    // Destructuring darkMode state and toggleDarkMode function from the custom hook
    const { darkMode, toggleDarkMode } = useDarkMode();

    return (
        // Button to toggle dark mode
        <button
            onClick={toggleDarkMode} // Calls toggleDarkMode function when clicked
            className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full" // Styling for the button
        >
            {/* Displaying different icons based on the darkMode state */}
            {darkMode ? '🌙' : '☀️'}
        </button>
    );
}
