'use client'

import { useUserData } from "@/contexts/UserContext";
import HabitItem from "./HabitItem";

export default function HabitsListContents() {
    // Assume userData is already loaded by parent component
    const { userData, isUserDataLoaded } = useUserData();
    const habitsGroup = userData.habits;

    return (
        <div>
        {
            Object.keys(habitsGroup).map((habit, index) => {
                console.log("iterating over", habit);
                return (
                    <div key={`${index}`}>
                        <HabitItem
                            name={habitsGroup[habit].name}
                            color="bg-red-500"
                            completeDays={habitsGroup[habit].completeDays}
                            activeDays = {habitsGroup[habit].activeDays}
                        />
                    </div>
                )
            })
        }
        </div>
    )
}