import HabitsListTable from '@/components/dashboard/HabitsListTable';
import HabitTable from '@/components/dashboard/HabitTable';

export default function Dashboard() {
    return (
        <div className="grid lg:grid-cols-3">
            <div className="col-span-2 min-h-60 bg-foreground-light dark:bg-foreground-dark m-2 p-6 rounded-lg shadow-lg hidden lg:block">
                <HabitTable />
            </div>
            <div className="min-h-60 m-2 p-6 bg-foreground-light dark:bg-foreground-dark rounded-lg shadow-lg">
                <HabitsListTable />
            </div>
        </div>
    );
}
