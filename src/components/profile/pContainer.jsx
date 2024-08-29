import React from 'react';

const Container = ({ title, pad, children }) => {
    return (
        <div>
            {/* Header section with a title */}
            <div className="bg-amber-800 bg-opacity-60 rounded-md">
                <div className="p-2 text-xl">{title}</div>
                <hr className="border-t-2 border-white" />
            </div>
            {/* Main content section */}
            <div
                className={`bg-gray-900 mb-5 ${pad ? 'p-5' : ''}`} // Conditional padding based on `pad` prop
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }} // Semi-transparent black background
            >
                {children} {/* Render child components */}
            </div>
        </div>
    );
};

export default Container;
