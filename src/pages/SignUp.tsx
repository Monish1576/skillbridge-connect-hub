
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Logo } from "@/components/Logo";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

export default function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "student"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData(prev => ({ ...prev, role: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast.success("Account created successfully! Please complete your profile.");
    window.location.href = "/profile-setup";
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <Logo />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
            <p className="text-sm text-muted-foreground">
              Join our community to connect with others and collaborate on projects.
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
              <div>
                <h3 className="mb-2 text-sm">I am a</h3>
                <RadioGroup 
                  defaultValue="student" 
                  value={formData.role}
                  onValueChange={handleRoleChange}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="student" id="student" />
                      <Label htmlFor="student">Student</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="lecturer" id="lecturer" />
                      <Label htmlFor="lecturer">Lecturer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="staff" id="staff" />
                      <Label htmlFor="staff">Other Staff</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your college email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <Button type="submit" className="w-full">
                Continue
              </Button>
            </form>
          </div>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
