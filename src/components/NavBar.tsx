
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
import { LogOut, Settings, User } from "lucide-react";
import { toast } from "sonner";

export function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    
    if (loggedIn) {
      const user = localStorage.getItem('userData');
      if (user) {
        setUserData(JSON.parse(user));
      }
    }
  }, [location.pathname]); // Re-check on route change
  
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    setUserData(null);
    toast.success("Logged out successfully");
    navigate("/");
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
            <ThemeToggle />
            
            {isLoggedIn && userData ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={userData.profilePicture} alt={userData.fullName} />
                      <AvatarFallback>
                        {userData.fullName.split(' ').map((n: string) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{userData.fullName}</p>
                      <p className="text-sm text-muted-foreground">{userData.email}</p>
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
