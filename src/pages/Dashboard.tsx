
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Dashboard Components
import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { ProjectsGrid } from "@/components/dashboard/ProjectsGrid";
import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline";
import { NotificationsPanel } from "@/components/dashboard/NotificationsPanel";
import { MessagesPanel } from "@/components/dashboard/MessagesPanel";

export default function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const [userProjects, setUserProjects] = useState<any[]>([]);
  
  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    
    // Load user data
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
    
    // Load projects
    const storedProjects = localStorage.getItem('userProjects');
    if (storedProjects) {
      setUserProjects(JSON.parse(storedProjects));
    }
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1">
        <div className="container py-8">
          <div className="grid md:grid-cols-[250px_1fr] gap-8">
            <div className="space-y-6">
              <DashboardSidebar userData={userData} />
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">Dashboard</h1>
                  <p className="text-muted-foreground">Manage your projects, requests, and messages</p>
                </div>
                <div className="flex gap-2">
                  <Link to="/new-project">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      New Project
                    </Button>
                  </Link>
                  <Link to="/profile-setup">
                    <Button variant="outline" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Dashboard stats */}
              <DashboardStats />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <ActivityTimeline />
                </div>
                <div>
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
                </div>
              </div>
              
              <Tabs defaultValue="projects">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="messages">Messages</TabsTrigger>
                </TabsList>
                
                <TabsContent value="projects" className="mt-6 space-y-4">
                  <ProjectsGrid userProjects={userProjects} />
                </TabsContent>
                
                <TabsContent value="notifications" className="mt-6">
                  <NotificationsPanel />
                </TabsContent>
                
                <TabsContent value="messages" className="mt-6">
                  <MessagesPanel />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
