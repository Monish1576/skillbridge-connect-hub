
import { useState, useEffect } from "react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profiles, projects } from "@/data/mockData";
import { SearchFilters } from "@/components/explore/SearchFilters";
import { ProfilesTab } from "@/components/explore/ProfilesTab";
import { ProjectsTab } from "@/components/explore/ProjectsTab";

export default function Explore() {
  const [searchTerm, setSearchTerm] = useState("");
  const [department, setDepartment] = useState("all-departments");
  const [role, setRole] = useState("all-roles");
  const [filteredProfiles, setFilteredProfiles] = useState(profiles);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  
  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setDepartment("all-departments");
    setRole("all-roles");
  };
  
  // Clear search only
  const clearSearch = () => {
    setSearchTerm("");
  };
  
  // Filter data based on search and filters
  useEffect(() => {
    // Filter profiles
    const profileResults = profiles.filter(profile => {
      // Check if search term matches name or skills
      const matchesSearch = searchTerm === "" || 
        profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Check if department filter matches
      const matchesDepartment = department === "all-departments" || 
        profile.department.toLowerCase().includes(department.replace(/-/g, " ").toLowerCase());
      
      // Check if role filter matches
      const matchesRole = role === "all-roles" || 
        profile.role.toLowerCase() === role.toLowerCase();
      
      // Return true if all filters match
      return matchesSearch && matchesDepartment && matchesRole;
    });
    
    setFilteredProfiles(profileResults);
    
    // Filter projects
    const projectResults = projects.filter(project => {
      // Check if search term matches title, description or skills
      const matchesSearch = searchTerm === "" || 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesSearch;
    });
    
    setFilteredProjects(projectResults);
  }, [searchTerm, department, role]);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1 container py-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Explore</h1>
          <p className="text-muted-foreground">
            Find students, lecturers, and projects based on skills and interests.
          </p>
          
          <SearchFilters 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            department={department}
            setDepartment={setDepartment}
            role={role}
            setRole={setRole}
            clearFilters={clearFilters}
          />

          <Tabs defaultValue="people" className="mt-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="people">People</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
            </TabsList>
            
            <TabsContent value="people" className="mt-6">
              <ProfilesTab 
                filteredProfiles={filteredProfiles}
                clearFilters={clearFilters}
              />
            </TabsContent>
            
            <TabsContent value="projects" className="mt-6">
              <ProjectsTab 
                filteredProjects={filteredProjects}
                clearSearch={clearSearch}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
