import React, { useState, useCallback } from 'react';
import HabitTable from './HabitTable';
import Habits from './Habits';

const HabitTracker = () => {
    const [week, setWeek] = useState('Mon, Dec 14 - Sun, Dec 20');
    const [habits, setHabits] = useState([
        // Your habit data here
    ]);

    const progress = 86; // Example progress

    const updateCompletedDays = useCallback((updatedHabits) => {
        setHabits(updatedHabits);
    }, []);

    const addHabit = useCallback((newHabit) => {
        setHabits(prevHabits => [...prevHabits, newHabit]);
    }, []);

    const handleMarkComplete = useCallback((habit, dayIdx) => {
        setHabits(prevHabits => prevHabits.map(h => {
            if (h.name === habit.name) {
                return {
                    ...h,
                    completedDays: h.completedDays.includes(dayIdx)
                        ? h.completedDays.filter(day => day !== dayIdx)
                        : [...h.completedDays, dayIdx],
                };
            }
            return h;
        }));
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow grid lg:grid-cols-3 gap-4 p-4">
                <div className="lg:col-span-2 bg-white rounded-lg shadow-lg overflow-auto">
                    <div className="p-6">
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
                        <HabitTable habits={habits} handleMarkComplete={handleMarkComplete} />
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg overflow-auto">
                    <div className="p-6">
                        <Habits
                            statuses={habits}
                            updateCompletedDays={updateCompletedDays}
                            addHabit={addHabit}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HabitTracker;
