import React from 'react';
import Badges from './Badges';
import MiniProfile from './MiniProfile';

const SideInfo = ({ className }) => {
  const friends = [
    { name: 'левосисия (Любимая жена)', lastOnline: 'Last Online 8 days ago', badgeNumber: 2333 },
    { name: 'Манаглус', lastOnline: 'Last Online 29 hrs, 29 mins ago', badgeNumber: 1777 },
    { name: 'Vadik', lastOnline: 'Last Online 6 days ago', badgeNumber: 1234 },
    { name: 'Elie X', lastOnline: 'Last Online 40 mins ago', badgeNumber: 999 },
    { name: 'No', lastOnline: 'Last Online 8 hrs, 50 mins ago', badgeNumber: 228 },
    { name: '暖暖的周儿a', lastOnline: 'Last Online 15 hrs, 14 mins ago', badgeNumber: 23 }
  ];

  return (
    <div className={`p-5 bg-gray-950 rounded-lg ${className}`} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="text-xl mb-4">
        <p>Currently Offline</p>
        <p className="text-sm text-gray-400">Last Online 23 days ago</p>
      </div>
      <div className="mb-4">
        <Badges />
      </div>
      <div className="mb-4">
        <p className="text-lg">Habits 71</p>
        <p>Something</p>
      </div>
      <div>
        <p className="text-lg mb-2">Friends 148</p>
        {friends.map((friend, index) => (
          <MiniProfile
            key={index}
            name={friend.name}
            lastOnline={friend.lastOnline}
            badgeNumber={friend.badgeNumber}
          />
        ))}
      </div>
    </div>
  );
};

export default SideInfo;
