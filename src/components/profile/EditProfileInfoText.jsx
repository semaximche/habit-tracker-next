import React from 'react';
import {
    lightGradientColors,
    darkGradientColors,
} from '@/components/profile/gradientColors';

const EditProfileInfoText = ({
    username,
    setUsername,
    about,
    setAbout,
    location,
    setLocation,
    lightGradient,
    setLightGradient,
    darkGradient,
    setDarkGradient,
}) => {
    // List of predefined locations
    const locations = ['Israel, Tel-Aviv', 'Israel, Haifa', 'Israel, Carmiel'];

    return (
        <div className="tab-pane active">
            <form className="form" onSubmit={(e) => e.preventDefault()}>
                {/* Username Input Field */}
                <div className="mb-4">
                    <label className="block mb-2">Username</label>
                    <input
                        className="form-control w-full px-3 py-2 text-gray-600"
                        type="text"
                        placeholder="Elon Musk"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                {/* About Textarea Field */}
                <div className="mb-4">
                    <label className="block mb-2">About</label>
                    <textarea
                        className="form-control w-full px-3 py-2 text-gray-600"
                        rows="5"
                        placeholder="This is Elon Musk, Tesla's co founder and CEO..."
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                    ></textarea>
                </div>

                {/* Location Dropdown */}
                <div className="mb-4">
                    <label className="block mb-2">Location</label>
                    <select
                        className="form-control w-full px-3 py-2 text-gray-600"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    >
                        {locations.map((loc, index) => (
                            <option key={index} value={loc}>
                                {loc}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Light Mode Gradient Dropdown */}
                <div className="mb-4">
                    <label htmlFor="lightGradient" className="block mb-2">
                        Light Mode Gradient
                    </label>
                    <select
                        id="lightGradient"
                        name="lightGradient"
                        className="form-control w-full px-3 py-2 text-gray-600"
                        value={lightGradient}
                        onChange={(e) => setLightGradient(e.target.value)}
                    >
                        {Object.keys(lightGradientColors).map((key) => (
                            <option key={key} value={key}>
                                {lightGradientColors[key].label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Dark Mode Gradient Dropdown */}
                <div className="mb-4">
                    <label htmlFor="darkGradient" className="block mb-2">
                        Dark Mode Gradient
                    </label>
                    <select
                        id="darkGradient"
                        name="darkGradient"
                        className="form-control w-full px-3 py-2 text-gray-600"
                        value={darkGradient}
                        onChange={(e) => setDarkGradient(e.target.value)}
                    >
                        {Object.keys(darkGradientColors).map((key) => (
                            <option key={key} value={key}>
                                {darkGradientColors[key].label}
                            </option>
                        ))}
                    </select>
                </div>
            </form>
        </div>
    );
};

export default EditProfileInfoText;
