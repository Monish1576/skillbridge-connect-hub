
import { Button } from "@/components/ui/button";
import { ProjectCard } from "./ProjectCard";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  status: string;
  skills: string[];
}

interface ProjectsTabProps {
  filteredProjects: Project[];
  clearSearch: () => void;
}

export function ProjectsTab({ filteredProjects, clearSearch }: ProjectsTabProps) {
  if (filteredProjects.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-semibold mb-2">No projects found</h3>
        <p className="text-muted-foreground mb-4">Try adjusting your search criteria.</p>
        <Button 
          variant="outline" 
          onClick={clearSearch}
        >
          Clear Search
        </Button>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
