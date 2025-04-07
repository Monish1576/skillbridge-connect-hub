
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const TasksCalendarSection = () => {
  return (
    <Tabs defaultValue="tasks" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="tasks">My Tasks</TabsTrigger>
        <TabsTrigger value="calendar">Calendar</TabsTrigger>
      </TabsList>
      <TabsContent value="tasks" className="mt-4">
        <div className="space-y-4">
          <div className="flex items-center p-2 rounded-md bg-primary/5">
            <div className="mr-4 h-4 w-4 rounded-full bg-yellow-500"></div>
            <span className="flex-1">Review project proposal</span>
            <span className="text-xs text-muted-foreground">Today</span>
          </div>
          <div className="flex items-center p-2 rounded-md bg-primary/5">
            <div className="mr-4 h-4 w-4 rounded-full bg-red-500"></div>
            <span className="flex-1">Submit research findings</span>
            <span className="text-xs text-muted-foreground">Tomorrow</span>
          </div>
          <div className="flex items-center p-2 rounded-md bg-primary/5">
            <div className="mr-4 h-4 w-4 rounded-full bg-green-500"></div>
            <span className="flex-1">Team meeting</span>
            <span className="text-xs text-muted-foreground">Apr 10</span>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="calendar" className="mt-4 h-[200px] flex items-center justify-center">
        <p className="text-center text-muted-foreground">Calendar view coming soon</p>
      </TabsContent>
    </Tabs>
  );
};
