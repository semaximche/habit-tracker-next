import React from 'react';
import PropTypes from 'prop-types';

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

const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const currentYear = new Date().getFullYear();
  const completedYear = date.getFullYear();
  
  // Format date as "DD MMM"
  const formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
  });

  // Add year if it's not the current year
  return completedYear === currentYear 
    ? formattedDate 
    : `${formattedDate}, ${completedYear}`;
};

const Category = ({ name, xp, sumOfDays, numOfHabits, lastCompleted }) => {
  const categoryKey = name.toLowerCase().replace(' ', '_');
  const categoryImage = categoryImages[categoryKey] || '/images/placeholder.png';
  const rank = getRank(xp);
  const rankImage = rankImages[rank] || '/images/placeholder.png';

  return (
    <div className='p-4 bg-gray-900 rounded-lg mb-4 shadow-lg'>
      <div className="flex items-start">
        <img src={categoryImage} alt={`${name} category icon`} className="w-32 h-32 object-cover" />
        <div className="ml-4">
          <h2 className="text-2xl font-semibold mb-2">{name}</h2>
          <p className="text-lg mb-1">{numOfHabits} habits | {sumOfDays} days on record</p>
          <p className='text-sm text-gray-400'>
            Last completed: {lastCompleted ? `on ${formatDate(lastCompleted.seconds)}` : 'Never'}
          </p>
        </div>
      </div>
      
      <div className="bg-gray-800 p-2 rounded-lg mt-4 flex items-center space-x-2">
        <img src={rankImage} alt={`${rank} badge`} className="w-12 h-12" />
        <div>
          <div className="text-lg font-semibold">
            {rank.charAt(0).toUpperCase() + rank.slice(1).replace('_', ' ')}
          </div>
          <div className="text-base text-gray-300">{xp} XP</div>
        </div>
      </div>
    </div>
  );
};

Category.propTypes = {
  name: PropTypes.string.isRequired,
  xp: PropTypes.number.isRequired,
  sumOfDays: PropTypes.number.isRequired,
  numOfHabits: PropTypes.number.isRequired,
  lastCompleted: PropTypes.shape({
    seconds: PropTypes.number,
  }),
};

export default Category;
