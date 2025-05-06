
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { Activity, Users, Calendar, BookOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, icon }: StatCardProps) => {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className={`text-2xl font-bold mt-1 transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              {value}
            </h3>
          </div>
          <div className="bg-primary/10 p-2 rounded-full">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const DashboardStats = () => {
  const { user } = useAuth();
  const [totalProjects, setTotalProjects] = useState<number>(0);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalConnections, setTotalConnections] = useState<number>(0);
  const [totalSkills, setTotalSkills] = useState<number>(0);
  const [activityData, setActivityData] = useState([
    { name: 'Mon', projects: 0 },
    { name: 'Tue', projects: 0 },
    { name: 'Wed', projects: 0 },
    { name: 'Thu', projects: 0 },
    { name: 'Fri', projects: 0 },
    { name: 'Sat', projects: 0 },
    { name: 'Sun', projects: 0 },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        
        // Fetch total projects count
        const { count: projectsCount, error: projectsError } = await supabase
          .from('projects')
          .select('*', { count: 'exact', head: true });
        
        if (projectsError) console.error('Error fetching projects:', projectsError);
        else setTotalProjects(projectsCount || 0);
        
        // Fetch total users count
        const { count: usersCount, error: usersError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
        
        if (usersError) console.error('Error fetching users:', usersError);
        else setTotalUsers(usersCount || 0);
        
        // Get connections from localStorage
        if (user) {
          const connectionsString = localStorage.getItem('connections') || '[]';
          const connections = JSON.parse(connectionsString);
          const userConnections = connections.filter((conn: string) => conn.startsWith(user.id));
          setTotalConnections(userConnections.length);
        }
        
        // Get skills count
        if (user) {
          const { data, error } = await supabase
            .from('profiles')
            .select('skills')
            .eq('id', user.id)
            .single();
            
          if (error) console.error('Error fetching skills:', error);
          else setTotalSkills(data?.skills?.length || 0);
        }
        
        // Generate weekly activity data
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const today = new Date();
        const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
        
        // Create weekly data with random activity (will be replaced with real data)
        const weekActivity = daysOfWeek.map((day, index) => {
          // Generate higher activity for weekdays, lower for weekends
          const isWeekday = index > 0 && index < 6;
          const projectCount = index === currentDay ? 3 : (isWeekday ? Math.floor(Math.random() * 3) + 1 : Math.floor(Math.random() * 2));
          
          return {
            name: day,
            projects: projectCount
          };
        });
        
        setActivityData(weekActivity);
        
      } catch (error) {
        console.error('Error in fetchDashboardData:', error);
      } finally {
        setLoading(false);
      }
    }
    
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Projects" 
          value={totalProjects} 
          icon={<Activity className="h-5 w-5 text-primary" />} 
        />
        <StatCard 
          title="Network" 
          value={totalUsers}
          icon={<Users className="h-5 w-5 text-primary" />} 
        />
        <StatCard 
          title="Connections" 
          value={totalConnections}
          icon={<Calendar className="h-5 w-5 text-primary" />} 
        />
        <StatCard 
          title="Skills" 
          value={totalSkills}
          icon={<BookOpen className="h-5 w-5 text-primary" />} 
        />
      </div>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Weekly Activity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={activityData}
                margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(17, 24, 39, 0.8)', 
                    border: 'none', 
                    borderRadius: '4px',
                    color: 'white'
                  }} 
                />
                <Bar 
                  dataKey="projects" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]} 
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
