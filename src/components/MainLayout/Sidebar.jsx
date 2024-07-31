'use client'
import {
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemPrefix,
} from '@/components/MaterialUI';
import Link from 'next/link';

export default function Sidebar({ sidebarOpen, toggleSidebar}) {
    return (
        <Drawer open={sidebarOpen} onClose={toggleSidebar} className="p-4 bg-secondary-light dark:bg-secondary-dark">
                <div className="mb-6 flex items-center">
                    <IconButton
                        variant="text"
                        color="blue-gray"
                        onClick={toggleSidebar}
                        className='hover:bg-blue-gray-100 dark:hover:bg-primary-dark'
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5 text-accent-light dark:text-accent-dark"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </IconButton>
                    <h1 className="text-accent-light dark:text-accent-dark font-bold text-xl ml-3">
                        Habit Tracker
                    </h1>
                </div>
                <List>
                    <Link href="/">
                        <ListItem onClick={toggleSidebar} className='hover:bg-blue-gray-100 dark:hover:bg-primary-dark'>
                            <ListItemPrefix>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 text-accent-light dark:text-accent-dark">
                                <path fillRule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clipRule="evenodd" />
                            </svg>
                            </ListItemPrefix>
                            <p className='text-accent-light dark:text-accent-dark'>Home</p>
                        </ListItem>
                    </Link>
                </List>
            </Drawer>
    )
}