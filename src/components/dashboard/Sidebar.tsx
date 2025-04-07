
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SkillTag } from "@/components/SkillTag";
import { useNavigate } from "react-router-dom";
import { LogOut, Settings } from "lucide-react";
import { toast } from "sonner";

export const DashboardSidebar = ({ userData }: { userData: any }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    toast.success("Logged out successfully");
    navigate('/login');
  };

  const handleProfileSettings = () => {
    navigate('/profile-setup');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center text-center">
        <Avatar className="h-24 w-24 mb-4 ring-2 ring-primary ring-offset-2 ring-offset-background transition-all duration-300 hover:scale-105">
          <AvatarImage src={userData?.profilePicture} />
          <AvatarFallback>
            {userData?.fullName 
              ? userData.fullName.split(" ").map((n: string) => n[0]).join("")
              : "U"}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-bold">{userData?.fullName || "User"}</h2>
        <p className="text-sm text-muted-foreground">
          {userData?.department || ""} • {userData?.role || ""}
        </p>
        <div className="flex mt-4 gap-2">
          <Button variant="outline" size="icon" onClick={handleProfileSettings}>
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect></svg>
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            Projects
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4l-4 4"></path></svg>
            Messages
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8"></path><path d="M3 16.2V21m0 0h4.8M3 21l6-6"></path><path d="M21 7.8V3m0 0h-4.8M21 3l-6 6"></path><path d="M3 7.8V3m0 0h4.8M3 3l6 6"></path></svg>
            Explore
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"></path><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path></svg>
            Notifications
          </Button>
        </nav>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="mb-2 text-sm font-medium">Trending Skills</h3>
        <div className="flex flex-wrap gap-2">
          <SkillTag skill="Machine Learning" />
          <SkillTag skill="React" />
          <SkillTag skill="UI/UX Design" />
          <SkillTag skill="Node.js" />
          <SkillTag skill="Mobile Dev" />
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="mb-4 text-sm font-medium">Top Contributors</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="public/lovable-uploads/35ad675b-9325-4c13-aa1f-b885708a3ff8.png" />
              <AvatarFallback>SW</AvatarFallback>
            </Avatar>
            <div className="text-sm">Dr. Sarah Williams</div>
          </div>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="public/lovable-uploads/dc24bf8c-9388-42bd-8479-210a4428b1f7.png" />
              <AvatarFallback>MC</AvatarFallback>
            </Avatar>
            <div className="text-sm">Michael Chen</div>
          </div>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="public/lovable-uploads/e90a5653-7ae3-4c4f-a254-5829b53b5172.png" />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
            <div className="text-sm">Emily Rodriguez</div>
          </div>
        </div>
      </div>
    </div>
  );
};
