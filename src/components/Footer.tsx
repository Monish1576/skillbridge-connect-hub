
import { Logo } from "./Logo";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t py-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col space-y-3">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Bridging the skill gap in educational institutions
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-3">Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/explore" className="text-muted-foreground hover:text-primary">
                  Explore
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-muted-foreground hover:text-primary">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-primary">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-3">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">
                Phone: 6303636530
              </li>
              <li className="text-muted-foreground">
                Email: moturimonish@gmail.com
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary">
                  Contact Form
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-muted-foreground">
          © 2025 SkillBridge. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
