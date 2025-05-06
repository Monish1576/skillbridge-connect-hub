
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

type TimelineItem = {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  action: string;
  project?: string;
  time: string;
}

export const ActivityTimeline = () => {
  const { user } = useAuth();
  const [activities, setActivities] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecentActivity() {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // This would ideally fetch from an activities or logs table
        // For now, we'll display a placeholder message if no activities are found
        
        // Example of how you might fetch real activity data:
        // const { data, error } = await supabase
        //   .from('activities')
        //   .select('id, action, project, created_at, user_id, profiles(full_name, avatar_url)')
        //   .order('created_at', { ascending: false })
        //   .limit(5);
        
        // If no activities found or if there's an error, show empty state
        setActivities([]);
        
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchRecentActivity();
  }, [user]);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
          <div className="py-8 text-center text-muted-foreground">
            Loading activities...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
        
        {activities.length > 0 ? (
          <div className="space-y-4">
            {activities.map((activity, i) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="flex items-start gap-4 py-3 border-b border-border/40 last:border-0"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={activity.user.avatar} />
                  <AvatarFallback>
                    {activity.user.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user.name}</span>
                    {" "}{activity.action}{" "}
                    {activity.project && (
                      <span className="font-medium">{activity.project}</span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            No recent activity to display.
            <p className="mt-2 text-sm">
              Activities will appear here as you and your team use the platform.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
