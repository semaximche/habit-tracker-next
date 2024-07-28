'use client';
import React from 'react';

const HabitTable = ({ habits, handleMarkComplete }) => {
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
                                onClick={() => handleMarkComplete(item, dayIdx)}
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
