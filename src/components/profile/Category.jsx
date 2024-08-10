import React from 'react';

const categoryImages = {
  health: '/images/health.png',
  fitness: '/images/fitness.png',
  productivity: '/images/productivity.png',
  learning: '/images/learning.png',
  quitting: '/images/quitting.png',
  finance: '/images/finance.png',
  social: '/images/social.png',
  creative: '/images/creative.png',
  abstract: '/images/abstract.png',
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

const Category = ({ name, xp, sumOfDays, numOfHabits, lastCompleted  }) => {
  const categoryKey = name.toLowerCase().replace(' ', '_');
  const categoryImage = categoryImages[categoryKey] || '/images/placeholder.png';
  const rank = getRank(xp);
  const rankImage = rankImages[rank];

  return (
    <div className='p-3 bg-gray-900 rounded-lg mb-4'>
      <div className="flex items-center mt-2">
        <img src={categoryImage} alt={`${name} Icon`} className="w-32 h-32" />
        <div className="text-2xl ml-3">{name}</div>
        <div className="text-lg ml-auto">{numOfHabits} habits | {sumOfDays} days on record</div>
      </div>
      <p>Last completed: {lastCompleted ? new Date(lastCompleted.seconds * 1000).toLocaleString() : 'Never'}</p>
      <div className="bg-gray-800 p-2 rounded-lg mt-2 flex space-x-1">
        <img src={rankImage} alt="Badge" className="w-12 h-12" />
        <div className="text-lg">
          {rank.charAt(0).toUpperCase() + rank.slice(1).replace('_', ' ')}
          <div className="text-base">{xp} XP</div>
        </div>
      </div>
    </div>
  );
};

export default Category;
