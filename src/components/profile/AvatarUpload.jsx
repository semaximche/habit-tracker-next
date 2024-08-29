import React, { useState } from 'react';

/**
 * AvatarUpload component allows users to upload and preview an avatar image.
 * - Displays a preview of the selected avatar or a placeholder if none is selected.
 * - Handles file selection via a hidden input, updating the preview when a new file is chosen.
 * - Notifies the parent component of the selected file through the `onAvatarSelect` callback.
 */

const AvatarUpload = ({ currentAvatarURL, onAvatarSelect }) => {
    const [preview, setPreview] = useState(currentAvatarURL);

    // Handle the change event when a new avatar is selected
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file)); // Display the selected image as a preview
            onAvatarSelect(file); // Notify parent component of the selected file
        }
    };

    return (
        <div className="flex flex-col items-center mt-3">
            <div className="w-36 h-36 bg-gray-300 rounded flex items-center justify-center overflow-hidden">
                {preview ? (
                    <img
                        src={preview}
                        alt="Selected Avatar"
                        className="object-cover w-full h-full"
                    />
                ) : (
                    <span className="text-gray-500 font-bold">140x140</span>
                )}
            </div>
            <input
                id="avatar-upload"
                type="file"
                onChange={handleAvatarChange}
                className="hidden" // Hide the default input
            />
            <label
                htmlFor="avatar-upload"
                className="cursor-pointer text-xl bg-black hover:bg-gray-700 hover:shadow-2xl bg-opacity-30 text-white py-2 px-4 rounded duration-150 mt-3"
            >
                Change Avatar
            </label>
        </div>
    );
};

export default AvatarUpload;
