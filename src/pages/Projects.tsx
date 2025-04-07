
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SkillTag } from "@/components/SkillTag";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Calendar, Users, BarChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Projects() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1 container py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Projects</h1>
            <p className="text-muted-foreground">
              Discover ongoing projects or share your own ideas with the community
            </p>
          </div>
          <Button>
            New Project
          </Button>
        </div>
        
        <div className="flex flex-col gap-4 sm:flex-row items-end mb-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects by title, description, or skills..."
              className="pl-9 w-full"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Select defaultValue="all-projects">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Projects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-projects">All Projects</SelectItem>
                <SelectItem value="my-projects">My Projects</SelectItem>
                <SelectItem value="collaborating">Collaborating</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="most-recent">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Most Recent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="most-recent">Most Recent</SelectItem>
                <SelectItem value="most-popular">Most Popular</SelectItem>
                <SelectItem value="ending-soon">Ending Soon</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="ongoing" className="mt-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="ongoing">Ongoing Projects</TabsTrigger>
            <TabsTrigger value="completed">Completed Projects</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ongoing" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ongoingProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden">
                  <div className="relative aspect-video bg-muted">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="object-cover w-full h-full"
                    />
                    <Badge className="absolute top-2 right-2" variant={project.status === "Looking for Collaborators" ? "destructive" : "secondary"}>
                      {project.status}
                    </Badge>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.skills.slice(0, 3).map((skill) => (
                        <SkillTag key={skill} skill={skill} size="sm" />
                      ))}
                      {project.skills.length > 3 && (
                        <span className="text-xs bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded-full font-medium">
                          +{project.skills.length - 3} more
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{project.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>Team: {project.team}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex -space-x-2">
                        {project.members.map((member, i) => (
                          <Avatar key={i} className="h-8 w-8 border-2 border-background">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{member.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <Badge variant={
                        project.priority === "High" ? "destructive" : 
                        project.priority === "Medium" ? "default" : 
                        "secondary"
                      }>
                        {project.priority} Priority
                      </Badge>
                    </div>
                    <Button variant="secondary" className="w-full">View Project</Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {completedProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden">
                  <div className="relative aspect-video bg-muted">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="object-cover w-full h-full"
                    />
                    <Badge className="absolute top-2 right-2" variant="outline">
                      Completed
                    </Badge>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.skills.slice(0, 3).map((skill) => (
                        <SkillTag key={skill} skill={skill} size="sm" />
                      ))}
                      {project.skills.length > 3 && (
                        <span className="text-xs bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded-full font-medium">
                          +{project.skills.length - 3} more
                        </span>
                      )}
                    </div>
                    <div className="flex items-center mb-2">
                      <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Completed: {project.completedDate}</span>
                    </div>
                    <div className="flex items-center mb-4">
                      <BarChart className="h-4 w-4 mr-1 text-muted-foreground" />
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-4 h-4 ${
                              star <= project.rating
                                ? "text-yellow-400"
                                : "text-gray-400"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-1 text-sm font-medium">{project.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm italic mb-4">
                      "{project.feedback}"
                    </p>
                    <div className="flex items-center mb-4">
                      <div className="flex -space-x-2">
                        {project.members.map((member, i) => (
                          <Avatar key={i} className="h-8 w-8 border-2 border-background">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{member.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    </div>
                    <Button variant="secondary" className="w-full">View Project</Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}

// Sample data
const ongoingProjects = [
  {
    id: 1,
    title: "Smart Campus Navigation",
    description: "A mobile app that helps students navigate the campus efficiently.",
    status: "In Progress",
    image: "public/lovable-uploads/1b73ab93-94f5-4cf6-9f9c-1dd1aa98ae55.png",
    skills: ["React Native", "Google Maps API", "Firebase"],
    date: "2 days ago",
    team: 4,
    priority: "Medium",
    members: [
      { name: "Alex Johnson", avatar: "public/lovable-uploads/31753596-2d00-401f-a90b-826dea0b80f2.png" },
      { name: "Emily Rodriguez", avatar: "public/lovable-uploads/e90a5653-7ae3-4c4f-a254-5829b53b5172.png" }
    ]
  },
  {
    id: 2,
    title: "AI Study Assistant",
    description: "An AI-powered tool to help students organize study materials and create personalized learning plans.",
    status: "Looking for Collaborators",
    image: "public/lovable-uploads/1b73ab93-94f5-4cf6-9f9c-1dd1aa98ae55.png",
    skills: ["Python", "Machine Learning", "NLP", "React"],
    date: "5 days ago",
    team: 3,
    priority: "High",
    members: [
      { name: "Dr. Sarah Williams", avatar: "public/lovable-uploads/35ad675b-9325-4c13-aa1f-b885708a3ff8.png" }
    ]
  },
  {
    id: 3,
    title: "Smart Energy Monitor",
    description: "IoT device to monitor and optimize energy usage in college buildings.",
    status: "Looking for Collaborators",
    image: "public/lovable-uploads/1b73ab93-94f5-4cf6-9f9c-1dd1aa98ae55.png",
    skills: ["Arduino", "IoT", "PCB Design", "Data Visualization"],
    date: "1 week ago",
    team: 4,
    priority: "Medium",
    members: [
      { name: "Michael Chen", avatar: "public/lovable-uploads/dc24bf8c-9388-42bd-8479-210a4428b1f7.png" }
    ]
  },
  {
    id: 4,
    title: "College Marketplace App",
    description: "A platform for students to buy and sell used textbooks and other items within the college community.",
    status: "Planning",
    image: "public/lovable-uploads/1b73ab93-94f5-4cf6-9f9c-1dd1aa98ae55.png",
    skills: ["React", "Node.js", "MongoDB", "UI/UX Design"],
    date: "2 weeks ago",
    team: 5,
    priority: "Low",
    members: [
      { name: "Emily Rodriguez", avatar: "public/lovable-uploads/e90a5653-7ae3-4c4f-a254-5829b53b5172.png" }
    ]
  }
];

const completedProjects = [
  {
    id: 1,
    title: "Virtual Study Group Platform",
    description: "A web application for students to form and manage virtual study groups.",
    image: "public/lovable-uploads/1b73ab93-94f5-4cf6-9f9c-1dd1aa98ae55.png",
    skills: ["React", "Firebase", "WebRTC", "Real-time Communication"],
    completedDate: "Oct 15, 2023",
    rating: 4.8,
    feedback: "Excellent project that's now being used by over 200 students in our college.",
    members: [
      { name: "Alex Johnson", avatar: "public/lovable-uploads/31753596-2d00-401f-a90b-826dea0b80f2.png" },
      { name: "Emily Rodriguez", avatar: "public/lovable-uploads/e90a5653-7ae3-4c4f-a254-5829b53b5172.png" }
    ]
  },
  {
    id: 2,
    title: "Automated Attendance System",
    description: "A facial recognition system for automating class attendance tracking.",
    image: "public/lovable-uploads/1b73ab93-94f5-4cf6-9f9c-1dd1aa98ae55.png",
    skills: ["Python", "OpenCV", "Machine Learning", "Face Recognition"],
    completedDate: "Aug 30, 2023",
    rating: 4.5,
    feedback: "Successfully implemented in 5 classrooms. The department is considering expanding it campus-wide.",
    members: [
      { name: "Dr. Sarah Williams", avatar: "public/lovable-uploads/35ad675b-9325-4c13-aa1f-b885708a3ff8.png" },
      { name: "Michael Chen", avatar: "public/lovable-uploads/dc24bf8c-9388-42bd-8479-210a4428b1f7.png" }
    ]
  }
];
