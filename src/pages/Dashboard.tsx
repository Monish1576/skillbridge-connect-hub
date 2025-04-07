
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { UpperDashboardSection } from "@/components/dashboard/UpperDashboardSection";
import { DashboardTabs } from "@/components/dashboard/DashboardTabs";

export default function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const [userProjects, setUserProjects] = useState<any[]>([]);
  
  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    
    // Load user data
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
    
    // Load projects
    const storedProjects = localStorage.getItem('userProjects');
    if (storedProjects) {
      setUserProjects(JSON.parse(storedProjects));
    }
  }, [navigate]);

  return (
    <DashboardLayout userData={userData}>
      <DashboardHeader />
      <DashboardStats />
      <UpperDashboardSection />
      <DashboardTabs userProjects={userProjects} />
    </DashboardLayout>
  );
}
