
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectsGrid } from "@/components/dashboard/ProjectsGrid";
import { NotificationsPanel } from "@/components/dashboard/NotificationsPanel";
import { MessagesPanel } from "@/components/dashboard/MessagesPanel";

export const DashboardTabs = () => {
  return (
    <Tabs defaultValue="projects">
      <TabsList className="grid w-full max-w-md grid-cols-3">
        <TabsTrigger value="projects">Projects</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="messages">Messages</TabsTrigger>
      </TabsList>
      
      <TabsContent value="projects" className="mt-6 space-y-4">
        <ProjectsGrid />
      </TabsContent>
      
      <TabsContent value="notifications" className="mt-6">
        <NotificationsPanel />
      </TabsContent>
      
      <TabsContent value="messages" className="mt-6">
        <MessagesPanel />
      </TabsContent>
    </Tabs>
  );
};
