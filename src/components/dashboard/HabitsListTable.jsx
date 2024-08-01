'use client';

import { useUserData } from '@/contexts/UserContext';
import Loading from '../loading';
import { Button } from '@/components/MaterialUI';
import HabitsListContents from './HabitsListContents';
import { useState } from 'react';
import CreateHabit from './CreateHabit';
import { convertToWords, incrementDate } from '@/lib/utils/dateUtils';

export default function HabitsListTable() {
    const { userData, isUserDataLoaded } = useUserData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [thisDate, setThisDate] = useState(new Date());
    const toggleModal = () => setIsModalOpen(!isModalOpen);

    return (
        <>
            {isUserDataLoaded ? (
                <div className="flex flex-col">
                    <div className="flex flex-row justify-between items-center">
                        <div className="pb-3">
                            <Button
                                onClick={() => {setThisDate(new Date())}}
                                size="sm"
                                color="blue-gray"
                            >
                                Today
                            </Button>
                        </div>
                        <div className='flex flex-row gap-4 mb-4 ml-1'>
                            <button onClick={() => {setThisDate(incrementDate(thisDate, -1))}} className="text-xl text-accent-light dark:text-accent-dark">&lt;</button>
                            <h2 className="text-lg font-semibold text-accent-light dark:text-accent-dark">{convertToWords(thisDate)}</h2>
                            <button onClick={() => {setThisDate(incrementDate(thisDate, 1))}} className="text-xl text-accent-light dark:text-accent-dark">&gt;</button>
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
                        <HabitsListContents date={thisDate} />
                </div>
            ) : (
                <Loading />
            )}
            <CreateHabit isModalOpen={isModalOpen} toggleModal={toggleModal} />
        </>
    );
}
