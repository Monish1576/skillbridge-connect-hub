
import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline";
import { TasksCalendarSection } from "@/components/dashboard/TasksCalendarSection";

export const UpperDashboardSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <ActivityTimeline />
      </div>
      <div>
        <TasksCalendarSection />
      </div>
    </div>
  );
};
