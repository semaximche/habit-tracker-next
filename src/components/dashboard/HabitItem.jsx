import React from 'react';
import { UseAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase/firebaseInit';
import {
    convertToFormat,
    convertToWeekdayWords,
    convertToWeekdayNum,
} from '@/lib/utils/dateUtils';
import { Button } from '@/components/MaterialUI';
import {
    arrayRemove,
    arrayUnion,
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    updateDoc,
    where,
    Timestamp,
} from 'firebase/firestore';

// Helper Functions
// Function to format the current date
function getTodayFormatted() {
    const today = new Date();
    return convertToFormat(today);
}

// Function to format the previous day's date
function getYesterdayFormatted() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return convertToFormat(yesterday);
}

// Function to format the next day's date
function getTomorrowFormatted() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return convertToFormat(tomorrow);
}

export default function HabitItem({
    name,
    color,
    completeDays,
    activeDays,
    thisDate,
    category,
}) {
    const isCompletedToday = completeDays.includes(convertToFormat(thisDate));
    const isActiveToday = activeDays.includes(convertToWeekdayNum(thisDate));
    const { user } = UseAuth();
    const isToday = convertToFormat(thisDate) === getTodayFormatted();
    const isTomorrow = convertToFormat(thisDate) === getTomorrowFormatted();
    const isYesterday = convertToFormat(thisDate) === getYesterdayFormatted();

    // Function to mark the habit as completed for the current day
    const handleComplete = async () => {
        const itemQuery = query(
            collection(db, `/users/${user?.uid}/habits`),
            where('name', '==', name),
            where('category', '==', category)
        );

        const docIds = [];
        const querySnapshot = await getDocs(itemQuery);
        querySnapshot.forEach((doc) => {
            docIds.push(doc.id);
        });

        if (docIds.length > 0) {
            const itemRef = doc(db, `/users/${user?.uid}/habits`, docIds[0]);
            await updateDoc(itemRef, {
                completeDays: arrayUnion(convertToFormat(thisDate)),
                lastCompleted: Timestamp.now(),
            });
        }
    };

    // Function to undo the habit completion for the current day
    const handleUndo = async () => {
        const itemQuery = query(
            collection(db, `/users/${user?.uid}/habits`),
            where('name', '==', name)
        );
        const docIds = [];
        const querySnapshot = await getDocs(itemQuery);
        querySnapshot.forEach((doc) => {
            docIds.push(doc.id);
        });
        if (docIds.length > 0) {
            const itemRef = doc(db, `/users/${user?.uid}/habits`, docIds[0]);
            updateDoc(itemRef, {
                completeDays: arrayRemove(convertToFormat(thisDate)),
            });
        }
    };

    // Function to delete the habit from the database
    const handleDelete = async () => {
        const itemQuery = query(
            collection(db, `/users/${user?.uid}/habits`),
            where('name', '==', name)
        );
        const docIds = [];
        const querySnapshot = await getDocs(itemQuery);
        querySnapshot.forEach((doc) => {
            docIds.push(doc.id);
        });
        if (docIds.length > 0) {
            const itemRef = doc(db, `/users/${user?.uid}/habits`, docIds[0]);
            deleteDoc(itemRef);
        }
    };

    // Disable the button if the date is not today, tomorrow, or yesterday
    const isDisabled = !isToday && !isTomorrow && !isYesterday;

    // Determine button classes based on the disabled state
    const buttonClasses = `text-sm mt-3 bg-black hover:bg-gray-700 hover:shadow-md bg-opacity-30 text-white py-1 px-2 rounded duration-150 ${
        isDisabled ? 'cursor-not-allowed opacity-50' : ''
    }`;

    return (
        <>
            {isActiveToday ? (
                isCompletedToday ? (
                    // If the habit is active and complete for today
                    <div
                        className={`flex items-center justify-between shadow-md rounded-lg mb-2 h-16 pl-2 transition-all`}
                        style={{ backgroundColor: color }}
                    >
                        <div className="flex-initial flex flex-col items-center mr-3">
                            <span
                                className={`block h-2 w-2 rounded-full`}
                                style={{ backgroundColor: color }}
                            ></span>
                            <span
                                className={`block h-8 w-0.5`}
                                style={{ backgroundColor: color }}
                            ></span>
                        </div>

                        <div className="flex-initial">
                            <h3 className="font-bold text-white text-md">
                                {name}
                            </h3>
                            <p className="text-gray-100 text-sm">✔ Complete</p>
                            <p className="text-gray-200 text-xs">{category}</p>
                        </div>

                        <div className="flex-auto">
                            <Button
                                onClick={handleUndo}
                                className="xl:ml-16"
                                variant="text"
                                color="white"
                                ripple={false}
                            >
                                Undo
                            </Button>
                        </div>

                        <button
                            onClick={handleDelete}
                            className={`flex-3 flex h-full overflow-hidden rounded-lg items-center justify-center transition-all w-8 hover:w-16 hover:bg-red-500 dark:hover:bg-red-700`}
                            style={{ backgroundColor: color }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="white"
                                className="size-6 flex-none"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                            </svg>
                        </button>
                    </div>
                ) : (
                    // If the habit is active but not yet completed
                    <div className="flex items-center justify-between shadow-md rounded-lg bg-gray-50 dark:bg-background-dark mb-2 h-16 pl-2 transition-all">
                        <div className="flex-initial flex flex-col items-center mr-3">
                            <span
                                className={`block h-2 w-2 rounded-full`}
                                style={{ backgroundColor: color }}
                            ></span>
                            <span
                                className={`block h-8 w-0.5`}
                                style={{ backgroundColor: color }}
                            ></span>
                        </div>
                        <div className="flex-initial">
                            <h3 className="font-bold text-md text-accent-light dark:text-accent-dark">
                                {name}
                            </h3>
                            <p className="text-gray-400 dark:text-gray-00 text-sm">
                                🕒 Pending
                            </p>
                            <p className="text-gray-200 text-xs">{category}</p>
                        </div>
                        <div className="flex-auto dark:text-blue-800">
                            <Button
                                onClick={handleComplete}
                                className="xl:ml-16"
                                variant="text"
                                color="blue"
                                ripple={false}
                                disabled={
                                    !isToday && !isTomorrow && !isYesterday
                                }
                            >
                                Mark Complete
                            </Button>
                        </div>

                        <button
                            onClick={handleDelete}
                            className={
                                'flex-3 flex bg-gray-50 dark:bg-background-dark h-full overflow-hidden rounded-lg items-center justify-center transition-all w-8 hover:w-16 hover:bg-red-500 dark:hover:bg-red-700'
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6 flex-none"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                            </svg>
                        </button>
                    </div>
                )
            ) : (
                // If the habit is not active for today
                <div></div>
            )}
        </>
    );
}
