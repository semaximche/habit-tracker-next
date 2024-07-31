import { Button } from '@/components/MaterialUI';
import Link from 'next/link';

export default function LoggedOutGroup() {
    return (
        <div className="flex-inital flex mr-2">
            <div className="p-2">
                <Link href="/login">
                    <Button
                        className="flex items-center gap-1 rounded-full"
                        color="white"
                        variant="outlined"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-4"
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
        </div>
    );
}
