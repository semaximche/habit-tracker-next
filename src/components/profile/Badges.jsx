import React, { useEffect } from 'react';
import { useUserData } from '@/contexts/UserContext';

const Badges = () => {
  const { userData, awardBadge, getUserBadges } = useUserData();

  // Award badges when the component mounts (for testing purposes)
  useEffect(() => {
    awardBadge('Badge 1', '/images/badge1.png');
    awardBadge('Badge 2', '/images/badge2.png');
    awardBadge('Badge 3', '/images/badge3.png');
    awardBadge('Badge 4', '/images/badge4.png');
  }, [awardBadge]);

  const badges = getUserBadges();

  return (
    <div className="p-5 rounded-lg mb-2">
      <h2 className="text-xl font-bold">Badges</h2>
      <div className="flex space-x-4 mt-3">
        {badges.map((badge, index) => (
          <img key={index} src={badge.icon} alt={badge.name} className="w-10 h-10" />
        ))}
      </div>
    </div>  
  );
};

export default Badges;
