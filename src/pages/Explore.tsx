
import { useState, useEffect } from "react";
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
import { Link } from "react-router-dom";
import { profiles, projects } from "@/data/mockData";

export default function Explore() {
  const [searchTerm, setSearchTerm] = useState("");
  const [department, setDepartment] = useState("all-departments");
  const [role, setRole] = useState("all-roles");
  const [filteredProfiles, setFilteredProfiles] = useState(profiles);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  
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
          
          <div className="flex flex-col gap-4 sm:flex-row items-center">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, skill, or keyword..."
                className="pl-9 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Select 
                defaultValue="all-departments" 
                value={department}
                onValueChange={setDepartment}
              >
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
              
              <Select 
                defaultValue="all-roles" 
                value={role}
                onValueChange={setRole}
              >
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
              {filteredProfiles.length === 0 ? (
                <div className="text-center py-10">
                  <h3 className="text-xl font-semibold mb-2">No results found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your search or filters.</p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm("");
                      setDepartment("all-departments");
                      setRole("all-roles");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProfiles.map((profile) => (
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
                        <Link to={`/user/${profile.id}`}>
                          <Button variant="secondary" className="w-full">View Profile</Button>
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="projects" className="mt-6">
              {filteredProjects.length === 0 ? (
                <div className="text-center py-10">
                  <h3 className="text-xl font-semibold mb-2">No projects found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your search criteria.</p>
                  <Button 
                    variant="outline" 
                    onClick={() => setSearchTerm("")}
                  >
                    Clear Search
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((project) => (
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
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
