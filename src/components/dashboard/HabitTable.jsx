'use client';
import React, { useState, useEffect } from 'react';
import { useUserData } from '@/contexts/UserContext';
import { db } from '@/lib/firebase/firebaseInit';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { UseAuth } from '@/contexts/AuthContext';
import { convertToFormat, incrementDate, convertToWords, convertToWeekdayNum } from '@/lib/utils/dateUtils';

const HabitTable = () => {
    const [habits, setHabits] = useState([]);
    const { user } = UseAuth();
    const { isUserDataLoaded } = useUserData();
    const [thisDate, setThisDate] = useState(new Date());

    useEffect(() => {
        if (user && isUserDataLoaded) {
            const habitsRef = collection(db, `/users/${user.uid}/habits`);
            const q = query(habitsRef);

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const habitsData = [];
                querySnapshot.forEach((doc) => {
                    const habit = doc.data();
                    habitsData.push({
                        name: habit.name,
                        color: habit.color,
                        activeDays: habit.activeDays,
                        completeDays: habit.completeDays,
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
            <div className='flex flex-row justify-between items-center mb-4'>
                <button onClick={() => setThisDate(incrementDate(thisDate, -7))} className="text-xl text-accent-light dark:text-accent-dark">&lt;</button>
                <h2 className="text-lg font-semibold text-accent-light dark:text-accent-dark">
                    {convertToWords(weekDays[0])} - {convertToWords(weekDays[6])}
                </h2>
                <button onClick={() => setThisDate(incrementDate(thisDate, 7))} className="text-xl text-accent-light dark:text-accent-dark">&gt;</button>
            </div>
                        
            <div className="flex justify-between items-center mt-6">
            {/* <span className="text-accent-light dark:text-accent-dark">Up 50% from the week before</span> */}
            <div className="w-3/4 bg-gray-200 dark:bg-background-dark rounded-full h-2.5">
                    <div
                    className="bg-blue-500 dark:bg-blue-900 h-2.5 rounded-full"
                    style={{ width: 80 }}
                    ></div>
                </div>
                <span className="text-accent-light dark:text-accent-dark">80% achieved</span>
            </div>
            
            <table className="w-full mt-6 border-collapse">
                <thead>
                    <tr>
                        <th></th>
                        {weekDays.map((day, index) => (
                            <th key={index} className="p-2 text-accent-light dark:text-accent-dark">
                                {convertToWords(day).split(',')[0]}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {habits.map((item, idx) => (
                        <tr key={idx}>
                            <td className="flex items-center p-2">
                                <span className='text-accent-light dark:text-accent-dark'>{item.name}</span>
                            </td>
                            {weekDays.map((day, dayIdx) => (
                                <td
                                    key={dayIdx}
                                    className={`p-2 ${item.activeDays.includes(convertToWeekdayNum(day)) ? item.color : ''}`}
                                >
                                    {item.completeDays.includes(convertToFormat(day))
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