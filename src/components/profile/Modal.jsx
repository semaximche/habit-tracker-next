import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    // If the modal is not open, return null to render nothing
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            {/* Modal container */}
            <div className="bg-blue-gray-50 p-4 rounded-lg shadow-lg dark:bg-blue-gray-800">
                {/* Close button */}
                <button
                    onClick={onClose} // Close the modal when clicked
                    type="button"
                    className="bg-white rounded-md p-2 inline-flex float-right items-center justify-center text-gray-500 hover:text-blue-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:bg-blue-gray-50"
                >
                    <span className="sr-only">Close menu</span> {/* Accessible text for screen readers */}
                    <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" // SVG path for the close icon (X mark)
                        />
                    </svg>
                </button>
                {/* Modal content */}
                {children}
            </div>
        </div>
    );
};

export default Modal;
