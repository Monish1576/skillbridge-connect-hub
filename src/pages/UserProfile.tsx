
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { SkillTag } from "@/components/SkillTag";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Calendar, GraduationCap, Mail, MapPin, User, Users } from "lucide-react";
import { toast } from "sonner";
import { profiles, projects } from "@/data/mockData";

export default function UserProfile() {
  const { userId } = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userProjects, setUserProjects] = useState<any[]>([]);

  useEffect(() => {
    // Simulating API call to fetch user profile
    setLoading(true);
    setTimeout(() => {
      const foundProfile = profiles.find(p => p.id === userId);
      if (foundProfile) {
        setProfile(foundProfile);
        // Filter projects that may belong to this user (for mock data)
        // Convert string IDs to numbers for comparison
        const userIdNum = parseInt(foundProfile.id);
        const profilesLength = profiles.length;
        const filteredProjects = projects.filter((_, index) => index % profilesLength === (userIdNum - 1) % profilesLength);
        setUserProjects(filteredProjects);
      }
      setLoading(false);
    }, 500);
  }, [userId]);

  const handleConnectClick = () => {
    toast.success("Connection request sent!");
  };

  const handleMessageClick = () => {
    toast.info("Direct messaging will be available soon!");
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-1 container py-12">
          <div className="animate-pulse space-y-6">
            <div className="h-40 bg-secondary rounded-lg"></div>
            <div className="h-8 w-1/3 bg-secondary rounded-lg"></div>
            <div className="h-4 w-1/2 bg-secondary rounded-lg"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="h-48 bg-secondary rounded-lg"></div>
              <div className="h-48 md:col-span-2 bg-secondary rounded-lg"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-1 container py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">User Not Found</h1>
          <p className="text-muted-foreground mb-8">The user profile you're looking for doesn't exist.</p>
          <Link to="/explore">
            <Button>Back to Explore</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1 container py-8">
        <div className="space-y-8">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <Avatar className="h-32 w-32 border-4 border-background">
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback className="text-3xl">{profile.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
            </Avatar>
            <div className="space-y-2 text-center md:text-left">
              <h1 className="text-3xl font-bold">{profile.name}</h1>
              <p className="text-xl text-muted-foreground">{profile.role} • {profile.department}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 my-3">
                {profile.skills.map((skill: string) => (
                  <SkillTag key={skill} skill={skill} />
                ))}
              </div>
              <div className="flex gap-3 pt-2 justify-center md:justify-start">
                <Button onClick={handleConnectClick}>Connect</Button>
                <Button variant="outline" onClick={handleMessageClick}>
                  Message
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Sidebar - Info */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <span>{profile.role}</span>
                </div>
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-5 w-5 text-muted-foreground" />
                  <span>{profile.department}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <span>University Campus</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <span>{profile.name.toLowerCase().replace(" ", ".")}@university.edu</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <span>Joined January 2023</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span>35 Connections</span>
                </div>

                <div className="pt-4">
                  <h3 className="font-semibold mb-2">Bio</h3>
                  <p className="text-muted-foreground">
                    {profile.role === "Student" 
                      ? `A passionate ${profile.department} student looking to collaborate on innovative projects and expand my knowledge in ${profile.skills.join(", ")}.`
                      : `Experienced ${profile.department} professional with expertise in ${profile.skills.join(", ")}. Always looking to mentor students and collaborate on research.`
                    }
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Main Content - Tabs */}
            <div className="md:col-span-2">
              <Tabs defaultValue="projects">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                </TabsList>
                
                <TabsContent value="projects" className="mt-6">
                  <h2 className="text-xl font-semibold mb-4">Projects</h2>
                  {userProjects.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {userProjects.map(project => (
                        <Card key={project.id}>
                          <div className="aspect-video overflow-hidden rounded-t-lg">
                            <img 
                              src={project.image} 
                              alt={project.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-semibold text-lg mb-1">{project.title}</h3>
                            <p className="text-muted-foreground text-sm mb-3">{project.description}</p>
                            <div className="flex flex-wrap gap-1 mb-3">
                              {project.skills.slice(0, 3).map((skill: string) => (
                                <SkillTag key={skill} skill={skill} size="sm" />
                              ))}
                              {project.skills.length > 3 && (
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
                  ) : (
                    <Card>
                      <CardContent className="p-6 text-center">
                        <Briefcase className="mx-auto h-12 w-12 text-muted-foreground/60 mb-4" />
                        <h3 className="font-semibold text-lg mb-2">No Projects Yet</h3>
                        <p className="text-muted-foreground mb-4">
                          {profile.name} hasn't added any projects to their profile yet.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
                
                <TabsContent value="experience" className="mt-6">
                  <h2 className="text-xl font-semibold mb-4">Experience</h2>
                  <Card>
                    <CardContent className="p-6 space-y-6">
                      {profile.role === "Student" ? (
                        <>
                          <div className="flex items-start gap-4">
                            <Avatar className="h-10 w-10 mt-1">
                              <AvatarFallback>UL</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold">Research Assistant</h3>
                              <p className="text-muted-foreground">University Laboratory</p>
                              <p className="text-sm text-muted-foreground">Sep 2022 - Present</p>
                              <p className="mt-2">Assisting with research projects in the field of {profile.department}.</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <Avatar className="h-10 w-10 mt-1">
                              <AvatarFallback>LI</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold">Summer Intern</h3>
                              <p className="text-muted-foreground">Local Industry</p>
                              <p className="text-sm text-muted-foreground">Jun 2022 - Aug 2022</p>
                              <p className="mt-2">Gained practical experience in {profile.skills[0]} and {profile.skills[1]}.</p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-start gap-4">
                            <Avatar className="h-10 w-10 mt-1">
                              <AvatarFallback>UN</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold">{profile.role}</h3>
                              <p className="text-muted-foreground">University</p>
                              <p className="text-sm text-muted-foreground">Sep 2018 - Present</p>
                              <p className="mt-2">Teaching and researching in the field of {profile.department}, with focus on {profile.skills.slice(0, 2).join(" and ")}.</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <Avatar className="h-10 w-10 mt-1">
                              <AvatarFallback>RI</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold">Senior Researcher</h3>
                              <p className="text-muted-foreground">Research Institute</p>
                              <p className="text-sm text-muted-foreground">Jan 2015 - Aug 2018</p>
                              <p className="mt-2">Led research projects in {profile.skills[0]} and {profile.skills[1]}.</p>
                            </div>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="education" className="mt-6">
                  <h2 className="text-xl font-semibold mb-4">Education</h2>
                  <Card>
                    <CardContent className="p-6 space-y-6">
                      {profile.role === "Student" ? (
                        <div className="flex items-start gap-4">
                          <Avatar className="h-10 w-10 mt-1">
                            <AvatarFallback>UN</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">Bachelor's in {profile.department}</h3>
                            <p className="text-muted-foreground">University</p>
                            <p className="text-sm text-muted-foreground">Sep 2020 - Present</p>
                            <p className="mt-2">Focusing on {profile.skills.slice(0, 2).join(" and ")} with excellent academic standing.</p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-start gap-4">
                            <Avatar className="h-10 w-10 mt-1">
                              <AvatarFallback>UN</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold">PhD in {profile.department}</h3>
                              <p className="text-muted-foreground">University</p>
                              <p className="text-sm text-muted-foreground">Sep 2012 - Jun 2015</p>
                              <p className="mt-2">Research focused on {profile.skills[0]} and its applications in the field.</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <Avatar className="h-10 w-10 mt-1">
                              <AvatarFallback>UN</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold">Master's in {profile.department}</h3>
                              <p className="text-muted-foreground">University</p>
                              <p className="text-sm text-muted-foreground">Sep 2010 - Jun 2012</p>
                              <p className="mt-2">Specialized in {profile.skills[1]} with honors.</p>
                            </div>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
