'use client';

import { useUserData } from '@/contexts/UserContext';
import HabitItem from './HabitItem';
import { convertToFormat, convertToWeekdayWords } from '@/lib/utils/dateUtils';

export default function HabitsListContents({ date }) {
    const { userData } = useUserData();
    const habitsGroup = userData.habits;

    // Sort habits by active -> complete -> inactive
    const sortedHabits = Object.keys(habitsGroup).sort((a, b) => {
        const isActiveA = habitsGroup[a].activeDays.includes(
            convertToWeekdayWords(date)
        );
        const isActiveB = habitsGroup[b].activeDays.includes(
            convertToWeekdayWords(date)
        );
        const isCompletedA = habitsGroup[a].completeDays.includes(
            convertToFormat(date)
        );
        const isCompletedB = habitsGroup[b].completeDays.includes(
            convertToFormat(date)
        );

        if (isActiveA !== isActiveB) return isActiveB - isActiveA;
        if (isCompletedA !== isCompletedB) return isCompletedB - isCompletedA;
        return 0;
    });

    return (
        <div key={date}>
            {sortedHabits
                .filter((habit) => !habitsGroup[habit].isHidden) // Filter out hidden habits
                .map((habit, index) => {
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
                })}
        </div>
    );
}
