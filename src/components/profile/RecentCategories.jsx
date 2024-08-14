import React from 'react';
import Container from './pContainer';
import Category from './Category';
import { useUserData } from '@/contexts/UserContext';

const RecentCategories = () => {
    const { userData } = useUserData();

    // Extract categories from user data with lastCompleted timestamps
    const categories = Object.keys(userData.habits).reduce((acc, habitKey) => {
        const habit = userData.habits[habitKey];
        const category = habit.category;

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

    // Convert the categories object to an array, filter out empty categories, and sort by lastCompleted
    const categoryArray = Object.values(categories)
        .filter((cat) => cat.numOfHabits > 0)
        .sort((a, b) => b.lastCompleted?.seconds - a.lastCompleted?.seconds) // Sort by timestamp
        .slice(0, 3); // Get only the last 3 categories

    return (
        <Container title="Recent Categories" pad={true}>
            {categoryArray.map((category, index) => (
                <div key={index}>
                    <Category
                        name={category.name}
                        xp={category.xp}
                        sumOfDays={category.sumOfDays}
                        numOfHabits={category.numOfHabits}
                        lastCompleted={category.lastCompleted}
                    />
                </div>
            ))}
        </Container>
    );
};

export default RecentCategories;
