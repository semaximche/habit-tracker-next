'use client';
import { Button } from '@/components/MaterialUI';
import Link from 'next/link';
import DarkModeToggle from '@/components/DarkMode';

export default function LoginSignupGroup() {
    return (
        <div className="flex-initial flex">
            <DarkModeToggle />
            <div className="p-2">
                <Link href="/login">
                    <Button
                        className="flex items-center gap-1 dark:bg-gray-800 dark:text-white"
                        color="white"
                        variant="outlined"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                            />
                        </svg>
                        Login
                    </Button>
                </Link>
            </div>
            <div className="p-2">
                <Link href="/signup">
                    <Button
                        className="flex items-center gap-1 dark:bg-gray-800 dark:text-white"
                        color="white"
                        variant="outlined"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                            />
                        </svg>
                        Signup
                    </Button>
                </Link>
            </div>
        </div>
    );
}
