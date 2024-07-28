import MainTopbar from '@/components/MainTopbar';
import HabitTracker from '@/components/habitTrackerOld/HabitTracker';

export default function MainPage() {
    return (
        <div className="flex flex-col h-screen">
            <main className="flex-grow">
                <HabitTracker />
            </main>
        </div>
    );
}
//<div className="col-span-2 min-h-60 bg-white m-2 p-6 rounded-lg shadow-lg hidden lg:block">
//<div className="flex justify-between items-center">
//<button className="text-xl">&lt;</button>
//<h2 className="text-xl font-semibold">week</h2>
//<button className="text-xl">&gt;</button>
//</div>
//<div className="flex justify-between items-center mt-6">
//<span>Up 50% from the week before</span>
//<div className="w-3/4 bg-gray-200 rounded-full h-2.5">
//    <div
//        className="bg-blue-500 h-2.5 rounded-full"
//        style={{ width: 80 }}
//    ></div>
//</div>
//<span>80% achieved</span>
//</div>
//Habit Table
//</div>
//<div className="min-h-60 m-2 p-6 bg-white rounded-lg shadow-lg">
//<HabitsList/>
//</div>