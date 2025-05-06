
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileProjects } from "./ProfileProjects";
import { ProfileExperience } from "./ProfileExperience";
import { ProfileEducation } from "./ProfileEducation";

interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  image?: string;
  skills?: string[];
}

interface ProfileContentProps {
  userProjects: Project[];
  profileName: string;
  profileId: string;
}

export function ProfileContent({ userProjects, profileName, profileId }: ProfileContentProps) {
  return (
    <Tabs defaultValue="projects">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="projects">Projects</TabsTrigger>
        <TabsTrigger value="experience">Experience</TabsTrigger>
        <TabsTrigger value="education">Education</TabsTrigger>
      </TabsList>
      
      <TabsContent value="projects" className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Projects</h2>
        <ProfileProjects 
          userProjects={userProjects} 
          profileName={profileName} 
          profileId={profileId} 
        />
      </TabsContent>
      
      <TabsContent value="experience" className="mt-6">
        <ProfileExperience 
          profileName={profileName} 
          profileId={profileId} 
        />
      </TabsContent>
      
      <TabsContent value="education" className="mt-6">
        <ProfileEducation 
          profileName={profileName} 
          profileId={profileId} 
        />
      </TabsContent>
    </Tabs>
  );
}
