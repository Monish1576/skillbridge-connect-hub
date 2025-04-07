
import { ReactNode } from "react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { DashboardSidebar } from "@/components/dashboard/Sidebar";

type DashboardLayoutProps = {
  children: ReactNode;
  userData: any;
};

export const DashboardLayout = ({ children, userData }: DashboardLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1">
        <div className="container py-8">
          <div className="grid md:grid-cols-[250px_1fr] gap-8">
            <div className="space-y-6">
              <DashboardSidebar userData={userData} />
            </div>
            
            <div className="space-y-6">
              {children}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
