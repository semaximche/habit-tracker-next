'use client';
import React from 'react';

const Habit = ({ habit, color, onMarkComplete, onUndo }) => {
    const today = new Date().getDay();
    const isActiveToday = habit.Active_days.includes(today);
    const isCompletedToday = habit.completedDays.includes(today);
    const isInactive = !isActiveToday;
    const isPending = isActiveToday && !isCompletedToday;

    const getTextColor = () => {
        if (isInactive) return 'text-gray-500';
        return isCompletedToday ? 'text-white' : 'text-black';
    };

    let status;
    if (isInactive) {
        status = `Inactive on ${new Date().toLocaleDateString('en-US', { weekday: 'long' })}`;
    } else if (isCompletedToday) {
        status = 'Completed';
    } else {
        status = 'Pending';
    }

    return (
        <div
            className={`flex items-center justify-between p-4 mb-2 ${isInactive ? 'bg-gray-200 text-gray-500' : isCompletedToday ? color : 'bg-white'} shadow-md rounded-lg`}
        >
            <div className="flex items-center">
                {isPending && (
                    <div className="flex flex-col items-center mr-3">
                        <span className={`block h-2 w-2 rounded-full ${color}`}></span>
                        <span className={`block h-12 w-0.5 ${color}`}></span>
                    </div>
                )}
                <div>
                    <h3 className={`text-lg font-semibold ${getTextColor()}`}>
                        {habit.name}
                    </h3>
                    <p className={`text-sm ${getTextColor()}`}>
                        {isCompletedToday ? '✔️' : isPending ? '🕒' : ''} {status}
                    </p>
                </div>
            </div>
            <div>
                {onMarkComplete && !isCompletedToday && (
                    <button onClick={onMarkComplete} className="text-blue-500">
                        Mark Complete
                    </button>
                )}
                {onUndo && isCompletedToday && (
                    <button onClick={onUndo} className="text-white ml-2">
                        Undo
                    </button>
                )}
            </div>
        </div>
    );
};

export default Habit;