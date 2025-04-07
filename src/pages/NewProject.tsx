
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function NewProject() {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    skills: "",
    status: "Planning",
    image: null as File | null,
    priority: "Medium"
  });
  const [previewing, setPreviewing] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setProjectData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProjectData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewing(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // In a real application, this would save the project to a database
    // For now, we'll simulate this by using localStorage
    const userData = localStorage.getItem('userData');
    const user = userData ? JSON.parse(userData) : null;
    
    const project = {
      ...projectData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      members: user ? [{ name: user.fullName, avatar: user.profilePicture || "" }] : [],
      image: previewing
    };
    
    // Save to localStorage
    const existingProjects = localStorage.getItem('userProjects');
    const projects = existingProjects ? JSON.parse(existingProjects) : [];
    projects.push(project);
    localStorage.setItem('userProjects', JSON.stringify(projects));
    
    toast.success("Project created successfully!");
    navigate("/projects");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Create New Project</h1>
          
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter project title"
                    value={projectData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Project Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your project"
                    className="min-h-[100px]"
                    value={projectData.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="skills">Required Skills (comma-separated)</Label>
                  <Input
                    id="skills"
                    name="skills"
                    placeholder="React, NodeJS, UI/UX Design, etc."
                    value={projectData.skills}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Project Status</Label>
                    <Select 
                      defaultValue={projectData.status} 
                      onValueChange={(value) => handleSelectChange("status", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Planning">Planning</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Looking for Collaborators">Looking for Collaborators</SelectItem>
                        <SelectItem value="Not Started">Not Started</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select 
                      defaultValue={projectData.priority}
                      onValueChange={(value) => handleSelectChange("priority", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="project-image">Project Image</Label>
                  <div className="flex flex-col space-y-4">
                    {previewing && (
                      <div className="border rounded-md overflow-hidden">
                        <img 
                          src={previewing} 
                          alt="Project preview" 
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <Input
                        id="project-image"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit">Create Project</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
