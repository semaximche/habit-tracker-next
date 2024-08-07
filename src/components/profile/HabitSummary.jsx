import React from 'react';
import Container from './pContainer';

const HabitSummary = () => {
  return (
    <div>
      <Container title='Habit Month Review - July'>
        <div className="bg-gradient-to-r from-purple-700 via-purple-800 to-blue-900 p-5 mb-5 text-white items-center justify-center">
          <div className="flex justify-around items-center">
            <div className="flex items-center justify-center mr-4">
              <h3 className="text-9xl font-bold mb-1">
                12
                <span className="block text-2xl font-bold mb-1">Habits Achieved</span>
              </h3>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="flex space-x-10">
                  <div className="text-center">
                    <div className="text-5xl font-bold">94</div>
                    <div className="text-base">Tasks Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold">27</div>
                    <div className="text-base">Highest Streak</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold">3</div>
                    <div className="text-base">New Habits</div>
                  </div>
                </div>
                <div className="flex space-x-3 mt-5">
                  <div className="text-center">
                    <img src="/images/run.png" alt="Running" className="w-24 h-24 mb-1" />
                    <p>50%</p>
                  </div>
                  <div className="text-center">
                    <img src="/images/read.png" alt="Reading" className="w-24 h-24 mb-1" />
                    <p>36%</p>
                  </div>
                  <div className="text-center">
                    <img src="/images/eat_healthy.png" alt="Healthy Eating" className="w-24 h-24 mb-1" />
                    <p>5%</p>
                  </div>
                  <div className="text-center">
                    <img src="/images/drink_water.png" alt="Drinking Water" className="w-24 h-24 mb-1" />
                    <p>3%</p>
                  </div>
                  <div className="text-center">
                    <img src="/images/no_smoking.png" alt="No Smoking" className="w-24 h-24 mb-1" />
                    <p>3%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      
    </div>
  );
};

export default HabitSummary;
