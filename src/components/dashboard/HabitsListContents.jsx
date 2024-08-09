'use client';

import { useUserData } from '@/contexts/UserContext';
import HabitItem from './HabitItem';
import { convertToFormat, convertToWeekdayWords } from '@/lib/utils/dateUtils';

export default function HabitsListContents({ date }) {
    const { userData } = useUserData();
    const habitsGroup = userData.habits;

    return (
        <div key={date}>
            {
                // TODO sort habits by active -> complete -> inactive before passing to function
                Object.keys(habitsGroup).map((habit, index) => {
                    const isCompletedToday = habitsGroup[
                        habit
                    ].completeDays.includes(convertToFormat(date));
                    const isActiveToday = habitsGroup[
                        habit
                    ].activeDays.includes(convertToWeekdayWords(date));
                    return (
                        <div key={`${index}-${habit}-${date}`}>
                            <HabitItem
                                name={habitsGroup[habit].name}
                                color={habitsGroup[habit].color}
                                completeDays={habitsGroup[habit].completeDays}
                                activeDays={habitsGroup[habit].activeDays}
                                thisDate={date}
                                category={habitsGroup[habit].category}
                            />
                        </div>
                    );
                })
            }
        </div>
    );
}
