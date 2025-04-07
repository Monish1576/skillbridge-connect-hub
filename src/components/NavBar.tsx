
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

export function NavBar() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

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
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Log In
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
