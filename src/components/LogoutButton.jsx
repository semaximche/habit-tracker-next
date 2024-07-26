'use client'
import { UserAuth } from "@/contexts/AuthContext";
import { signOut } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutButton() {
    const { user } = UserAuth();
    const router = useRouter();

    //Redirect to home after logging out
    useEffect(() => {
        if(user === null) {
            router.push("/");
        }
    }, [user])

    return (
        <button className="mt-4 rounded-lg border bg-white shadow-md hover:bg-gray-100" onClick={signOut}>
                        <div className="flex w-full justify-center px-5 py-3">
                            <div className="flex w-full justify-center">
                                <h1 className="whitespace-nowrap font-bold text-red-600">
                                    Log out
                                </h1>
                            </div>
                        </div>
                    </button>
    )
}