'use client';
import React, { useState } from 'react';
import HabitTable from './HabitTable';
import Habits from './Habits';

const HabitTracker = () => {
    const [week, setWeek] = useState('Mon, Dec 14 - Sun, Dec 20');

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

    const progress = 86; // Example progress

    const updateCompletedDays = (updatedHabit) => {
        setHabits(updatedHabit);
    };

    const addHabit = (newHabit) => {
        console.log(newHabit);
        setHabits((prevHabits) => [...prevHabits, newHabit]);
        console.log(habits);
    };

    return (
        <div className="h-8">
            <div className="grid lg:grid-cols-3">
                <div className="col-span-2 min-h-60 bg-white m-2 p-6 rounded-lg shadow-lg hidden lg:block">
                    <div className="flex justify-between items-center">
                        <button className="text-xl">&lt;</button>
                        <h2 className="text-xl font-semibold">{week}</h2>
                        <button className="text-xl">&gt;</button>
                    </div>
                    <div className="flex justify-between items-center mt-6">
                        <span>Up 50% from the week before</span>
                        <div className="w-3/4 bg-gray-200 rounded-full h-2.5">
                            <div
                                className="bg-blue-500 h-2.5 rounded-full"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <span>{progress}% achieved</span>
                    </div>
                    <HabitTable habits={habits} />
                </div>
                <div className="min-h-60 m-2 p-6 bg-white rounded-lg shadow-lg">
                    <Habits
                        statuses={habits}
                        updateCompletedDays={updateCompletedDays}
                        addHabit={addHabit}
                    />
                </div>
            </div>
        </div>
    );
};

export default HabitTracker;
