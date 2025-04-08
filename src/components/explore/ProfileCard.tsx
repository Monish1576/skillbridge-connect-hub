
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SkillTag } from "@/components/SkillTag";

interface Profile {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar: string;
  skills: string[];
}

interface ProfileCardProps {
  profile: Profile;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <Card key={profile.id} className="overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={profile.avatar} />
            <AvatarFallback>{profile.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg">{profile.name}</h3>
            <p className="text-sm text-muted-foreground">
              {profile.role} • {profile.department}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {profile.skills.slice(0, 3).map((skill) => (
            <SkillTag key={skill} skill={skill} />
          ))}
          {profile.skills.length > 3 && (
            <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full font-medium">
              +{profile.skills.length - 3} more
            </span>
          )}
        </div>
        <Link to={`/user/${profile.id}`}>
          <Button variant="secondary" className="w-full">View Profile</Button>
        </Link>
      </div>
    </Card>
  );
}
