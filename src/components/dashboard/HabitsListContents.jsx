'use client';

import { useUserData } from '@/contexts/UserContext';
import HabitItem from './HabitItem';
import { convertToFormat, convertToWeekdayWords } from '@/lib/utils/dateUtils';

// This component, `HabitsListContents`, displays a list of habit items for a specific date.
// It retrieves user data and habits from context and sorts them by their status: 
// active habits first, then completed habits, and finally inactive habits. 
// The list filters out hidden habits before rendering each habit item using the `HabitItem` component, 
// passing relevant data like the habit's name, color, completed days, active days, the current date, and category.

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
