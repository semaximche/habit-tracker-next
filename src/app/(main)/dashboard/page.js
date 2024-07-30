import HabitsListTable from '@/components/dashboard/HabitsListTable';
import HabitTable from '@/components/habitTrackerOld/HabitTable';
import DarkModeToggle from '@/components/DarkMode';

export default function Dashboard() {
  return (
    <div className="grid lg:grid-cols-3">
      <div className="col-span-2 min-h-60 bg-white dark:bg-gray-800 m-2 p-6 rounded-lg shadow-lg hidden lg:block">
        <div className="flex justify-between items-center">
          <DarkModeToggle />
          <button className="text-xl">&lt;</button>
          <h2 className="text-xl font-semibold">week</h2>
          <button className="text-xl">&gt;</button>
        </div>
        <div className="flex justify-between items-center mt-6">
          <span className="dark:text-gray-300">Up 50% from the week before</span>
          <div className="w-3/4 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-blue-500 h-2.5 rounded-full"
              style={{ width: 80 }}
            ></div>
          </div>
          <span className="dark:text-gray-300">80% achieved</span>
        </div>
        <HabitTable />
      </div>
      <div className="min-h-60 m-2 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <HabitsListTable />
      </div>
    </div>
  );
}
