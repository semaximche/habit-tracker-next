'use client';
import React, { useState } from 'react';

const HabitTable = () => {
    const [habits, setHabits] = useState([
        {
            name: '💪 Exercise',
            color: 'bg-yellow-500',
            Active_days: [1, 3, 5, null, null, null, null],
            completedDays: [],
        },
        {
            name: '📝 Journal',
            color: 'bg-purple-500',
            Active_days: [0, 2, 4, null, null, null, null],
            completedDays: [],
        },
        {
            name: '❌ Alcohol',
            color: 'bg-pink-500',
            Active_days: [1, null, null, null, null, null, null],
            completedDays: [],
        },
        {
            name: '🚿 Cold Shower',
            color: 'bg-blue-500',
            Active_days: [0, null, null, null, null, null],
            completedDays: [],
        },
        {
            name: '🦷 Floss',
            color: 'bg-gray-500',
            Active_days: [0, 2, 4, 6, null, null, null],
            completedDays: [],
        },
        {
            name: '🧘 Meditate',
            color: 'bg-orange-500',
            Active_days: [1, 3, 5, null, null, null, null],
            completedDays: [],
        },
        {
            name: '🎧 eBook',
            color: 'bg-teal-500',
            Active_days: [1, 2, 3, 4, 5, null, null],
            completedDays: [],
        },
        {
            name: 'Run',
            color: 'bg-red-500',
            Active_days: [0, 2, 4, null, null, null, null],
            completedDays: [],
        },
        {
            name: 'Read',
            color: 'bg-green-500',
            Active_days: [0, 3, 6, null, null, null, null],
            completedDays: [],
        },
        {
            name: 'Cook',
            color: 'bg-indigo-500',
            Active_days: [1, 2, 3, null, null, null, null],
            completedDays: [],
        },
    ]);

    return (
        <table className="w-full mt-6 border-collapse">
            <thead>
                <tr>
                    <th></th>
                    <th className="p-2">Sun</th>
                    <th className="p-2">Mon</th>
                    <th className="p-2">Tue</th>
                    <th className="p-2">Wed</th>
                    <th className="p-2">Thu</th>
                    <th className="p-2">Fri</th>
                    <th className="p-2">Sat</th>
                </tr>
            </thead>
            <tbody>
                {habits.map((item, idx) => (
                    <tr key={idx}>
                        <td className="flex items-center p-2">
                            <span>{item.name.split(' ')[0]}</span>
                            <span className="ml-2">
                                {item.name.split(' ')[1]}
                            </span>
                        </td>
                        {Array.from({ length: 7 }).map((_, dayIdx) => (
                            <td
                                key={dayIdx}
                                className={`p-2 ${item.Active_days.includes(dayIdx) ? item.color : ''}`}
                            >
                                {item.completedDays.includes(dayIdx)
                                    ? '✔️'
                                    : ''}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default HabitTable;
