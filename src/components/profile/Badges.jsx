import React from 'react';

const Badges = () => {
  return (
    <div className="p-5 rounded-lg mb-2">
      <h2 className="text-xl font-bold">Badges</h2>
      <div className="flex space-x-4 mt-3">
        <img src="/images/badge1.png" alt="Badge 1" className="w-10 h-10" />
        <img src="/images/badge2.png" alt="Badge 2" className="w-10 h-10" />
        <img src="/images/badge3.png" alt="Badge 3" className="w-10 h-10" />
        <img src="/images/badge4.png" alt="Badge 4" className="w-10 h-10" />
      </div>
    </div>
  );
};

export default Badges;
