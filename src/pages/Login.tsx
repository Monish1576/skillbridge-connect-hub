
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/Logo";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // In a real application, you would validate against a backend
    // For now, we'll simulate a successful login and store user data
    const userData = {
      fullName: "Your Name",
      email: email,
      role: "Student",
      department: "Computer Science",
      skills: "React, JavaScript, UI Design",
      profilePicture: "public/lovable-uploads/31753596-2d00-401f-a90b-826dea0b80f2.png"
    };
    
    // Store in localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', 'true');
    
    console.log("Login attempted with:", { email, password });
    toast.success("Logged in successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <Logo />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Log in</h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" className="col-span-1">
                Google
              </Button>
              <Button variant="outline" className="col-span-1">
                GitHub
              </Button>
              <Button variant="outline" className="col-span-1">
                Email
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Log in
              </Button>
            </form>
          </div>
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
