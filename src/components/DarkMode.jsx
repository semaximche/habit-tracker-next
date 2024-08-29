'use client';
import { useDarkMode } from '@/contexts/DarkModeContext'; // Ensure this path is correct

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
