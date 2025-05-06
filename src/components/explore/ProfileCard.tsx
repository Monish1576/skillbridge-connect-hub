
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SkillTag } from "@/components/SkillTag";
import { Phone } from "lucide-react";

interface Profile {
  id: string;
  full_name: string;
  role: string;
  department: string;
  avatar_url?: string;
  skills?: string[];
  phone?: string;
}

interface ProfileCardProps {
  profile: Profile;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  // Generate initials for avatar fallback
  const initials = profile.full_name
    ? profile.full_name.split(" ").map(n => n[0]).join("")
    : "U";

  return (
    <Card key={profile.id} className="overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={profile.avatar_url || ""} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg">{profile.full_name}</h3>
            <p className="text-sm text-muted-foreground">
              {profile.role} • {profile.department || "No department"}
            </p>
          </div>
        </div>
        
        {/* Contact info */}
        <div className="mb-4 space-y-2">
          {profile.phone && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <a href={`tel:${profile.phone}`} className="hover:underline">{profile.phone}</a>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {profile.skills && profile.skills.length > 0 ? (
            <>
              {profile.skills.slice(0, 3).map((skill) => (
                <SkillTag key={skill} skill={skill} />
              ))}
              {profile.skills.length > 3 && (
                <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full font-medium">
                  +{profile.skills.length - 3} more
                </span>
              )}
            </>
          ) : (
            <span className="text-xs text-muted-foreground">No skills listed</span>
          )}
        </div>
        <Link to={`/profile/${profile.id}`}>
          <Button variant="secondary" className="w-full">View Profile</Button>
        </Link>
      </div>
    </Card>
  );
}
