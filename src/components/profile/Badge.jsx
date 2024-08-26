import React from 'react';

/**
 * Badge component displays a badge with an icon and name.
 * Renders a styled container with an icon and text side by side.
 */

const Badge = ({ name, icon }) => {
    return (
        <div className="flex items-center space-x-2 p-2 bg-white rounded-lg shadow-sm dark:bg-gray-300">
            <img src={icon} alt={name} className="w-8 h-8" />
            <span className="text-gray-900 font-medium">{name}</span>
        </div>
    );
};

export default Badge;
