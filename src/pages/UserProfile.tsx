
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { SkillTag } from "@/components/SkillTag";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Calendar, GraduationCap, Mail, MapPin, Phone, User } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

interface Profile {
  id: string;
  full_name: string;
  role: string;
  department: string;
  bio?: string;
  email?: string;
  phone?: string;
  location?: string;
  avatar_url?: string;
  skills?: string[];
  joined_at?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  image?: string;
  skills?: string[];
}

interface Connection {
  id: string;
  user_id: string;
  connected_user_id: string;
  created_at: string;
}

export default function UserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userProjects, setUserProjects] = useState<Project[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [connectLoading, setConnectLoading] = useState(false);

  useEffect(() => {
    async function fetchProfileData() {
      try {
        setLoading(true);

        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
          if (profileError.code === 'PGRST116') {
            toast.error('User profile not found');
          } else {
            toast.error('Error loading profile data');
          }
          return;
        }

        // Fetch user's projects
        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select('*')
          .eq('creator_id', userId);

        if (projectsError) {
          console.error('Error fetching projects:', projectsError);
        }

        // Check if current user is connected to this profile
        if (user && user.id !== userId) {
          const { data: connectionData, error: connectionError } = await supabase
            .from('connections')
            .select('*')
            .eq('user_id', user.id)
            .eq('connected_user_id', userId)
            .maybeSingle();

          if (connectionError) {
            console.error('Error checking connection:', connectionError);
          } else {
            setIsConnected(!!connectionData);
          }
        }

        // Set the profile and projects data
        setProfile(profileData);
        setUserProjects(projectsData || []);
      } catch (error) {
        console.error('Unexpected error:', error);
        toast.error('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      fetchProfileData();
    }
  }, [userId, user]);

  const handleConnectClick = async () => {
    if (!user) {
      navigate("/auth");
      toast.info("Please log in to connect with users");
      return;
    }

    if (user.id === userId) {
      toast.info("You cannot connect with yourself");
      return;
    }

    try {
      setConnectLoading(true);

      if (isConnected) {
        // Disconnect
        const { error } = await supabase
          .from('connections')
          .delete()
          .eq('user_id', user.id)
          .eq('connected_user_id', userId);

        if (error) {
          console.error('Error disconnecting:', error);
          toast.error('Failed to disconnect. Please try again.');
          return;
        }

        setIsConnected(false);
        toast.success("Successfully disconnected");
      } else {
        // Connect
        const { error } = await supabase
          .from('connections')
          .insert({
            user_id: user.id,
            connected_user_id: userId,
          });

        if (error) {
          console.error('Error connecting:', error);
          toast.error('Failed to connect. Please try again.');
          return;
        }

        setIsConnected(true);
        toast.success("Successfully connected");
      }
    } catch (error) {
      console.error('Error toggling connection:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setConnectLoading(false);
    }
  };

  const handleMessageClick = () => {
    navigate("/feature-coming-soon/messages");
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
              <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
              <AvatarFallback className="text-3xl">{profile.full_name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
            </Avatar>
            <div className="space-y-2 text-center md:text-left">
              <h1 className="text-3xl font-bold">{profile.full_name}</h1>
              <p className="text-xl text-muted-foreground">{profile.role} • {profile.department}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 my-3">
                {profile.skills && profile.skills.map((skill: string) => (
                  <SkillTag key={skill} skill={skill} />
                ))}
              </div>
              <div className="flex gap-3 pt-2 justify-center md:justify-start">
                {user && user.id !== userId ? (
                  <>
                    <Button 
                      onClick={handleConnectClick} 
                      disabled={connectLoading}
                      variant={isConnected ? "outline" : "default"}
                    >
                      {isConnected ? "Disconnect" : "Connect"}
                    </Button>
                    <Button variant="outline" onClick={handleMessageClick}>
                      Message
                    </Button>
                  </>
                ) : user && user.id === userId ? (
                  <Link to="/profile-setup">
                    <Button variant="outline">Edit Profile</Button>
                  </Link>
                ) : null}
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
                {profile.location && (
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <span>{profile.location}</span>
                  </div>
                )}
                {profile.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <a href={`mailto:${profile.email}`} className="hover:underline">{profile.email}</a>
                  </div>
                )}
                {profile.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <a href={`tel:${profile.phone}`} className="hover:underline">{profile.phone}</a>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <span>Joined {profile.joined_at ? new Date(profile.joined_at).toLocaleDateString() : 'recently'}</span>
                </div>

                <div className="pt-4">
                  <h3 className="font-semibold mb-2">Bio</h3>
                  <p className="text-muted-foreground">
                    {profile.bio || `${profile.full_name} hasn't added a bio yet.`}
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
                  ) : (
                    <Card>
                      <CardContent className="p-6 text-center">
                        <Briefcase className="mx-auto h-12 w-12 text-muted-foreground/60 mb-4" />
                        <h3 className="font-semibold text-lg mb-2">No Projects Yet</h3>
                        <p className="text-muted-foreground mb-4">
                          {profile.full_name} hasn't added any projects to their profile yet.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
                
                <TabsContent value="experience" className="mt-6">
                  <h2 className="text-xl font-semibold mb-4">Experience</h2>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Briefcase className="mx-auto h-12 w-12 text-muted-foreground/60 mb-4" />
                      <h3 className="font-semibold text-lg mb-2">No Experience Added</h3>
                      <p className="text-muted-foreground mb-4">
                        {profile.full_name} hasn't added any experience details yet.
                      </p>
                      {user && user.id === userId && (
                        <Button variant="outline" size="sm" onClick={() => navigate('/profile-setup')}>
                          Add Experience
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="education" className="mt-6">
                  <h2 className="text-xl font-semibold mb-4">Education</h2>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <GraduationCap className="mx-auto h-12 w-12 text-muted-foreground/60 mb-4" />
                      <h3 className="font-semibold text-lg mb-2">No Education Added</h3>
                      <p className="text-muted-foreground mb-4">
                        {profile.full_name} hasn't added any education details yet.
                      </p>
                      {user && user.id === userId && (
                        <Button variant="outline" size="sm" onClick={() => navigate('/profile-setup')}>
                          Add Education
                        </Button>
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
