
import { User, GraduationCap, MapPin, Phone, Calendar, Mail } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

interface ProfileSidebarProps {
  profile: {
    role: string;
    department: string;
    location?: string;
    phone?: string;
    email?: string;
    joined_at?: string;
    bio?: string;
    full_name: string;
  };
}

export function ProfileSidebar({ profile }: ProfileSidebarProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <User className="h-5 w-5 text-muted-foreground" />
          <span>{profile.role}</span>
        </div>
        <div className="flex items-center gap-3">
          <GraduationCap className="h-5 w-5 text-muted-foreground" />
          <span>{profile.department}</span>
        </div>
        {profile.location && (
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <span>{profile.location}</span>
          </div>
        )}
        {profile.phone && (
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-muted-foreground" />
            <a href={`tel:${profile.phone}`} className="hover:underline">{profile.phone}</a>
          </div>
        )}
        {profile.email && (
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <a href={`mailto:${profile.email}`} className="hover:underline">{profile.email}</a>
          </div>
        )}
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <span>Joined {profile.joined_at ? new Date(profile.joined_at).toLocaleDateString() : 'recently'}</span>
        </div>

        <div className="pt-4">
          <h3 className="font-semibold mb-2">Bio</h3>
          <p className="text-muted-foreground">
            {profile.bio || `${profile.full_name} hasn't added a bio yet.`}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
