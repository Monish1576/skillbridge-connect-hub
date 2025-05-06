
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SkillTag } from "@/components/SkillTag";
import { useNavigate } from "react-router-dom";
import { LogOut, Settings, Users, MessageSquare, Bell, Link } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";

export const DashboardSidebar = ({ userData }: { userData: any }) => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
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
          <AvatarImage src={userData?.avatar_url} />
          <AvatarFallback>
            {userData?.full_name 
              ? userData.full_name.split(" ").map((n: string) => n[0]).join("")
              : "U"}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-bold">{userData?.full_name || "User"}</h2>
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
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/dashboard')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect></svg>
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/projects')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            Projects
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/feature-coming-soon/messages')}>
            <MessageSquare className="mr-2 h-4 w-4" />
            Messages
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/explore')}>
            <Users className="mr-2 h-4 w-4" />
            Explore
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/feature-coming-soon/notifications')}>
            <Bell className="mr-2 h-4 w-4" />
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
        <h3 className="mb-4 text-sm font-medium">Top Connections</h3>
        <div className="flex items-center justify-center mb-4">
          <Button variant="outline" size="sm" onClick={() => navigate('/explore')}>
            <Link className="mr-2 h-4 w-4" />
            Find Connections
          </Button>
        </div>
      </div>
    </div>
  );
};
