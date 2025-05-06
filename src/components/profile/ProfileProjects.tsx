
import { Card, CardContent } from "@/components/ui/card";
import { SkillTag } from "@/components/SkillTag";
import { Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";

interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  image?: string;
  skills?: string[];
}

interface ProfileProjectsProps {
  userProjects: Project[];
  profileName: string;
  profileId: string;
}

export function ProfileProjects({ userProjects, profileName, profileId }: ProfileProjectsProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  if (userProjects.length > 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {userProjects.map(project => (
          <Card key={project.id}>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-1">{project.title}</h3>
              <p className="text-muted-foreground text-sm mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {project.skills && project.skills.slice(0, 3).map((skill: string) => (
                  <SkillTag key={skill} skill={skill} size="sm" />
                ))}
                {project.skills && project.skills.length > 3 && (
                  <span className="text-xs bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded-full font-medium">
                    +{project.skills.length - 3} more
                  </span>
                )}
              </div>
              <div className="text-xs text-muted-foreground">
                <span className="font-medium px-2 py-1 bg-accent rounded-full">
                  {project.status}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  
  return (
    <Card>
      <CardContent className="p-6 text-center">
        <Briefcase className="mx-auto h-12 w-12 text-muted-foreground/60 mb-4" />
        <h3 className="font-semibold text-lg mb-2">No Projects Yet</h3>
        <p className="text-muted-foreground mb-4">
          {profileName} hasn't added any projects to their profile yet.
        </p>
        {user && user.id === profileId && (
          <Button variant="outline" size="sm" onClick={() => navigate('/new-project')}>
            Add Project
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
