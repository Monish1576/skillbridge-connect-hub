
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

type ProjectMember = {
  name: string;
  avatar?: string;
}

type Project = {
  id: string | number;
  title: string;
  description: string;
  status: string;
  created_at?: string;
  updated_at?: string;
  members: ProjectMember[];
}

export const ProjectsGrid = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserProjects() {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Fetch projects associated with the current user
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('user_id', user.id);
        
        if (error) {
          console.error('Error fetching projects:', error);
          return;
        }
        
        // Transform the data to match our Project type
        const formattedProjects = data.map(project => ({
          id: project.id,
          title: project.title || 'Untitled Project',
          description: project.description || 'No description provided',
          status: project.status || 'Not Started',
          created_at: project.created_at,
          updated_at: project.updated_at,
          // For now, we'll just show the current user as the only member
          members: [{ 
            name: user.user_metadata?.full_name || 'User',
            avatar: user.user_metadata?.avatar_url
          }]
        }));
        
        setProjects(formattedProjects);
        
      } catch (error) {
        console.error('Error in fetchUserProjects:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUserProjects();
  }, [user]);

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 gap-4">
        {[1, 2].map((i) => (
          <Card key={i} className="h-full">
            <CardContent className="p-6 h-full">
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-secondary rounded w-3/4"></div>
                <div className="h-4 bg-secondary rounded w-full"></div>
                <div className="h-4 bg-secondary rounded w-1/2"></div>
                <div className="flex space-x-2">
                  <div className="h-8 w-8 bg-secondary rounded-full"></div>
                  <div className="h-8 w-8 bg-secondary rounded-full"></div>
                </div>
                <div className="h-10 bg-secondary rounded w-full mt-auto"></div>
              </div>
            </CardContent>
          </Card>
        ))}
        
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
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {projects.length > 0 ? (
        <>
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
                      {project.members.map((member, i) => (
                        <Avatar key={i} className="h-8 w-8 border-2 border-background">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>
                            {member.name ? member.name.split(" ").map((n) => n[0]).join("") : "U"}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    
                    <div className="text-sm text-muted-foreground mb-4 mt-auto">
                      {project.updated_at ? `Updated ${new Date(project.updated_at).toLocaleDateString()}` : 
                      project.created_at ? `Created ${new Date(project.created_at).toLocaleDateString()}` : 
                      "No date available"}
                    </div>
                    
                    <Button variant="secondary" className="w-full">View Project</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </>
      ) : (
        <Card className="col-span-2">
          <CardContent className="p-6 text-center py-10">
            <h3 className="text-lg font-medium mb-2">No projects yet</h3>
            <p className="text-muted-foreground mb-6">
              You haven't created any projects yet. Get started by creating your first project.
            </p>
          </CardContent>
        </Card>
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
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
