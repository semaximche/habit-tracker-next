'use client';
import React from 'react';
import Container from './pContainer';
import Category from './Category';
import { useUserData } from '@/contexts/UserContext';
import Loading from '../loading';
import { UseAuth } from '@/contexts/AuthContext';

/**
 * AllCategories component displays a summary of user habits organized by categories.
 * - Retrieves user data and calculates categories based on habits.
 * - Each category shows total XP, number of habits, and last completed date.
 * - Displays a loading indicator while user data is being fetched.
 * - Renders a list of categories or a message if no categories are available.
 */

const AllCategories = () => {
    // Get the authenticated user and user data
    const { user } = UseAuth();
    const { userData, isUserDataLoaded } = useUserData();

    // Show loading indicator while user data is being fetched
    if (!isUserDataLoaded) {
        return (
            <div className="flex justify-center items-center h-full">
                <Loading />
            </div>
        );
    }

    // Extract all categories from user data
    const categories = Object.keys(userData.habits).reduce((acc, habitKey) => {
        const habit = userData.habits[habitKey];
        const category = habit.category;

        // Initialize category if it doesn't exist
        if (!acc[category]) {
            acc[category] = {
                name: category,
                xp: 0,
                sumOfDays: 0,
                numOfHabits: 0,
                lastCompleted: habit.lastCompleted || null,
            };
        }

        acc[category].xp += habit.completeDays.length * 10 || 0;
        acc[category].sumOfDays += habit.completeDays.length;
        acc[category].numOfHabits += 1;

        // Update lastCompleted if this habit was completed more recently
        if (
            habit.lastCompleted &&
            (!acc[category].lastCompleted ||
                habit.lastCompleted > acc[category].lastCompleted)
        ) {
            acc[category].lastCompleted = habit.lastCompleted;
        }

        return acc;
    }, {});

    // Convert the categories object to an array and filter out empty categories
    const categoryArray = Object.values(categories).filter(
        (cat) => cat.numOfHabits > 0
    );

    return (
        <div className="relative max-w-screen-xl mx-auto p-5 bg-gray-800">
            <Container title="All Categories" pad={true}>
                {categoryArray.length > 0 ? (
                    categoryArray.map((category, index) => (
                        <div key={index}>
                            <Category
                                name={category.name}
                                xp={category.xp}
                                sumOfDays={category.sumOfDays}
                                numOfHabits={category.numOfHabits}
                                lastCompleted={category.lastCompleted}
                            />
                        </div>
                    ))
                ) : (
                    <p>No categories available.</p>
                )}
            </Container>
        </div>
    );
};

export default AllCategories;
