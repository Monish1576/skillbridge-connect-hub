
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";

interface ProfileEducationProps {
  profileName: string;
  profileId: string;
}

export function ProfileEducation({ profileName, profileId }: ProfileEducationProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Education</h2>
      <Card>
        <CardContent className="p-6 text-center">
          <GraduationCap className="mx-auto h-12 w-12 text-muted-foreground/60 mb-4" />
          <h3 className="font-semibold text-lg mb-2">No Education Added</h3>
          <p className="text-muted-foreground mb-4">
            {profileName} hasn't added any education details yet.
          </p>
          {user && user.id === profileId && (
            <Button variant="outline" size="sm" onClick={() => navigate('/profile-setup')}>
              Add Education
            </Button>
          )}
        </CardContent>
      </Card>
    </>
  );
}
