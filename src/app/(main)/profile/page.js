'use client';
import React, { useState } from 'react';
import UserProfile from '@/components/profile/UserProfile';
import HabitSummary from '@/components/profile/HabitSummary';
import EditableShowcase from '@/components/profile/EditableShowcase';
import RecentActivity from '@/components/profile/RecentActivity';
import LevelBadge from '@/components/profile/LevelBadge';
import SideInfo from '@/components/profile/SideInfo';
import EditProfile from '@/components/profile/EditProfile';



const userGradientColors = {
  from: '#1c3d5a', // Replace with your desired color (e.g., blue-900)
  via: '#1d4e89', // Replace with your desired color (e.g., blue-800)
  to: '#6b5b95'   // Replace with your desired color (e.g., purple-700)
};

const sunsetGradientColors = {
  from: '#ff7e5f', // Warm pink
  via: '#feb47b', // Light orange
  to: '#ff7e5f'   // Warm pink
};

const oceanBreezeGradientColors = {
  from: '#00c6ff', // Light blue
  via: '#0072ff', // Blue
  to: '#00c6ff'   // Light blue
};

const forestWhisperGradientColors = {
  from: '#5a3f37', // Dark brown
  via: '#2c7744', // Forest green
  to: '#5a3f37'   // Dark brown
};

const candyCrushGradientColors = {
  from: '#d53369', // Pinkish red
  via: '#daae51', // Orange
  to: '#d53369'   // Pinkish red
};

const mistySkyGradientColors = {
  from: '#3a6186', // Dark blue
  via: '#89253e', // Reddish purple
  to: '#3a6186'   // Dark blue
};

const coolBluesGradientColors = {
  from: '#2193b0', // Cool blue
  via: '#6dd5ed', // Light blue
  to: '#2193b0'   // Cool blue
};

const purpleDreamsGradientColors = {
  from: '#7b4397', // Purple
  via: '#dc2430', // Reddish purple
  to: '#7b4397'   // Purple
};

const autumnBlazeGradientColors = {
  from: '#ff512f', // Orange
  via: '#dd2476', // Magenta
  to: '#ff512f'   // Orange
};


function ProfileMain() {
  const [colors, setColors] = useState(mistySkyGradientColors);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <div className="bg-gray-900 min-h-screen text-white p-5">
        <div className="relative max-w-screen-xl mx-auto p-5 bg-gray-800">
          <div className="absolute inset-0"
               style={{ background: `linear-gradient(to right, ${colors.from}, ${colors.via}, ${colors.to})`, opacity: 0.7 }}>
          </div>
          <div className="relative flex flex-wrap lg:flex-nowrap lg:space-x-5">
            <div className="flex-1 flex flex-col space-y-5">
              {isEditing ? (
                <EditProfile onCancel={() => setIsEditing(false)} />
              ) : (
                <>
                  <UserProfile />
                  <SideInfo className="lg:hidden" />
                  <HabitSummary />
                  <EditableShowcase />
                  <RecentActivity />
                </>
              )}
            </div>
            <div className="w-full lg:w-[360px] flex-shrink-0 mt-5 lg:mt-0">
              <LevelBadge onEdit={() => setIsEditing(true)} />
              <div className="mt-5 lg:mt-24"><SideInfo className="hidden lg:block" /></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileMain;
