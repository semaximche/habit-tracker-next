import React, { useState } from 'react';
import { useUserData } from '@/contexts/UserContext';
import Modal from './Modal'; // Assuming you have a Modal component
import Badge from './Badge'; // Assuming you have a Badge component

/**
 * BadgeModal component displays a modal containing the user's badges.
 * - Receives `isOpen` to control visibility and `toggleModal` for closing.
 * - Fetches user data to retrieve and display badges.
 * - Renders each badge using the Badge component.
 */

const BadgeModal = ({ isOpen, toggleModal }) => {
    const { userData } = useUserData();

    return (
        <Modal isOpen={isOpen} onClose={toggleModal}>
            <div
                className="bg-blue-gray-50 p-4 rounded-lg max-w-full dark:bg-blue-gray-800"
                style={{ maxWidth: '600px' }}
            >
                <h2 className="text-xl font-bold mb-4 text-blue-gray-900 dark:text-white">
                    Your Badges
                </h2>
                <div
                    className="flex flex-wrap gap-2 overflow-auto"
                    style={{ maxHeight: '400px' }}
                >
                    {userData.profile.badges.map((badge, index) => (
                        <Badge
                            key={index}
                            name={badge.name}
                            icon={badge.icon}
                        />
                    ))}
                </div>
            </div>
        </Modal>
    );
};

export default BadgeModal;
