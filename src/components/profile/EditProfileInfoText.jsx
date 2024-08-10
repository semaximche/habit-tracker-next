import React, { useState } from 'react';

const EditProfileInfoText = ({ username, setUsername, about, setAbout, location, setLocation }) => {
  const locations = ["Israel, Tel-Aviv", "Israel, Haifa", "Israel, Carmiel"];

  return (
    <div className="tab-pane active">
      <form className="form" onSubmit={(e) => e.preventDefault()}>
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
      </form>
    </div>
  );
};

export default EditProfileInfoText;
