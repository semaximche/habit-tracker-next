'use client';
import React from 'react';

const HabitStatus = ({ statuses }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 w-full md:w-1/2">
            {statuses.map((item, idx) => (
                <div
                    key={idx}
                    className={`flex items-center justify-between p-2 rounded-md mb-2 ${
                        item.completed
                            ? 'bg-green-200 text-green-700'
                            : item.status
                              ? 'bg-red-200 text-red-700'
                              : ''
                    }`}
                >
                    <span>{item.habit}</span>
                    {item.status ? (
                        <span>{item.status}</span>
                    ) : (
                        <button className="text-blue-600">Mark Complete</button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default HabitStatus;
