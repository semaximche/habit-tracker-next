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

/**
 * HabitTable component displays a table of habits for the current week.
 * - Fetches user habits from Firestore, only including non-hidden habits.
 * - Allows navigation through weeks, updating the displayed date range.
 * - Displays active and completed statuses of habits for each day of the week.
 * - Applies different background colors based on habit status and dark mode preference.
 */

const HabitTable = () => {
    const [habits, setHabits] = useState([]);
    const { user } = UseAuth();
    const { isUserDataLoaded } = useUserData();
    const [thisDate, setThisDate] = useState(new Date());
    const { darkMode } = useDarkMode();

    useEffect(() => {
        // Fetch habits from Firestore when user is authenticated and data is loaded
        if (user && isUserDataLoaded) {
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
                setHabits(habitsData);
            });

            return () => unsubscribe();
        }
    }, [user, isUserDataLoaded]);

    const weekDays = Array.from({ length: 7 }, (_, i) => {
        return incrementDate(thisDate, i - thisDate.getDay());
    });

    return (
        <div>
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

            <table className="w-full mt-6">
                <thead>
                    <tr>
                        <th className="w-44"></th>
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
                    {habits.map((item, idx) => (
                        <tr key={idx}>
                            <td className="flex p-2">
                                <span className="text-accent-light dark:text-accent-dark">
                                    {item.name}
                                </span>
                            </td>
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
                                                    ? item.color //Marked complete colour
                                                    : darkMode
                                                      ? 'rgb(15, 23, 42)' //Active dark mode colour
                                                      : 'rgb(229, 231, 235)' //Active light mode colour
                                                : darkMode
                                                  ? 'rgb(25, 32, 52)' //Inactive dark mode colour
                                                  : 'rgb(209, 213, 219)', //Inactive light mode colour
                                    }}
                                >
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
