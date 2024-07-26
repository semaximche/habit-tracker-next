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