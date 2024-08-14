import React, { useEffect } from 'react';
import Container from './pContainer';
import { useUserData } from '@/contexts/UserContext';
import { format, subMonths, startOfMonth, endOfMonth, parseISO, isBefore, isAfter, isValid, parse } from 'date-fns';
import Loading from '../loading';

const CategorySummary = () => {
  const { userData, isUserDataLoaded, awardBadge } = useUserData();

  // If data is still loading, show the Loading component
  if (!isUserDataLoaded) {
    return (
      <Container title={`Habit Month Review - ${format(subMonths(new Date(), 1), 'MMMM')}`}>
        <div className="bg-gradient-to-r from-purple-700 via-purple-800 to-blue-900 p-5 mb-5 text-white items-center justify-center">
          <Loading />
        </div>
      </Container>
    );
  }

  const lastMonthDate = subMonths(new Date(), 1);
  const currentMonthDate = new Date();
  let monthStart, monthEnd;

  const currentMonthStart = startOfMonth(currentMonthDate);

  const hasPastCompletions = Object.keys(userData.habits).some(habitKey => {
    const habit = userData.habits[habitKey];
    return habit.completeDays.some(dateStr => {
      const completedDate = parse(dateStr, 'd-M-yyyy', new Date());
      return isValid(completedDate) && isBefore(completedDate, currentMonthStart);
    });
  });

  if (hasPastCompletions) {
    monthStart = startOfMonth(lastMonthDate);
    monthEnd = endOfMonth(lastMonthDate);
  } else {
    monthStart = startOfMonth(currentMonthDate);
    monthEnd = endOfMonth(currentMonthDate);
  }

  let habitsAchieved = 0;
  let tasksCompleted = 0;
  let newHabits = 0;
  const categoryStats = {};

  Object.keys(userData.habits).forEach(habitKey => {
    const habit = userData.habits[habitKey];
    const { completeDays, category } = habit;

    const completedInMonth = completeDays.some(dateStr => {
      const completedDate = parse(dateStr, 'd-M-yyyy', new Date());
      return isValid(completedDate) && isAfter(completedDate, monthStart) && isBefore(completedDate, monthEnd);
    });

    if (completedInMonth) {
      habitsAchieved += 1;

      const lastMonthCompletions = completeDays.filter(dateStr => {
        const completedDate = parse(dateStr, 'd-M-yyyy', new Date());
        return isValid(completedDate) && isAfter(completedDate, monthStart) && isBefore(completedDate, monthEnd);
      });

      tasksCompleted += lastMonthCompletions.length;

      if (!categoryStats[category]) {
        categoryStats[category] = {
          name: category,
          xp: 0,
          daysCompleted: 0,
          totalDays: 0,
        };
      }
      categoryStats[category].daysCompleted += lastMonthCompletions.length;
      categoryStats[category].totalDays += 30; // Assuming each habit has 30 days in a month

      // Calculate XP for the category
      categoryStats[category].xp += lastMonthCompletions.length * 10; // XP per completed day
    }

    const firstCompletionInMonth = completeDays
      .map(dateStr => parse(dateStr, 'd-M-yyyy', new Date()))
      .filter(completedDate => isValid(completedDate) && isAfter(completedDate, monthStart) && isBefore(completedDate, monthEnd))
      .sort((a, b) => a - b)[0];

    const hadNoPriorCompletions = !completeDays.some(dateStr => {
      const completedDate = parse(dateStr, 'd-M-yyyy', new Date());
      return isValid(completedDate) && isBefore(completedDate, monthStart);
    });

    if (firstCompletionInMonth && hadNoPriorCompletions) {
      newHabits += 1;
    }
  });

  // Award badges based on the criteria
  // useEffect(() => {
  //   // Category badges
  //   Object.keys(categoryStats).forEach(categoryName => {
  //     if (categoryStats[categoryName].xp >= 300) {
  //       awardBadge(`${categoryName} Expert`, `/images/${categoryName.toLowerCase().replace(/\s+/g, '_')}_expert.png`);
  //     }
  //   });

  //   // Task badges
  //   if (tasksCompleted >= 10) awardBadge('Little Task', '/images/little_task.png');
  //   if (tasksCompleted >= 30) awardBadge('Tasky Tasky', '/images/tasky_tasky.png');
  //   if (tasksCompleted >= 100) awardBadge('Task Expert', '/images/task_expert.png');
  //   if (tasksCompleted >= 200) awardBadge('Task Ninja', '/images/task_ninja.png');

  //   // Habit badges
  //   if (habitsAchieved >= 5 && habitsAchieved <= 9) awardBadge('Habit Enjoyer', '/images/habit_enjoyer.png');
  //   if (habitsAchieved >= 10) awardBadge('Habit Lover', '/images/habit_lover.png');
  // }, [tasksCompleted, habitsAchieved, categoryStats, awardBadge]);

  const sortedCategories = Object.values(categoryStats).map(cat => ({
    ...cat,
    percentage: (cat.daysCompleted / tasksCompleted) * 100,
  })).sort((a, b) => b.percentage - a.percentage);

  const topCategories = sortedCategories.slice(0, 5);

  return (
    <Container title={`Habit Month Review - ${format(hasPastCompletions ? lastMonthDate : currentMonthDate, 'MMMM')}`}>
      <div className="bg-gradient-to-r from-purple-700 via-purple-800 to-blue-900 p-5 mb-5 text-white">
        <div className="flex flex-col lg:flex-row justify-around items-center">
          <div className="flex items-center justify-center mb-4 lg:mb-0 lg:mr-4">
            <h3 className="text-6xl lg:text-9xl font-bold mb-1">
              {habitsAchieved}
              <span className="block text-xl lg:text-2xl font-bold mb-1">Habits Achieved</span>
            </h3>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="flex flex-wrap justify-center lg:justify-start lg:space-x-10">
                <div className="text-center w-1/2 lg:w-auto mb-4 lg:mb-0">
                  <div className="text-4xl lg:text-5xl font-bold">{tasksCompleted}</div>
                  <div className="text-sm lg:text-base">Tasks Completed</div>
                </div>
                <div className="text-center w-1/2 lg:w-auto mb-4 lg:mb-0">
                  <div className="text-4xl lg:text-5xl font-bold">TBD</div>
                  <div className="text-sm lg:text-base">Highest Streak</div>
                </div>
                <div className="text-center w-full lg:w-auto">
                  <div className="text-4xl lg:text-5xl font-bold">{newHabits}</div>
                  <div className="text-sm lg:text-base">New Habits</div>
                </div>
              </div>
              <div className="flex flex-wrap justify-center lg:justify-start lg:space-x-3 mt-5">
                {topCategories.map((category, index) => (
                  <div className="text-center w-1/3 lg:w-auto mb-3 lg:mb-0" key={index}>
                    <img src={`/images/${category.name.toLowerCase().replace(/\s+/g, '_')}.png`} alt={category.name} className="w-16 h-16 lg:w-24 lg:h-24 mb-1 mx-auto" />
                    <p className="text-sm lg:text-base">{Math.round(category.percentage)}%</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CategorySummary;