'use client';
import React, { useState } from 'react';
import Habit from './Habit';
import HabitForm from './HabitForm';
import { Button } from '@headlessui/react';

const Habits = ({ statuses, updateCompletedDays, addHabit }) => {
    const [isModalOpened, setIsModalOpened] = useState(false);

    const closeModal = () => {
        setIsModalOpened(false);
    };

    const handleMarkComplete = (habit) => {
        const updatedHabits = statuses.map((h) => {
            if (h.name === habit.name) {
                const currentDay = new Date().getDay();
                return {
                    ...h,
                    completedDays: h.completedDays.includes(currentDay)
                        ? h.completedDays.filter((day) => day !== currentDay)
                        : [...h.completedDays, currentDay],
                };
            }
            return h;
        });
        updateCompletedDays(updatedHabits);
    };

    const getCurrentDay = () => {
        const date = new Date();
        const options = { weekday: 'short', month: 'long', day: '2-digit' };
        return date.toLocaleDateString('en-US', options);
    };

    const currentDay = getCurrentDay();
    const today = new Date().getDay();

    // Sort habits: active today first, then inactive
    const sortedHabits = [...statuses].sort((a, b) => {
        const isActiveTodayA = a.Active_days.includes(today);
        const isActiveTodayB = b.Active_days.includes(today);
        return isActiveTodayB - isActiveTodayA;
    });

    return (
        <div className="bg-white rounded-lg shadow-md p-6 w-full">
            <div className="flex justify-around">
                <h2 className="text-2xl font-bold mb-4">{currentDay}</h2>
                <button
                    className="group cursor-pointer outline-none hover:rotate-90 duration-300"
                    title="Add New"
                    onClick={() => setIsModalOpened(true)}
                >
                    <svg
                        className="stroke-teal-500 fill-none group-hover:fill-teal-800 group-active:stroke-teal-200 group-active:fill-teal-600 group-active:duration-0 duration-300"
                        viewBox="0 0 24 24"
                        height="50px"
                        width="50px"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeWidth="1.5"
                            d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                        ></path>
                        <path strokeWidth="1.5" d="M8 12H16"></path>
                        <path strokeWidth="1.5" d="M12 16V8"></path>
                    </svg>
                </button>
            </div>

            <div className="h-2/3 overflow-y-auto custom-scrollbar">
                {sortedHabits.map((habit, index) => {
                    const isActiveToday = habit.Active_days.includes(today);
                    const isCompletedToday =
                        habit.completedDays.includes(today);
                    let status = isActiveToday
                        ? isCompletedToday
                            ? 'Completed'
                            : 'Pending'
                        : `Inactive on ${new Date().toLocaleDateString('en-US', { weekday: 'long' })}`;

                    return (
                        <Habit
                            key={`${habit.name}-${habit.completedDays.join(',')}`}
                            habit={habit}
                            color={habit.color}
                            onMarkComplete={
                                isActiveToday
                                    ? () => handleMarkComplete(habit)
                                    : null
                            }
                            onUndo={
                                isCompletedToday
                                    ? () => handleMarkComplete(habit)
                                    : null
                            }
                        />
                    );
                })}
            </div>
            <HabitForm
                closeModal={closeModal}
                isModalOpen={isModalOpened}
                addNewHabit={addHabit}
            />
        </div>
    );
};

export default Habits;
