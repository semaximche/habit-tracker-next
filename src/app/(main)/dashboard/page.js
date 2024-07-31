import HabitsListTable from '@/components/dashboard/HabitsListTable';

export default function Dashboard() {
  return (
    <div className="grid lg:grid-cols-3">
      <div className="col-span-2 min-h-60 bg-foreground-light dark:bg-foreground-dark m-2 p-6 rounded-lg shadow-lg hidden lg:block">
        <div className="flex justify-between items-center">
          <button className="text-xl">&lt;</button>
          <h2 className="text-xl font-semibold">week</h2>
          <button className="text-xl">&gt;</button>
        </div>
        <div className="flex justify-between items-center mt-6">
          <span className="text-accent-light dark:text-accent-dark">Up 50% from the week before</span>
          <div className="w-3/4 bg-gray-200 dark:bg-gray-900 rounded-full h-2.5">
            <div
              className="bg-blue-500 dark:bg-blue-900 h-2.5 rounded-full"
              style={{ width: 80 }}
            ></div>
          </div>
          <span className="text-accent-light dark:text-accent-dark">80% achieved</span>
        </div>
        <div className='text-accent-light dark:text-accent-dark'>Habits Calendar</div>
      </div>
      <div className="min-h-60 m-2 p-6 bg-foreground-light dark:bg-foreground-dark rounded-lg shadow-lg">
        <HabitsListTable />
      </div>
    </div>
  );
}
