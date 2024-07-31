'use client';
import Link from 'next/link';
import LoginSignupGroup from './LoginSignupGroup';
import { UseAuth } from '@/contexts/AuthContext';
import UserSignoutGroup from './UserSignoutGroup';
import React, { useState } from 'react';
import {
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemPrefix,
} from '@/components/MaterialUI';

export default function Topbar() {
    const { user, isUserLoaded } = UseAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <>
            <div
                id="topbar-overlay-ref"
                className="bg-blue-gray-500 dark:bg-gray-800 shadow-xl flex items-center"
            >
                <IconButton
                    onClick={toggleSidebar}
                    variant="outlined"
                    color="white"
                    size="xs"
                    className="ml-4 dark:text-gray-300"
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
                    className="text-white dark:text-gray-300 font-bold text-2xl m-5 hidden sm:block"
                >
                    Habit Tracker
                </Link>
                <div className="flex-auto"></div>
                {isUserLoaded ? (
                    user ? (
                        <UserSignoutGroup />
                    ) : (
                        <LoginSignupGroup />
                    )
                ) : (
                    <></>
                )}
            </div>
            <Drawer open={sidebarOpen} onClose={toggleSidebar} className="p-4 dark:bg-gray-900">
                <div className="mb-6 flex items-center">
                    <IconButton
                        variant="text"
                        color="blue-gray"
                        onClick={toggleSidebar}
                        className="dark:text-gray-300"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </IconButton>
                    <h1 className="text-blue-gray-500 dark:text-gray-300 font-bold text-xl ml-3">
                        Habit Tracker
                    </h1>
                </div>
                <List>
                    <Link href="/">
                        <ListItem className="dark:text-gray-300">
                            <ListItemPrefix>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-5 w-5 dark:text-gray-300"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </ListItemPrefix>
                            Dashboard
                        </ListItem>
                    </Link>
                    <Link href="/">
                        <ListItem className="dark:text-gray-300">
                            <ListItemPrefix>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="size-5 dark:text-gray-300"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </ListItemPrefix>
                            Profile
                        </ListItem>
                    </Link>
                    <Link href="/">
                        <ListItem className="dark:text-gray-300">
                            <ListItemPrefix>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="size-5 dark:text-gray-300"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M8.34 1.804A1 1 0 0 1 9.32 1h1.36a1 1 0 0 1 .98.804l.295 1.473c.497.144.971.342 1.416.587l1.25-.834a1 1 0 0 1 1.262.125l.962.962a1 1 0 0 1 .125 1.262l-.834 1.25c.245.445.443.919.587 1.416l1.473.294a1 1 0 0 1 .804.98v1.361a1 1 0 0 1-.804.98l-1.473.295a6.95 6.95 0 0 1-.587 1.416l.834 1.25a1 1 0 0 1-.125 1.262l-.962.962a1 1 0 0 1-1.262.125l-1.25-.834a6.953 6.953 0 0 1-1.416.587l-.294 1.473a1 1 0 0 1-.98.804H9.32a1 1 0 0 1-.98-.804l-.295-1.473a6.957 6.957 0 0 1-1.416-.587l-1.25.834a1 1 0 0 1-1.262-.125l-.962-.962a1 1 0 0 1-.125-1.262l.834-1.25a6.957 6.957 0 0 1-.587-1.416l-1.473-.294A1 1 0 0 1 1 10.68V9.32a1 1 0 0 1 .804-.98l1.473-.295c.144-.497.342-.971.587-1.416l-.834-1.25a1 1 0 0 1 .125-1.262l.962-.962a1 1 0 0 1 1.262-.125l1.25.834c.445-.245.919-.443 1.416-.587l.294-1.473ZM10 13.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </ListItemPrefix>
                            Settings
                        </ListItem>
                    </Link>
                </List>
            </Drawer>
        </>
    );
}
