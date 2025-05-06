
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  id: string;
  full_name: string;
  role: string;
  department: string;
  bio?: string;
  phone?: string;
  email?: string;
  location?: string;
  avatar_url?: string;
  skills?: string[];
  joined_at?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  image?: string;
  skills?: string[];
}

export function useProfileData(userId: string | undefined) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userProjects, setUserProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfileData() {
      if (!userId) return;
      
      try {
        setLoading(true);

        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
          if (profileError.code === 'PGRST116') {
            toast.error('User profile not found');
          } else {
            toast.error('Error loading profile data');
          }
          return;
        }

        // Fetch user email from auth.users if available
        let email = null;
        try {
          const { data: userData, error: userError } = await supabase.auth.getUser(userId);
          if (!userError && userData) {
            email = userData.user?.email || null;
          }
        } catch (error) {
          console.error('Could not fetch user email:', error);
        }

        // Fetch user's projects
        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select('*')
          .eq('creator_id', userId);

        if (projectsError) {
          console.error('Error fetching projects:', projectsError);
        }

        // Set the profile and projects data
        setProfile({
          ...profileData,
          email: email || profileData.email
        });
        setUserProjects(projectsData || []);
      } catch (error) {
        console.error('Unexpected error:', error);
        toast.error('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchProfileData();
  }, [userId]);

  return { profile, userProjects, loading };
}
