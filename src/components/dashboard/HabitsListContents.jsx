'use client';

import { useUserData } from '@/contexts/UserContext';
import HabitItem from './HabitItem';
import { convertToFormat, convertToWeekdayWords } from '@/lib/utils/dateUtils';

export default function HabitsListContents({ date }) {
    // Get user data, including habits, from the UserContext
    const { userData } = useUserData();
    const habitsGroup = userData.habits;

    // Sort habits by their status: active, complete, then inactive
    const sortedHabits = Object.keys(habitsGroup).sort((a, b) => {
        // Check if habit A is active today
        const isActiveA = habitsGroup[a].activeDays.includes(
            convertToWeekdayWords(date)
        );
        // Check if habit B is active today
        const isActiveB = habitsGroup[b].activeDays.includes(
            convertToWeekdayWords(date)
        );
        // Check if habit A is completed today
        const isCompletedA = habitsGroup[a].completeDays.includes(
            convertToFormat(date)
        );
        // Check if habit B is completed today
        const isCompletedB = habitsGroup[b].completeDays.includes(
            convertToFormat(date)
        );

        // Sort habits by active status first, then by completion status
        if (isActiveA !== isActiveB) return isActiveB - isActiveA;
        if (isCompletedA !== isCompletedB) return isCompletedB - isCompletedA;
        return 0;
    });

    return (
        <div key={date}>
            {sortedHabits
                // Filter out habits that are hidden
                .filter((habit) => !habitsGroup[habit].isHidden)
                // Map through sorted habits and render HabitItem components
                .map((habit, index) => {
                    // Check if the habit is completed today
                    const isCompletedToday = habitsGroup[habit].completeDays.includes(
                        convertToFormat(date)
                    );
                    // Check if the habit is active today
                    const isActiveToday = habitsGroup[habit].activeDays.includes(
                        convertToWeekdayWords(date)
                    );
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
