
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

type StatCardProps = {
  title: string;
  value: string | number;
  change?: string;
  icon: React.ReactNode;
  trend?: "up" | "down" | "neutral";
}

const StatCard = ({ title, value, change, icon, trend }: StatCardProps) => {
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
            {change && (
              <p className={`text-xs mt-1 ${trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-muted-foreground"}`}>
                {trend === "up" ? "↑" : trend === "down" ? "↓" : ""} {change} since last month
              </p>
            )}
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
  const [activityData, setActivityData] = useState([
    { name: 'Mon', projects: 0 },
    { name: 'Tue', projects: 0 },
    { name: 'Wed', projects: 0 },
    { name: 'Thu', projects: 0 },
    { name: 'Fri', projects: 0 },
    { name: 'Sat', projects: 0 },
    { name: 'Sun', projects: 0 },
  ]);

  useEffect(() => {
    // Animate the chart data
    const timer = setTimeout(() => {
      setActivityData([
        { name: 'Mon', projects: 4 },
        { name: 'Tue', projects: 3 },
        { name: 'Wed', projects: 7 },
        { name: 'Thu', projects: 5 },
        { name: 'Fri', projects: 6 },
        { name: 'Sat', projects: 2 },
        { name: 'Sun', projects: 1 },
      ]);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Projects" 
          value="24" 
          change="12%" 
          trend="up"
          icon={<Activity className="h-5 w-5 text-primary" />} 
        />
        <StatCard 
          title="Team Members" 
          value="12" 
          change="8%" 
          trend="up"
          icon={<Users className="h-5 w-5 text-primary" />} 
        />
        <StatCard 
          title="Upcoming Deadlines" 
          value="8" 
          change="5%" 
          trend="down"
          icon={<Calendar className="h-5 w-5 text-primary" />} 
        />
        <StatCard 
          title="Skills Endorsed" 
          value="36" 
          change="24%" 
          trend="up"
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
