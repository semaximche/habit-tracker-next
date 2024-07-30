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
                        <h2 className="text-2xl font-bold m-3">
                            {getDateWords()}
                        </h2>
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
