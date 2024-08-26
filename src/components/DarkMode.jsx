'use client';
import { useDarkMode } from '@/contexts/DarkModeContext'; 

// The DarkModeToggle component provides a button for users to toggle between dark mode and light mode.
// It uses the useDarkMode context to get the current mode state and the function to toggle the mode.
// The button's icon changes based on the current mode, providing a visual indication of the active state.

export default function DarkModeToggle() {
    const { darkMode, toggleDarkMode } = useDarkMode();

    return (
        <button
            onClick={toggleDarkMode}
            className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full"
        >
            {darkMode ? '🌙' : '☀️'}
        </button>
    );
}
