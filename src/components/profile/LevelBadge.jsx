// src/components/LevelBadge.jsx
import React from 'react';
import SteamLevel from 'react-steam-level';

const LevelBadge = ({ onEdit }) => {
  return (
    <div className="rounded-lg mb-5">
      <div className="flex items-center justify-between">
        <div className="text-4xl">Level <SteamLevel level={20} size={55} /></div>
      </div>
      <div className="bg-gray-900 p-2 rounded-lg mt-2" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
        <img src="/images/10years.png" alt="Badge" className="w-16 h-16" />
        <p className="text-2xl">10 Years of Service</p>
      </div>
      <button
        className="text-xl mt-3 bg-black hover:bg-gray-700 hover:shadow-2xl bg-opacity-30 text-white py-2 px-4 rounded duration-150"
        onClick={onEdit}
      >
        Edit Profile
      </button>
    </div>
  );
};

export default LevelBadge;
