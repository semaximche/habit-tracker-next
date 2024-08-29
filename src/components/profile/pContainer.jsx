import React from 'react';

const Container = ({ title, pad, children }) => {
    return (
        <div>
            <div className="bg-amber-800 bg-opacity-60 rounded-md">
                <div className="p-2 text-xl">{title}</div>
                <hr className="border-t-2 border-white" />
            </div>
            <div
                className={`bg-gray-900 mb-5 ${pad ? 'p-5' : ''}`}
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
            >
                {children}
            </div>
        </div>
    );
};

export default Container;
