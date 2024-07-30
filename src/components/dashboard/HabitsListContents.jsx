'use client';

import { useUserData } from '@/contexts/UserContext';
import HabitItem from './HabitItem';
import { getDateNow, getWeekday } from '@/lib/utils/dateUtils';

export default function HabitsListContents() {
    // Assume userData is already loaded by parent component
    const { userData } = useUserData();
    const habitsGroup = userData.habits;

    return (
        <div>
            {
                // TODO sort habits by active -> complete -> inactive before passing to function
                Object.keys(habitsGroup).map((habit, index) => {
                    const isCompletedToday =
                        habitsGroup[habit].completeDays.includes(getDateNow());
                    const isActiveToday =
                        habitsGroup[habit].activeDays.includes(getWeekday());
                    return (
                        <div key={`${index}`}>
                            <HabitItem
                                name={habitsGroup[habit].name}
                                color={habitsGroup[habit].color}
                                completeDays={habitsGroup[habit].completeDays}
                                activeDays={habitsGroup[habit].activeDays}
                            />
                        </div>
                    );
                })
            }
        </div>
    );
}
