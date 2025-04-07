
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SkillTag } from "@/components/SkillTag";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search } from "lucide-react";

export default function Explore() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1 container py-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Explore</h1>
          <p className="text-muted-foreground">
            Find students, lecturers, and projects based on skills and interests.
          </p>
          
          <div className="flex flex-col gap-4 sm:flex-row items-center">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, skill, or keyword..."
                className="pl-9 w-full"
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Select defaultValue="all-departments">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-departments">All Departments</SelectItem>
                  <SelectItem value="computer-science">Computer Science</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="arts">Arts & Design</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="all-roles">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-roles">All Roles</SelectItem>
                  <SelectItem value="student">Students</SelectItem>
                  <SelectItem value="lecturer">Lecturers</SelectItem>
                  <SelectItem value="staff">Other Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="people" className="mt-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="people">People</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
            </TabsList>
            
            <TabsContent value="people" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {profiles.map((profile) => (
                  <Card key={profile.id} className="overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={profile.avatar} />
                          <AvatarFallback>{profile.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-lg">{profile.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {profile.role} • {profile.department}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {profile.skills.slice(0, 3).map((skill) => (
                          <SkillTag key={skill} skill={skill} />
                        ))}
                        {profile.skills.length > 3 && (
                          <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full font-medium">
                            +{profile.skills.length - 3} more
                          </span>
                        )}
                      </div>
                      <Button variant="secondary" className="w-full">View Profile</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="projects" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <Card key={project.id} className="overflow-hidden">
                    <div className="relative aspect-video bg-muted">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute top-2 right-2 bg-background/90 text-foreground text-xs px-2 py-1 rounded-full">
                        {project.status}
                      </div>
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
                      <Button variant="secondary" className="w-full">View Project</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// Sample data
const profiles = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Student",
    department: "Computer Science",
    avatar: "public/lovable-uploads/31753596-2d00-401f-a90b-826dea0b80f2.png",
    skills: ["JavaScript", "React", "Node.js", "TypeScript"]
  },
  {
    id: 2,
    name: "Dr. Sarah Williams",
    role: "Lecturer",
    department: "Computer Science",
    avatar: "public/lovable-uploads/35ad675b-9325-4c13-aa1f-b885708a3ff8.png",
    skills: ["Python", "Machine Learning", "Deep Learning", "Data Analysis"]
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Student",
    department: "Electrical Engineering",
    avatar: "public/lovable-uploads/dc24bf8c-9388-42bd-8479-210a4428b1f7.png",
    skills: ["Circuit Design", "Arduino", "IoT", "Robotics"]
  },
  {
    id: 4,
    name: "Prof. James Wilson",
    role: "Lecturer",
    department: "Business",
    avatar: "public/lovable-uploads/a13b13cc-9079-4194-9cc7-67cdffeddba8.png",
    skills: ["Business Strategy", "Marketing", "Finance", "Leadership"]
  },
  {
    id: 5,
    name: "Emily Rodriguez",
    role: "Student",
    department: "Graphic Design",
    avatar: "public/lovable-uploads/e90a5653-7ae3-4c4f-a254-5829b53b5172.png",
    skills: ["UI/UX Design", "Adobe Photoshop", "Illustrator", "Typography"]
  },
  {
    id: 6,
    name: "David Kim",
    role: "Student",
    department: "Computer Science",
    avatar: "public/lovable-uploads/545fb43e-c4c3-433f-adbe-88ad1dcb2f33.png",
    skills: ["Mobile Development", "React Native", "Flutter", "Firebase"]
  }
];

const projects = [
  {
    id: 1,
    title: "Smart Campus Navigation",
    description: "A mobile app that helps students navigate the campus efficiently.",
    status: "In Progress",
    image: "public/lovable-uploads/1b73ab93-94f5-4cf6-9f9c-1dd1aa98ae55.png",
    skills: ["React Native", "Google Maps API", "Firebase"]
  },
  {
    id: 2,
    title: "AI Study Assistant",
    description: "An AI-powered tool to help students organize study materials and create personalized learning plans.",
    status: "Looking for Collaborators",
    image: "public/lovable-uploads/1b73ab93-94f5-4cf6-9f9c-1dd1aa98ae55.png",
    skills: ["Python", "Machine Learning", "NLP", "React"]
  },
  {
    id: 3,
    title: "Smart Energy Monitor",
    description: "IoT device to monitor and optimize energy usage in college buildings.",
    status: "Looking for Collaborators",
    image: "public/lovable-uploads/1b73ab93-94f5-4cf6-9f9c-1dd1aa98ae55.png",
    skills: ["Arduino", "IoT", "PCB Design", "Data Visualization"]
  },
  {
    id: 4,
    title: "College Marketplace App",
    description: "A platform for students to buy and sell used textbooks and other items within the college community.",
    status: "Planning",
    image: "public/lovable-uploads/1b73ab93-94f5-4cf6-9f9c-1dd1aa98ae55.png",
    skills: ["React", "Node.js", "MongoDB", "UI/UX Design"]
  }
];
