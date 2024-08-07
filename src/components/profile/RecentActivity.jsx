import React from 'react';
import Container from './pContainer';
import Activity from './Activity';

const RecentActivity = () => {
  const activities = [
    { name: 'Running', xp: 900, daysOnRecord: 432 },
    { name: 'Reading', xp: 150, daysOnRecord: 120 },
    { name: 'Drink Water', xp: 250, daysOnRecord: 300 },
    { name: 'Stop Smoking', xp: 600, daysOnRecord: 300 },
    // Add more activities as needed
  ];

  return (
    <Container title="Recent Activity" pad={true}>
      {activities.map((activity, index) => (
        <Activity
          key={index}
          name={activity.name}
          xp={activity.xp}
          daysOnRecord={activity.daysOnRecord}
        />
      ))}
    </Container>
  );
};

export default RecentActivity;
