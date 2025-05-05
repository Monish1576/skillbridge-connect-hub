
import { useState, useEffect } from "react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchFilters } from "@/components/explore/SearchFilters";
import { ProfilesTab } from "@/components/explore/ProfilesTab";
import { ProjectsTab } from "@/components/explore/ProjectsTab";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { projects } from "@/data/mockData"; // Keep mock projects for now

interface Profile {
  id: string;
  full_name: string;
  role: string;
  department: string;
  avatar_url?: string;
  skills?: string[];
}

export default function Explore() {
  const [searchTerm, setSearchTerm] = useState("");
  const [department, setDepartment] = useState("all-departments");
  const [role, setRole] = useState("all-roles");
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [loading, setLoading] = useState(true);
  
  // Fetch profiles from Supabase
  useEffect(() => {
    async function fetchProfiles() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('id, full_name, role, department, avatar_url, skills');
        
        if (error) {
          console.error('Error fetching profiles:', error);
          toast.error('Failed to load profiles');
        } else {
          console.log('Profiles fetched:', data);
          setProfiles(data || []);
          setFilteredProfiles(data || []);
        }
      } catch (error) {
        console.error('Error in fetchProfiles:', error);
        toast.error('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    }
    
    fetchProfiles();
  }, []);
  
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
        (profile.full_name && profile.full_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (profile.skills && profile.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())));
      
      // Check if department filter matches
      const matchesDepartment = department === "all-departments" || 
        (profile.department && profile.department.toLowerCase().includes(department.replace(/-/g, " ").toLowerCase()));
      
      // Check if role filter matches
      const matchesRole = role === "all-roles" || 
        (profile.role && profile.role.toLowerCase() === role.toLowerCase());
      
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
  }, [searchTerm, department, role, profiles]);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1 container py-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Explore</h1>
          <p className="text-muted-foreground">
            Find students, faculty, and projects based on skills and interests.
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
              {loading ? (
                <div className="text-center py-10">
                  <p>Loading profiles...</p>
                </div>
              ) : (
                <ProfilesTab 
                  filteredProfiles={filteredProfiles}
                  clearFilters={clearFilters}
                />
              )}
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
