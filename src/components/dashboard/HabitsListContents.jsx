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
            Object.keys(habitsGroup).map((key, i) => {
                console.log("iterating over", key);
                return (
                    <div>
                        <HabitItem
                            name={habitsGroup[key].name}
                            color="bg-red-500"
                            completeDays={habitsGroup[key].completeDays}
                            activeDays = {habitsGroup[key].activeDays}
                        />
                    </div>
                )
            })
        }
        </div>
    )
}