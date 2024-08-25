'use client';
import { createContext, useContext, useState, useEffect } from 'react';

// Create a context for dark mode
const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(false); // State to manage dark mode

    useEffect(() => {
        // On initial render, check localStorage for dark mode preference
        const isDark = localStorage.getItem('dark-mode') === 'true';
        setDarkMode(isDark);
        // Apply the dark mode class to the document if dark mode is enabled
        if (isDark) {
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        // Toggle dark mode state
        setDarkMode(!darkMode);
        // Save the new preference to localStorage
        localStorage.setItem('dark-mode', !darkMode);
        // Add or remove the dark mode class based on the new state
        if (!darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    // Provide the darkMode state and toggleDarkMode function to children
    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
}

// Custom hook to use the dark mode context
export const useDarkMode = () => useContext(DarkModeContext);
