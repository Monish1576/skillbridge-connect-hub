
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SkillTag } from "@/components/SkillTag";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  status: string;
  skills: string[];
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
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
  );
}
