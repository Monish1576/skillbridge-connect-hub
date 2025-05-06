
import { useParams, Link } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useProfileData } from "@/hooks/useProfileData";
import { useProfileConnections } from "@/hooks/useProfileConnections";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileSidebar } from "@/components/profile/ProfileSidebar";
import { ProfileContent } from "@/components/profile/ProfileContent";

export default function UserProfile() {
  const { userId } = useParams();
  const { profile, userProjects, loading } = useProfileData(userId);
  const { 
    isConnected, 
    connectLoading, 
    handleConnectClick, 
    handleMessageClick,
    checkConnectionStatus 
  } = useProfileConnections(userId);

  useEffect(() => {
    checkConnectionStatus();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-1 container py-12">
          <div className="animate-pulse space-y-6">
            <div className="h-40 bg-secondary rounded-lg"></div>
            <div className="h-8 w-1/3 bg-secondary rounded-lg"></div>
            <div className="h-4 w-1/2 bg-secondary rounded-lg"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="h-48 bg-secondary rounded-lg"></div>
              <div className="h-48 md:col-span-2 bg-secondary rounded-lg"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-1 container py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">User Not Found</h1>
          <p className="text-muted-foreground mb-8">The user profile you're looking for doesn't exist.</p>
          <Link to="/explore">
            <Button>Back to Explore</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1 container py-8">
        <div className="space-y-8">
          {/* Profile Header */}
          <ProfileHeader 
            profile={profile}
            userId={userId}
            isConnected={isConnected}
            connectLoading={connectLoading}
            handleConnectClick={handleConnectClick}
            handleMessageClick={handleMessageClick}
          />

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Sidebar - Info */}
            <ProfileSidebar profile={profile} />

            {/* Main Content - Tabs */}
            <div className="md:col-span-2">
              <ProfileContent 
                userProjects={userProjects} 
                profileName={profile.full_name} 
                profileId={profile.id} 
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
