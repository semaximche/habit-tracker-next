import React, { useState, useEffect } from 'react';
import Container from './profile/pContainer';
import {
    getFirestore,
    doc,
    getDoc,
    collection,
    getDocs,
} from 'firebase/firestore';
import {
    format,
    subMonths,
    startOfMonth,
    endOfMonth,
    parseISO,
    isBefore,
    isAfter,
    isValid,
    parse,
} from 'date-fns';
import Loading from './loading';

const db = getFirestore();

const OtherUserCategorySummary = ({ userId }) => {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDoc = await getDoc(doc(db, 'users', userId));
                if (userDoc.exists()) {
                    const user = userDoc.data();
                    const habitsCollection = await getDocs(
                        collection(db, `users/${userId}/habits`)
                    );
                    const habits = {};
                    habitsCollection.forEach((doc) => {
                        habits[doc.id] = doc.data();
                    });
                    setUserData({ ...user, habits });
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    if (isLoading) {
        return (
            <Container title={`Habit Month Review`}>
                <div className="bg-gradient-to-r from-purple-700 via-purple-800 to-blue-900 p-5 mb-5 text-white items-center justify-center">
                    <Loading />
                </div>
            </Container>
        );
    }

    if (!userData) {
        return null;
    }

    const lastMonthDate = subMonths(new Date(), 1);
    const currentMonthDate = new Date();
    let monthStart, monthEnd;

    // Check if the user has any habits completed before the current month
    const currentMonthStart = startOfMonth(currentMonthDate);

    const hasPastCompletions = Object.keys(userData.habits).some((habitKey) => {
        const habit = userData.habits[habitKey];
        return habit.completeDays.some((dateStr) => {
            const completedDate = parse(dateStr, 'd-M-yyyy', new Date());
            return (
                isValid(completedDate) &&
                isBefore(completedDate, currentMonthStart)
            );
        });
    });

    if (hasPastCompletions) {
        // If the user has past completions, use the last month's range
        monthStart = startOfMonth(lastMonthDate);
        monthEnd = endOfMonth(lastMonthDate);
    } else {
        // If the user has no past completions, use the current month's range
        monthStart = startOfMonth(currentMonthDate);
        monthEnd = endOfMonth(currentMonthDate);
    }

    let habitsAchieved = 0;
    let tasksCompleted = 0;
    let newHabits = 0;
    const categoryStats = {};

    Object.keys(userData.habits).forEach((habitKey) => {
        const habit = userData.habits[habitKey];
        const { completeDays, category, lastCompleted } = habit;
        const lastCompletedDate = lastCompleted?.seconds
            ? new Date(lastCompleted.seconds * 1000)
            : null;

        // Check if the habit was completed at least once in the last month
        const completedInMonth = completeDays.some((dateStr) => {
            const completedDate = parse(dateStr, 'd-M-yyyy', new Date());
            return (
                isValid(completedDate) &&
                isAfter(completedDate, monthStart) &&
                isBefore(completedDate, monthEnd)
            );
        });

        if (completedInMonth) {
            habitsAchieved += 1;

            // Count only completions made in the last month
            const lastMonthCompletions = completeDays.filter((dateStr) => {
                const completedDate = parse(dateStr, 'd-M-yyyy', new Date());
                return (
                    isValid(completedDate) &&
                    isAfter(completedDate, monthStart) &&
                    isBefore(completedDate, monthEnd)
                );
            });

            tasksCompleted += lastMonthCompletions.length;

            // Update category stats
            if (!categoryStats[category]) {
                categoryStats[category] = {
                    name: category,
                    daysCompleted: 0,
                    totalDays: 0,
                };
            }
            categoryStats[category].daysCompleted +=
                lastMonthCompletions.length;
            categoryStats[category].totalDays += 30; // Assuming each habit has 30 days in a month
        }

        // Iterate over completeDays to check the first completion in the last month
        const firstCompletionInMonth = completeDays
            .map((dateStr) => parse(dateStr, 'd-M-yyyy', new Date()))
            .filter(
                (completedDate) =>
                    isValid(completedDate) &&
                    isAfter(completedDate, monthStart) &&
                    isBefore(completedDate, monthEnd)
            )
            .sort((a, b) => a - b)[0]; // Get the earliest completion in the month

        // Ensure no completions before last month
        const hadNoPriorCompletions = !completeDays.some((dateStr) => {
            const completedDate = parse(dateStr, 'd-M-yyyy', new Date());
            return (
                isValid(completedDate) && isBefore(completedDate, monthStart)
            );
        });

        // If the habit was first completed last month and had no prior completions
        if (firstCompletionInMonth && hadNoPriorCompletions) {
            newHabits += 1;
        }
    });

    // Sort categories by percentage of days completed
    const sortedCategories = Object.values(categoryStats)
        .map((cat) => ({
            ...cat,
            percentage: (cat.daysCompleted / tasksCompleted) * 100,
        }))
        .sort((a, b) => b.percentage - a.percentage);

    // Slice to get the top 5 categories
    const topCategories = sortedCategories.slice(0, 5);

    return (
        <Container
            title={`Habit Month Review - ${format(hasPastCompletions ? lastMonthDate : currentMonthDate, 'MMMM')}`}
        >
            <div className="bg-gradient-to-r from-purple-700 via-purple-800 to-blue-900 p-5 mb-5 text-white items-center justify-center">
                <div className="flex justify-around items-center">
                    <div className="flex items-center justify-center mr-4">
                        <h3 className="text-9xl font-bold mb-1">
                            {habitsAchieved}
                            <span className="block text-2xl font-bold mb-1">
                                Habits Achieved
                            </span>
                        </h3>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="flex flex-col items-center">
                            <div className="flex space-x-10">
                                <div className="text-center">
                                    <div className="text-5xl font-bold">
                                        {tasksCompleted}
                                    </div>
                                    <div className="text-base">
                                        Tasks Completed
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-5xl font-bold">
                                        TBD
                                    </div>
                                    <div className="text-base">
                                        Highest Streak
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-5xl font-bold">
                                        {newHabits}
                                    </div>
                                    <div className="text-base">New Habits</div>
                                </div>
                            </div>
                            <div className="flex space-x-3 mt-5">
                                {topCategories.map((category, index) => (
                                    <div className="text-center" key={index}>
                                        <img
                                            src={`/images/${category.name.toLowerCase().replace(/\s+/g, '_')}.png`}
                                            alt={category.name}
                                            className="w-24 h-24 mb-1"
                                        />
                                        <p>
                                            {Math.round(category.percentage)}%
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default OtherUserCategorySummary;
