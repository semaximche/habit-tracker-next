'use client'

import { useUserData } from "@/contexts/UserContext"

export default function HabitsList() {
    const { userdata } = useUserData()

    return (
        <div>
            { userdata }
        </div>
    )
}