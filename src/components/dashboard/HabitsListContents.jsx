'use client'

import { useUserData } from "@/contexts/UserContext";
import HabitItem from "./HabitItem";
import { getDateNow, getWeekday } from "@/lib/utils/dateUtils";

export default function HabitsListContents() {
    // Assume userData is already loaded by parent component
    const { userData } = useUserData();
    const habitsGroup = userData.habits;

    return (
        <div>
        {
            Object.keys(habitsGroup).map((habit, index) => {
                const isCompletedToday = habitsGroup[habit].completeDays.includes(getDateNow())
                const isActiveToday = habitsGroup[habit].activeDays.includes(getWeekday())
                //List incomplete habits active today first
                if(isActiveToday && !isCompletedToday) {
                    return (
                        <div key={`${index}`}>
                            <HabitItem
                                name={habitsGroup[habit].name}
                                color={habitsGroup[habit].color}
                                completeDays={habitsGroup[habit].completeDays}
                                activeDays = {habitsGroup[habit].activeDays}
                            />
                        </div>
                    )
                //List complete habits active today second
                } else if (isActiveToday && isCompletedToday) {
                    return (
                        <div key={`${index}`}>
                            <HabitItem
                                name={habitsGroup[habit].name}
                                color={habitsGroup[habit].color}
                                completeDays={habitsGroup[habit].completeDays}
                                activeDays = {habitsGroup[habit].activeDays}
                            />
                        </div>
                    )
                //List inactive habits today last
                } else {
                    return (
                        <div key={`${index}`}>
                            <HabitItem
                                name={habitsGroup[habit].name}
                                color={habitsGroup[habit].color}
                                completeDays={habitsGroup[habit].completeDays}
                                activeDays = {habitsGroup[habit].activeDays}
                            />
                        </div>
                    )
                }
            })
        }
        </div>
    )
}