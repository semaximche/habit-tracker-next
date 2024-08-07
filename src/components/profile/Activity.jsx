import React from 'react';

const activityImages = {
  running: '/images/run.png',
  reading: '/images/read.png',
  drink_water: '/images/drink_water.png',
  eat_healthy: '/images/eat_healthy.png',
  stop_smoking: '/images/no_smoking.png',
};

const rankImages = {
  beginner: '/images/beginner.png',
  good: '/images/good.png',
  great: '/images/great.png',
  elite: '/images/elite.png',
  world_class: '/images/world_class.png',
};

const getRank = (xp) => {
  if (xp >= 700) return 'world_class';
  if (xp >= 400) return 'elite';
  if (xp >= 200) return 'great';
  if (xp >= 100) return 'good';
  return 'beginner';
};

const Activity = ({ name, xp, daysOnRecord }) => {
  const activityImage = activityImages[name.toLowerCase().replace(' ', '_')] || '/images/placeholder.png';
  const rank = getRank(xp);
  const rankImage = rankImages[rank];

  return (
    <div className='p-3 bg-gray-900 rounded-lg mb-4'>
      <div>
        <div className="flex items-center mt-2">
          <img src={activityImage} alt={`${name} Icon`} className="w-32 h-32" />
          <div className="text-2xl ml-3">{name}</div>
          <div className="text-lg ml-auto">{daysOnRecord} days on record</div>
        </div>
        <div className="bg-gray-800 p-2 rounded-lg mt-2 flex space-x-1">
          <img src={rankImage} alt="Badge" className="w-12 h-12" />
          <div className="text-lg">
            {rank.charAt(0).toUpperCase() + rank.slice(1).replace('_', ' ')}
            <div className="text-base">{xp} XP</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
