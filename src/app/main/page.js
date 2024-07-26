import dynamic from 'next/dynamic';
import Topbar from "@/components/main/Topbar";
import HabitTracker from '@/components/HabitTracker/HabitTracker';

export default function MainPage() {
  return (
    <div className="h-8">
      <Topbar />
      <HabitTracker />
    </div>
  );
}

//export default function MainPage() {
//    return (
//        <div className="h-8">
//                <Topbar />
//            <div className="grid lg:grid-cols-3">
//                <div className="col-span-2 min-h-60 bg-white m-2 p-6 rounded-lg shadow-lg hidden lg:block">
//                    left
//                </div>
//                <div className="min-h-60 m-2 p-6 bg-white rounded-lg shadow-lg">
//                    right
//                </div>
//            </div>
//        </div>
//    );
//}
