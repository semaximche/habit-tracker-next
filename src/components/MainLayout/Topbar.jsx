'use client';
import Link from 'next/link';
import LoggedOutGroup from './LoggedOutGroup';
import { UseAuth } from '@/contexts/AuthContext';
import UserGroup from './UserGroup';
import React, { useState } from 'react';
import { IconButton } from '@/components/MaterialUI';
import { useDarkMode } from '@/contexts/DarkModeContext';
import Loading from '../loading';
import Sidebar from './Sidebar';

export default function Topbar() {
    const { user, isUserLoaded } = UseAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { darkMode, toggleDarkMode } = useDarkMode();

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <>
            <div
                id="topbar-overlay-ref"
                className="bg-primary-light dark:bg-primary-dark shadow-xl flex items-center"
            >
                <IconButton
                    onClick={toggleSidebar}
                    variant="outlined"
                    color="white"
                    size="xs"
                    className="ml-4"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-5"
                    >
                        <path
                            fillRule="evenodd"
                            d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </IconButton>
                <Link
                    href="/"
                    className="text-white font-bold text-xl m-5 hidden sm:block"
                >
                    Habit Tracker
                </Link>

                <div className="flex-auto"></div>
                {isUserLoaded ? (
                    user ? (
                        <UserGroup />
                    ) : (
                        <LoggedOutGroup />
                    )
                ) : (
                    <Loading />
                )}
                <IconButton variant='outlined' color='white' className='rounded-full mr-5' onClick={toggleDarkMode}>
                {darkMode ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                        <path fillRule="evenodd" d="M7.455 2.004a.75.75 0 0 1 .26.77 7 7 0 0 0 9.958 7.967.75.75 0 0 1 1.067.853A8.5 8.5 0 1 1 6.647 1.921a.75.75 0 0 1 .808.083Z" clipRule="evenodd" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                        <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
                    </svg>
                )}
                </IconButton>
            </div>
            <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        </>
    );
}
