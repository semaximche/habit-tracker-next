'use client'
import React from 'react';

const Habit = ({ name, status, color, onMarkComplete, onUndo }) => {
  const isInactive = status.startsWith('Inactive');
  const isCompleted = status === 'Completed';
  const isPending = status === 'Pending';

  const getTextColor = () => {
    if (isInactive) return 'text-gray-500';
    if (isCompleted) return 'text-white';
    if (isPending) return 'text-black';
    return 'text-black'; // Default color
  };

  return (
    <div className={`flex items-center justify-between p-4 mb-2 ${isInactive ? 'bg-gray-200 text-gray-500' : isCompleted ? color : 'bg-white'} shadow-md rounded-lg`}>
      <div className="flex items-center">
        {isPending && (
          <div className="flex flex-col items-center mr-3">
            <span className={`block h-2 w-2 rounded-full ${color}`}></span>
            <span className={`block h-12 w-0.5 ${color}`}></span>
          </div>
        )}
        <div>
          <h3 className={`text-lg font-semibold ${getTextColor()}`}>{name}</h3>
          <p className={`text-sm ${getTextColor()}`}>
            {isCompleted ? '✔️' : isPending ? '🕒' : ''} {status}
          </p>
        </div>
      </div>
      <div>
        {onMarkComplete && <button onClick={onMarkComplete} className="text-blue-500">Mark Complete</button>}
        {onUndo && <button onClick={onUndo} className="text-white ml-2">Undo</button>}
      </div>
    </div>
  );
};

export default Habit;