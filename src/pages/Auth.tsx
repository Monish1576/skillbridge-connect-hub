
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Logo } from "@/components/Logo";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

export default function Auth() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("student");
  const [department, setDepartment] = useState("");
  const { user } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      console.log("User already logged in, redirecting to dashboard");
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !password || !fullName) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setLoading(true);
    
    try {
      console.log("Starting signup process with:", { email, fullName, role, department });
      
      // Step 1: Create the auth user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role,
            department: department
          }
        }
      });

      if (error) {
        console.error("Sign up error:", error.message);
        toast.error(error.message);
      } else if (data.user) {
        console.log("User created successfully:", data.user.id);
        
        // Step 2: Create profile record (if not created by trigger)
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({ 
            id: data.user.id,
            full_name: fullName,
            role: role,
            department: department,
          }, { onConflict: 'id' });

        if (profileError) {
          console.error("Profile creation error:", profileError);
          // Continue anyway since the trigger should handle this
        }
        
        toast.success("Account created successfully! Check your email for confirmation.");
        navigate("/profile-setup");
      }
    } catch (error) {
      console.error("Unexpected sign up error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please provide both email and password");
      return;
    }
    
    setLoading(true);
    
    try {
      console.log("Starting signin process with:", email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Sign in error:", error.message);
        toast.error(error.message);
      } else if (data.user) {
        console.log("User signed in successfully:", data.user.id);
        toast.success("Successfully signed in!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Sign in error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const departments = [
    "Computer Science",
    "Information Technology",
    "Electrical Engineering",
    "Civil Engineering",
    "Mechanical Engineering", 
    "Electronics & Communication",
    "Business Administration",
    "Arts & Humanities",
    "Natural Sciences",
    "Social Sciences"
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-md space-y-6 p-6">
          <div className="text-center space-y-2">
            <div className="mb-4 flex justify-center">
              <Logo />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Welcome to SkillBridge</h1>
            <p className="text-sm text-muted-foreground">
              Sign in to your account or create a new one
            </p>
          </div>

          <Tabs defaultValue="signin" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-fullname">Full Name</Label>
                  <Input
                    id="signup-fullname"
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-role">Role</Label>
                  <select
                    id="signup-role"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    disabled={loading}
                  >
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                    <option value="staff">Staff</option>
                    <option value="professional">Professional</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-department">Department</Label>
                  <select
                    id="signup-department"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    disabled={loading}
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing up..." : "Sign Up"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
