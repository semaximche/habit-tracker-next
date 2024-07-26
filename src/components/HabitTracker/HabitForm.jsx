'use client'
import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
} from "@material-tailwind/react";

const HabitForm = ({ closeModal,isModalOpen,addNewHabit }) => {
  const [habit, setHabit] = useState('');
  const [days, setDays] = useState([false, false, false, false, false, false, false]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name: habit, color: 'bg-yellow-500', Active_days: days, completedDays: [] })
    const activeDays = days.map((isChecked, index) => isChecked ? index : null).filter(day => day !== null);
    addNewHabit({ name: habit, color: 'bg-yellow-500', Active_days: activeDays, completedDays: [] });
    setHabit('');
    setDays([false, false, false, false, false, false, false]);
    closeModal(); 
  };

  
  const toggleDay = (index) => {
    const newDays = [...days];
    newDays[index] = !newDays[index];
    setDays(newDays);
  };

  return (
    <>
      <Dialog open={isModalOpen} onClose={closeModal}>
        <DialogHeader>Add a new habit</DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Habit Name</label>
              <input
                type="text"
                value={habit}
                onChange={(e) => setHabit(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Active Days</label>
              <div className="grid grid-cols-7 gap-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                  <div key={index}>
                    <input
                      type="checkbox"
                      id={`day-${index}`}
                      checked={days[index]}
                      onChange={() => toggleDay(index)}
                      className="mr-2"
                    />
                    <label htmlFor={`day-${index}`} className="text-gray-700">{day}</label>
                  </div>
                ))}
              </div>
            </div>
            <Button type="submit" color="blue" ripple="light">
              Add Habit
            </Button>
            <Button onClick={()=>{closeModal()}} color="red" ripple="light">
              close
            </Button>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default HabitForm;
