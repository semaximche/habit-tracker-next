import React, { useState, useEffect } from 'react';
import Container from './profile/pContainer';
import Category from './profile/Category';
import {
    getFirestore,
    doc,
    getDoc,
    collection,
    getDocs,
} from 'firebase/firestore';

const db = getFirestore();

const OtherUserRecentCategories = ({ userId }) => {
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
            <Container title="Recent Categories" pad={true}>
                <div>Loading...</div>
            </Container>
        );
    }

    if (!userData) {
        return null;
    }

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

export default OtherUserRecentCategories;
