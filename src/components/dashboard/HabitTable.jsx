'use client';
import React, { useState, useEffect } from 'react';
import { useUserData } from '@/contexts/UserContext';
import { db } from '@/lib/firebase/firebaseInit';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { UseAuth } from '@/contexts/AuthContext';
import {
    convertToFormat,
    incrementDate,
    convertToWords,
    convertToWeekdayNum,
} from '@/lib/utils/dateUtils';
import { useDarkMode } from '@/contexts/DarkModeContext';

const HabitTable = () => {
    const [habits, setHabits] = useState([]); // State to store the habits fetched from Firebase
    const { user } = UseAuth(); // Accessing the authenticated user from the AuthContext
    const { isUserDataLoaded } = useUserData(); // Checking if user data is loaded from UserContext
    const [thisDate, setThisDate] = useState(new Date()); // State to track the current date
    const { darkMode } = useDarkMode(); // Accessing dark mode preference from DarkModeContext

    useEffect(() => {
        if (user && isUserDataLoaded) {
            // Fetch habits from Firebase once user data is loaded
            const habitsRef = collection(db, `/users/${user.uid}/habits`);
            const q = query(habitsRef, where('isHidden', '==', false)); // Only fetch non-hidden habits

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const habitsData = [];
                querySnapshot.forEach((doc) => {
                    const habit = doc.data();
                    habitsData.push({
                        id: doc.id,
                        name: habit.name,
                        color: habit.color,
                        activeDays: habit.activeDays,
                        completeDays: habit.completeDays,
                        category: habit.category,
                        isHidden: habit.isHidden,
                    });
                });
                setHabits(habitsData); // Update the habits state with the fetched data
            });

            return () => unsubscribe(); // Cleanup the subscription on component unmount
        }
    }, [user, isUserDataLoaded]);

    // Calculate the week days based on the current date (thisDate)
    const weekDays = Array.from({ length: 7 }, (_, i) => {
        return incrementDate(thisDate, i - thisDate.getDay());
    });

    return (
        <div>
            {/* Date navigation: allows switching between weeks */}
            <div className="flex flex-row justify-between items-center mb-4">
                <button
                    onClick={() => setThisDate(incrementDate(thisDate, -7))}
                    className="text-xl text-accent-light dark:text-accent-dark"
                >
                    &lt;
                </button>
                <h2 className="text-lg font-semibold text-accent-light dark:text-accent-dark">
                    {convertToWords(weekDays[0])} -{' '}
                    {convertToWords(weekDays[6])}
                </h2>
                <button
                    onClick={() => setThisDate(incrementDate(thisDate, 7))}
                    className="text-xl text-accent-light dark:text-accent-dark"
                >
                    &gt;
                </button>
            </div>

            {/* Habit table displaying the habits for the week */}
            <table className="w-full mt-6">
                <thead>
                    <tr>
                        <th className="w-44"></th>
                        {/* Display the days of the week as table headers */}
                        {weekDays.map((day, index) => (
                            <th
                                key={index}
                                className="p-2 text-accent-light dark:text-accent-dark"
                            >
                                {convertToWords(day).split(',')[0]}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {/* Display each habit in a row */}
                    {habits.map((item, idx) => (
                        <tr key={idx}>
                            <td className="flex p-2">
                                <span className="text-accent-light dark:text-accent-dark">
                                    {item.name}
                                </span>
                            </td>
                            {/* Display each day's status (active/inactive, complete/incomplete) */}
                            {weekDays.map((day, dayIdx) => (
                                <td
                                    key={dayIdx}
                                    className={`border-gray-400 border-2 p-2 text-center`}
                                    style={{
                                        backgroundColor:
                                            item.activeDays.includes(
                                                convertToWeekdayNum(day)
                                            )
                                                ? item.completeDays.includes(
                                                      convertToFormat(day)
                                                  )
                                                    ? item.color // Marked complete color
                                                    : darkMode
                                                      ? 'rgb(15, 23, 42)' // Active dark mode color
                                                      : 'rgb(229, 231, 235)' // Active light mode color
                                                : darkMode
                                                  ? 'rgb(25, 32, 52)' // Inactive dark mode color
                                                  : 'rgb(209, 213, 219)', // Inactive light mode color
                                    }}
                                >
                                    {/* Display a checkmark if the habit is complete for that day */}
                                    {item.completeDays.includes(
                                        convertToFormat(day)
                                    )
                                        ? '✔️'
                                        : ''}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HabitTable;
