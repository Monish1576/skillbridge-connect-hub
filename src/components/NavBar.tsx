
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User, Bell, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";

export function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const [profileData, setProfileData] = useState<any>(null);
  
  useEffect(() => {
    // When the user state from auth context changes or the path changes,
    // fetch the profile data from Supabase or localStorage
    const fetchProfileData = async () => {
      if (user) {
        try {
          // Try to get profile from localStorage
          const storedProfile = localStorage.getItem('userData');
          if (storedProfile) {
            setProfileData(JSON.parse(storedProfile));
          }
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      } else {
        setProfileData(null);
      }
    };

    fetchProfileData();
  }, [user, location.pathname]);
  
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await signOut();
    setProfileData(null);
    navigate("/");
  };

  const handleNotificationClick = () => {
    navigate("/feature-coming-soon/notifications");
  };

  const handleMessageClick = () => {
    navigate("/feature-coming-soon/messages");
  };

  return (
    <header className="w-full border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Logo />
        
        <div className="flex gap-6 items-center">
          <nav className="hidden md:flex gap-6">
            <Link
              to="/explore"
              className={`text-sm font-medium transition-colors ${
                isActive("/explore")
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              Explore
            </Link>
            <Link
              to="/projects"
              className={`text-sm font-medium transition-colors ${
                isActive("/projects")
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              Projects
            </Link>
            <Link
              to="/dashboard"
              className={`text-sm font-medium transition-colors ${
                isActive("/dashboard")
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors ${
                isActive("/about")
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              About
            </Link>
          </nav>
          
          <div className="flex items-center gap-2">
            {!loading && user && (
              <>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative"
                  onClick={handleNotificationClick}
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleMessageClick}
                >
                  <MessageSquare className="h-5 w-5" />
                </Button>
              </>
            )}
            
            <ThemeToggle />
            
            {!loading && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={profileData?.profilePicture} alt={profileData?.fullName || user.email} />
                      <AvatarFallback>
                        {profileData?.fullName 
                          ? profileData.fullName.split(' ').map((n: string) => n[0]).join('')
                          : user.email?.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{profileData?.fullName || user.email}</p>
                      <p className="text-sm text-muted-foreground">{profileData?.email || user.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer flex w-full">
                      <User className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile-setup" className="cursor-pointer flex w-full">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
