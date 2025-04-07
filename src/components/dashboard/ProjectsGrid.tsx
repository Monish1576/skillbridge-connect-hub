
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

export const ProjectsGrid = ({ userProjects }: { userProjects: any[] }) => {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    // If user has projects, use those, otherwise use sample data
    if (userProjects && userProjects.length > 0) {
      setProjects(userProjects);
    } else {
      setProjects(dashboardProjects);
    }
  }, [userProjects]);

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="h-full hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-6 h-full">
              <div className="flex flex-col h-full">
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
                  {project.members.map((member: any, i: number) => (
                    <Avatar key={i} className="h-8 w-8 border-2 border-background">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>
                        {member.name ? member.name.split(" ").map((n: string) => n[0]).join("") : "U"}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                
                <div className="text-sm text-muted-foreground mb-4 mt-auto">
                  {project.updatedAt ? `Updated ${project.updatedAt}` : 
                   project.createdAt ? `Created ${new Date(project.createdAt).toLocaleDateString()}` : 
                   "No date available"}
                </div>
                
                <Button variant="secondary" className="w-full">View Project</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: (projects.length) * 0.1 }}
      >
        <Card className="border-dashed h-full">
          <CardContent className="p-6 h-full flex flex-col items-center justify-center text-center">
            <div className="rounded-full bg-secondary flex items-center justify-center w-12 h-12 mb-4">
              <Plus className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium mb-2">Create a new project</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Start a new project or find collaborators for your idea
            </p>
            <Link to="/new-project">
              <Button>New Project</Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

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
