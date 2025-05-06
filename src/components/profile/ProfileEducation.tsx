
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ProfileEducationProps {
  profileName: string;
  profileId: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  start_date: string;
  end_date?: string;
  description?: string;
}

export function ProfileEducation({ profileName, profileId }: ProfileEducationProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchEducation = async () => {
      try {
        setLoading(true);
        // This would be the actual query if we had an education table
        // const { data, error } = await supabase
        //   .from('education')
        //   .select('*')
        //   .eq('user_id', profileId)
        //   .order('start_date', { ascending: false });
        
        // if (error) throw error;
        // setEducation(data || []);
        
        // For now, we'll use empty data
        setEducation([]);
      } catch (error) {
        console.error('Error fetching education:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEducation();
  }, [profileId]);
  
  if (loading) {
    return (
      <>
        <h2 className="text-xl font-semibold mb-4">Education</h2>
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
  
  if (education.length === 0) {
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
  
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Education</h2>
      <div className="space-y-4">
        {education.map((edu) => (
          <Card key={edu.id}>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg">{edu.institution}</h3>
              <p className="text-muted-foreground">{edu.degree} • {edu.field}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(edu.start_date).toLocaleDateString()} - 
                {edu.end_date ? new Date(edu.end_date).toLocaleDateString() : 'Present'}
              </p>
              {edu.description && <p className="mt-2">{edu.description}</p>}
            </CardContent>
          </Card>
        ))}
        
        {user && user.id === profileId && (
          <div className="text-center mt-4">
            <Button variant="outline" size="sm" onClick={() => navigate('/profile-setup')}>
              Add More Education
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
