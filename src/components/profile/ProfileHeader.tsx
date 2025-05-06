
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SkillTag } from "@/components/SkillTag";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";

interface ProfileHeaderProps {
  profile: {
    id: string;
    full_name: string;
    role: string;
    department: string;
    avatar_url?: string;
    skills?: string[];
  };
  userId: string | undefined;
  isConnected: boolean;
  connectLoading: boolean;
  handleConnectClick: () => void;
  handleMessageClick: () => void;
}

export function ProfileHeader({
  profile,
  userId,
  isConnected,
  connectLoading,
  handleConnectClick,
  handleMessageClick
}: ProfileHeaderProps) {
  const { user } = useAuth();

  return (
    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
      <Avatar className="h-32 w-32 border-4 border-background">
        <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
        <AvatarFallback className="text-3xl">{profile.full_name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
      </Avatar>
      <div className="space-y-2 text-center md:text-left">
        <h1 className="text-3xl font-bold">{profile.full_name}</h1>
        <p className="text-xl text-muted-foreground">{profile.role} • {profile.department}</p>
        <div className="flex flex-wrap justify-center md:justify-start gap-2 my-3">
          {profile.skills && profile.skills.map((skill: string) => (
            <SkillTag key={skill} skill={skill} />
          ))}
        </div>
        <div className="flex gap-3 pt-2 justify-center md:justify-start">
          {user && user.id !== userId ? (
            <>
              <Button 
                onClick={handleConnectClick} 
                disabled={connectLoading}
                variant={isConnected ? "outline" : "default"}
              >
                {isConnected ? "Disconnect" : "Connect"}
              </Button>
              <Button variant="outline" onClick={handleMessageClick}>
                Message
              </Button>
            </>
          ) : user && user.id === userId ? (
            <Link to="/profile-setup">
              <Button variant="outline">Edit Profile</Button>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
