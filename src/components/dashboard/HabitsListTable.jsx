'use client';

import React, { useState } from 'react';
import { useUserData } from '@/contexts/UserContext';
import Loading from '../loading';
import { Button, IconButton } from '@/components/MaterialUI';
import HabitsListContents from './HabitsListContents';
import CreateHabit from './CreateHabit';
import ManageHabitsVisibilityModal from './ManageHabitsVisibilityModal';
import { convertToWords, incrementDate } from '@/lib/utils/dateUtils';

export default function HabitsListTable() {
    const { userData, isUserDataLoaded } = useUserData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isManageModalOpen, setIsManageModalOpen] = useState(false);
    const [thisDate, setThisDate] = useState(new Date());

    const toggleModal = () => setIsModalOpen(!isModalOpen);
    const toggleManageModal = () => setIsManageModalOpen(!isManageModalOpen);

    return (
        <div>
            {isUserDataLoaded ? (
                <div className="flex flex-col justify-between h-fit gap-2">
                    <div className="flex flex-row justify-between items-center">
                        <div className="pb-3">
                            <Button
                                onClick={() => setThisDate(new Date())}
                                size="sm"
                                color="blue-gray"
                            >
                                Today
                            </Button>
                        </div>
                        <div className="flex flex-row gap-4 mb-4 ml-1">
                            <button
                                onClick={() => setThisDate(incrementDate(thisDate, -1))}
                                className="text-xl text-accent-light dark:text-accent-dark"
                            >
                                &lt;
                            </button>
                            <h2 className="text-lg font-semibold text-accent-light dark:text-accent-dark">
                                {convertToWords(thisDate)}
                            </h2>
                            <button
                                onClick={() => setThisDate(incrementDate(thisDate, 1))}
                                className="text-xl text-accent-light dark:text-accent-dark"
                            >
                                &gt;
                            </button>
                        </div>
                        <div className="pb-3 flex gap-2">
                            <Button
                                onClick={toggleModal}
                                size="sm"
                                color="blue-gray"
                            >
                                Add Habit
                            </Button>
                        
                        </div>
                    </div>
                    <HabitsListContents date={thisDate} />
                    <div className="flex justify-end">
                        <IconButton onClick={toggleManageModal} size="sm" color="blue-gray">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>
                        </IconButton>
                    </div>
                    <ManageHabitsVisibilityModal isOpen={isManageModalOpen} onClose={toggleManageModal} />
                </div>
            ) : (
                <Loading />
            )}
            <CreateHabit isModalOpen={isModalOpen} toggleModal={toggleModal} />
        </div>
    );
}