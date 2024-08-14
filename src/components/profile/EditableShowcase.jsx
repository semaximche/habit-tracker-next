import React, { useState } from 'react';

const EditableShowcase = () => {
    const [gotoEditShowCases, setGotoEditShowCases] = useState(false);

    return (
        <div
            className="bg-blue-900 p-5 rounded-lg mb-5"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
        >
            <div className="text-xl font-bold">
                <button
                    onClick={() => setGotoEditShowCases(true)}
                    className="mr-3"
                >
                    + Add a Showcase
                </button>
            </div>
            <div className="mt-3">
                <p>
                    You&apos;ve earned a slot for a showcase on your profile.
                    Click here to select a showcase to display.
                </p>
            </div>
        </div>
    );
};

export default EditableShowcase;
