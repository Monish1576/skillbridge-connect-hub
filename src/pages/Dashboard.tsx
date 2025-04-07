
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SkillTag } from "@/components/SkillTag";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Plus, Settings } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1">
        <div className="container py-8">
          <div className="grid md:grid-cols-[250px_1fr] gap-8">
            <div className="space-y-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="public/lovable-uploads/31753596-2d00-401f-a90b-826dea0b80f2.png" />
                  <AvatarFallback>AJ</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">Alex Johnson</h2>
                <p className="text-sm text-muted-foreground">Computer Science • 3rd Year</p>
              </div>
              
              <div className="border-t pt-6">
                <nav className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect></svg>
                    Dashboard
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                    Projects
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4l-4 4"></path></svg>
                    Messages
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8"></path><path d="M3 16.2V21m0 0h4.8M3 21l6-6"></path><path d="M21 7.8V3m0 0h-4.8M21 3l-6 6"></path><path d="M3 7.8V3m0 0h4.8M3 3l6 6"></path></svg>
                    Explore
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"></path><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path></svg>
                    Notifications
                  </Button>
                </nav>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="mb-2 text-sm font-medium">Trending Skills</h3>
                <div className="flex flex-wrap gap-2">
                  <SkillTag skill="Machine Learning" />
                  <SkillTag skill="React" />
                  <SkillTag skill="UI/UX Design" />
                  <SkillTag skill="Node.js" />
                  <SkillTag skill="Mobile Dev" />
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="mb-4 text-sm font-medium">Top Contributors</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="public/lovable-uploads/35ad675b-9325-4c13-aa1f-b885708a3ff8.png" />
                      <AvatarFallback>SW</AvatarFallback>
                    </Avatar>
                    <div className="text-sm">Dr. Sarah Williams</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="public/lovable-uploads/dc24bf8c-9388-42bd-8479-210a4428b1f7.png" />
                      <AvatarFallback>MC</AvatarFallback>
                    </Avatar>
                    <div className="text-sm">Michael Chen</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="public/lovable-uploads/e90a5653-7ae3-4c4f-a254-5829b53b5172.png" />
                      <AvatarFallback>ER</AvatarFallback>
                    </Avatar>
                    <div className="text-sm">Emily Rodriguez</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">Dashboard</h1>
                  <p className="text-muted-foreground">Manage your projects, requests, and messages</p>
                </div>
                <div className="flex gap-2">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Project
                  </Button>
                  <Button variant="outline" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Tabs defaultValue="projects">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="messages">Messages</TabsTrigger>
                </TabsList>
                
                <TabsContent value="projects" className="mt-6 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    {dashboardProjects.map((project) => (
                      <Card key={project.id}>
                        <CardContent className="p-6">
                          <div>
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="text-lg font-semibold">{project.title}</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {project.description}
                                </p>
                              </div>
                              <Badge variant={
                                project.status === "Planning" ? "secondary" : 
                                project.status === "In Progress" ? "default" : 
                                "outline"
                              }>
                                {project.status}
                              </Badge>
                            </div>
                            
                            <div className="flex -space-x-2 mb-4">
                              {project.members.map((member, i) => (
                                <Avatar key={i} className="h-8 w-8 border-2 border-background">
                                  <AvatarImage src={member.avatar} />
                                  <AvatarFallback>{member.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                            
                            <div className="text-sm text-muted-foreground mb-4">
                              Updated {project.updatedAt}
                            </div>
                            
                            <Button variant="secondary" className="w-full">View Project</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    <Card className="border-dashed">
                      <CardContent className="p-6 h-full flex flex-col items-center justify-center text-center">
                        <div className="rounded-full bg-secondary flex items-center justify-center w-12 h-12 mb-4">
                          <Plus className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">Create a new project</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Start a new project or find collaborators for your idea
                        </p>
                        <Button>New Project</Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="notifications" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {notifications.map((notification, i) => (
                          <div key={i} className="flex items-start gap-4 py-4 border-b last:border-0">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={notification.avatar} />
                              <AvatarFallback>{notification.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="text-sm">
                                <span className="font-medium">{notification.name}</span>{" "}
                                {notification.action}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="messages" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {messages.map((message, i) => (
                          <div key={i} className="flex items-start gap-4 py-4 border-b last:border-0">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={message.avatar} />
                              <AvatarFallback>{message.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <p className="font-medium text-sm">{message.name}</p>
                                <p className="text-xs text-muted-foreground">{message.time}</p>
                              </div>
                              <p className="text-sm mt-1">{message.preview}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
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

// Sample data
const dashboardProjects = [
  {
    id: 1,
    title: "Smart Campus Navigation",
    description: "A mobile app that helps students navigate the campus efficiently.",
    status: "In Progress",
    updatedAt: "2 days ago",
    members: [
      { name: "Alex Johnson", avatar: "public/lovable-uploads/31753596-2d00-401f-a90b-826dea0b80f2.png" },
      { name: "Emily Rodriguez", avatar: "public/lovable-uploads/e90a5653-7ae3-4c4f-a254-5829b53b5172.png" }
    ]
  },
  {
    id: 2,
    title: "AI Study Assistant",
    description: "An AI-powered tool to help students organize study materials and create personalized learning plans.",
    status: "Planning",
    updatedAt: "5 days ago",
    members: [
      { name: "Alex Johnson", avatar: "public/lovable-uploads/31753596-2d00-401f-a90b-826dea0b80f2.png" },
      { name: "Dr. Sarah Williams", avatar: "public/lovable-uploads/35ad675b-9325-4c13-aa1f-b885708a3ff8.png" }
    ]
  },
  {
    id: 3,
    title: "College Marketplace App",
    description: "A platform for students to buy and sell used textbooks and other items within the college community.",
    status: "Not Started",
    updatedAt: "1 week ago",
    members: [
      { name: "Alex Johnson", avatar: "public/lovable-uploads/31753596-2d00-401f-a90b-826dea0b80f2.png" }
    ]
  }
];

const notifications = [
  {
    name: "Dr. Sarah Williams",
    avatar: "public/lovable-uploads/35ad675b-9325-4c13-aa1f-b885708a3ff8.png",
    action: "requested to join your 'AI Study Assistant' project",
    time: "2 hours ago"
  },
  {
    name: "Michael Chen",
    avatar: "public/lovable-uploads/dc24bf8c-9388-42bd-8479-210a4428b1f7.png",
    action: "commented on your 'Smart Campus Navigation' project",
    time: "Yesterday"
  },
  {
    name: "Emily Rodriguez",
    avatar: "public/lovable-uploads/e90a5653-7ae3-4c4f-a254-5829b53b5172.png",
    action: "shared a new project that matches your skills",
    time: "3 days ago"
  }
];

const messages = [
  {
    name: "Dr. Sarah Williams",
    avatar: "public/lovable-uploads/35ad675b-9325-4c13-aa1f-b885708a3ff8.png",
    preview: "Hi Alex, I'm interested in collaborating on your AI Study Assistant project. Could we discuss the details?",
    time: "10:45 AM"
  },
  {
    name: "Emily Rodriguez",
    avatar: "public/lovable-uploads/e90a5653-7ae3-4c4f-a254-5829b53b5172.png",
    preview: "The latest UI mockups are ready for review. Let me know what you think!",
    time: "Yesterday"
  },
  {
    name: "Michael Chen",
    avatar: "public/lovable-uploads/dc24bf8c-9388-42bd-8479-210a4428b1f7.png",
    preview: "I've pushed the latest code changes. The navigation feature is now working correctly.",
    time: "2 days ago"
  }
];
