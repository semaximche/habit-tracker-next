import React from 'react';
import SteamLevel from "react-steam-level";
const MiniProfile = ({ name, lastOnline, badgeNumber }) => {
  return (
    <div className="flex items-center justify-between my-2">
        <img src={`https://ui-avatars.com/api/?name=${name}`} alt={name} className="w-10 h-10 rounded-full" />
      <div className="text-xs text-gray-400 ">
          <p >{name}</p>
          <p>{lastOnline}</p>
        </div>
        <div className='ml-2'>
          <SteamLevel level={badgeNumber} size={35} />
        </div>
      
    </div>
  );
};

export default MiniProfile;
