
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus, Settings } from "lucide-react";

export const DashboardHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Manage your projects, requests, and messages</p>
      </div>
      <div className="flex gap-2">
        <Link to="/new-project">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </Link>
        <Link to="/profile-setup">
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
