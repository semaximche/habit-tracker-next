'use client'
import { UserAuth } from "@/contexts/AuthContext";
import LogoutButton from "../LogoutButton";

export default function Topbar() {
    const { user } = UserAuth();

    return(
        <header className="p-2 text-center flex items-center">
                <div className="flex-inital">
                    <p>left components</p>
                </div>
                <div className="flex-auto hidden sm:block">
                <h1 className="text-3xl font-bold">Good afternoon, {user.displayName.split(" ")[0]}</h1>
                <p className="text-gray-600">Have a nice day</p>
                </div>
                <div className="flex-auto block sm:hidden">
                    <h1 className="text-3xl font-bold">{user.displayName.split(" ")[0]}</h1>
                </div>
                <div className="flex-3">
                    <LogoutButton />
                </div>
        </header>
    );
};