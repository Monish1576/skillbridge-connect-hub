
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ProfileExperienceProps {
  profileName: string;
  profileId: string;
}

interface Experience {
  id: string;
  title: string;
  company: string;
  start_date: string;
  end_date?: string;
  description?: string;
}

export function ProfileExperience({ profileName, profileId }: ProfileExperienceProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        // This would be the actual query if we had an experiences table
        // const { data, error } = await supabase
        //   .from('experiences')
        //   .select('*')
        //   .eq('user_id', profileId)
        //   .order('start_date', { ascending: false });
        
        // if (error) throw error;
        // setExperiences(data || []);
        
        // For now, we'll use empty data
        setExperiences([]);
      } catch (error) {
        console.error('Error fetching experiences:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchExperiences();
  }, [profileId]);
  
  if (loading) {
    return (
      <>
        <h2 className="text-xl font-semibold mb-4">Experience</h2>
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-12 w-12 bg-muted-foreground/20 rounded-full mx-auto"></div>
              <div className="h-4 w-1/3 bg-muted-foreground/20 rounded mx-auto"></div>
              <div className="h-4 w-1/2 bg-muted-foreground/20 rounded mx-auto"></div>
            </div>
          </CardContent>
        </Card>
      </>
    );
  }
  
  if (experiences.length === 0) {
    return (
      <>
        <h2 className="text-xl font-semibold mb-4">Experience</h2>
        <Card>
          <CardContent className="p-6 text-center">
            <Briefcase className="mx-auto h-12 w-12 text-muted-foreground/60 mb-4" />
            <h3 className="font-semibold text-lg mb-2">No Experience Added</h3>
            <p className="text-muted-foreground mb-4">
              {profileName} hasn't added any experience details yet.
            </p>
            {user && user.id === profileId && (
              <Button variant="outline" size="sm" onClick={() => navigate('/profile-setup')}>
                Add Experience
              </Button>
            )}
          </CardContent>
        </Card>
      </>
    );
  }
  
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Experience</h2>
      <div className="space-y-4">
        {experiences.map((exp) => (
          <Card key={exp.id}>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg">{exp.title}</h3>
              <p className="text-muted-foreground">{exp.company}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(exp.start_date).toLocaleDateString()} - 
                {exp.end_date ? new Date(exp.end_date).toLocaleDateString() : 'Present'}
              </p>
              {exp.description && <p className="mt-2">{exp.description}</p>}
            </CardContent>
          </Card>
        ))}
        
        {user && user.id === profileId && (
          <div className="text-center mt-4">
            <Button variant="outline" size="sm" onClick={() => navigate('/profile-setup')}>
              Add More Experience
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
