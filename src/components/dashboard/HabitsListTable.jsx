'use client';

import { useUserData } from '@/contexts/UserContext';
import Loading from '../loading';
import { getDateWords } from '@/lib/utils/dateUtils';
import { Button } from '@/components/MaterialUI';
import HabitsListContents from './HabitsListContents';
import { useState } from 'react';
import CreateHabit from './CreateHabit';

export default function HabitsListTable() {
    const { userData, isUserDataLoaded } = useUserData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => setIsModalOpen(!isModalOpen);

    return (
        <>
            {isUserDataLoaded ? (
                <div className="flex flex-col">
                    <div className="flex flex-row justify-between items-center">
                        <div className='flex flex-row gap-4 mb-4 ml-1'>
                            <button className="text-xl text-accent-light dark:text-accent-dark">&lt;</button>
                            <h2 className="text-lg font-semibold text-accent-light dark:text-accent-dark">{getDateWords()}</h2>
                            <button className="text-xl text-accent-light dark:text-accent-dark">&gt;</button>
                        </div>
                        <div className="pb-3">
                            <Button
                                onClick={toggleModal}
                                size="sm"
                                color="blue-gray"
                            >
                                Add Habit
                            </Button>
                        </div>
                    </div>
                    <HabitsListContents />
                </div>
            ) : (
                <Loading />
            )}
            <CreateHabit isModalOpen={isModalOpen} toggleModal={toggleModal} />
        </>
    );
}
