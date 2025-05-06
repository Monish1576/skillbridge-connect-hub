
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { UpperDashboardSection } from "@/components/dashboard/UpperDashboardSection";
import { DashboardTabs } from "@/components/dashboard/DashboardTabs";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  
  useEffect(() => {
    if (!loading && !user) {
      toast.error("You need to be logged in to access the dashboard");
      navigate('/login');
    }
  }, [user, loading, navigate]);

  // If still loading or not logged in, show a loading state
  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout userData={user}>
      <DashboardHeader />
      <DashboardStats />
      <UpperDashboardSection />
      <DashboardTabs />
    </DashboardLayout>
  );
}
