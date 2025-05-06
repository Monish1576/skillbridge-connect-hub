import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "@/components/Logo";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";

export default function ProfileSetup() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    fullName: "",
    role: "",
    department: "",
    skills: "",
    bio: "",
    pronouns: "",
    phone: "",
    linkedIn: "",
    twitter: "",
    github: "",
    profilePicture: null as File | null
  });

  const [previewing, setPreviewing] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      toast.error("You need to be logged in to setup your profile");
      navigate('/login');
      return;
    }

    // Fetch existing profile data
    const fetchProfileData = async () => {
      try {
        // First try to get from localStorage
        const userData = localStorage.getItem('userData');
        if (userData) {
          const parsedData = JSON.parse(userData);
          setProfileData(prev => ({
            ...prev,
            ...parsedData
          }));
          
          if (parsedData.profilePicture) {
            setPreviewing(parsedData.profilePicture);
          }
        }

        // Then fetch from Supabase if available
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
        } else if (data) {
          setProfileData(prev => ({
            ...prev,
            fullName: data.full_name || prev.fullName,
            role: data.role || prev.role,
            department: data.department || prev.department,
            bio: data.bio || prev.bio,
            phone: data.phone || prev.phone,
            skills: data.skills ? data.skills.join(', ') : prev.skills,
          }));

          if (data.avatar_url) {
            setPreviewing(data.avatar_url);
          }
        }
      } catch (error) {
        console.error('Error loading profile data:', error);
      }
    };

    fetchProfileData();
  }, [user, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileData((prev) => ({ ...prev, profilePicture: file }));
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewing(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You need to be logged in to update your profile");
      return;
    }
    
    setLoading(true);
    
    try {
      // Prepare skills array from comma-separated string
      const skillsArray = profileData.skills
        .split(',')
        .map(skill => skill.trim())
        .filter(skill => skill !== '');
      
      // Update Supabase profile
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: profileData.fullName,
          role: profileData.role,
          department: profileData.department,
          bio: profileData.bio,
          phone: profileData.phone,
          skills: skillsArray,
          // Add other fields as needed
        });
      
      if (error) {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile");
        return;
      }
      
      // Update localStorage for UI components
      const updatedUserData = {
        ...profileData,
        profilePicture: previewing,
        skills: skillsArray
      };
      
      localStorage.setItem('userData', JSON.stringify(updatedUserData));
      toast.success("Profile updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container max-w-4xl py-10">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <div className="rounded-lg border bg-card p-8">
          <h1 className="text-2xl font-semibold mb-6">Complete Your Profile</h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={previewing || ""} />
                  <AvatarFallback className="text-2xl">
                    {profileData.fullName ? profileData.fullName.split(" ").map(n => n[0]).join("") : "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Label 
                    htmlFor="profile-picture" 
                    className="cursor-pointer inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
                  >
                    Upload Photo
                  </Label>
                  <Input
                    id="profile-picture"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <div className="flex-1 grid gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="Your full name"
                    value={profileData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
              
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department/Major</Label>
                    <Input
                      id="department"
                      name="department"
                      placeholder="Computer Science, Business, etc."
                      value={profileData.department}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input
                      id="role"
                      name="role"
                      placeholder="Student, Faculty, etc."
                      value={profileData.role}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="pronouns">Pronouns (Optional)</Label>
                  <Input
                    id="pronouns"
                    name="pronouns"
                    placeholder="They/Them, She/Her, etc."
                    value={profileData.pronouns}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="skills">Skills (comma-separated)</Label>
                  <Input
                    id="skills"
                    name="skills"
                    placeholder="React, Python, UI/UX Design, Research, etc."
                    value={profileData.skills}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    placeholder="Tell others about yourself..."
                    className="min-h-[100px]"
                    value={profileData.bio}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Your phone number"
                      value={profileData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Social Accounts</Label>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Input
                      name="linkedIn"
                      placeholder="LinkedIn URL"
                      value={profileData.linkedIn}
                      onChange={handleChange}
                    />
                    <Input
                      name="twitter"
                      placeholder="Twitter/X URL"
                      value={profileData.twitter}
                      onChange={handleChange}
                    />
                    <Input
                      name="github"
                      placeholder="GitHub URL"
                      value={profileData.github}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button type="submit">Update Profile</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
