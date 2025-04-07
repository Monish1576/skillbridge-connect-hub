
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

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
  const activities: TimelineItem[] = [
    {
      id: 1,
      user: {
        name: "Dr. Sarah Williams",
        avatar: "public/lovable-uploads/35ad675b-9325-4c13-aa1f-b885708a3ff8.png"
      },
      action: "commented on",
      project: "AI Study Assistant",
      time: "1 hour ago"
    },
    {
      id: 2,
      user: {
        name: "Michael Chen",
        avatar: "public/lovable-uploads/dc24bf8c-9388-42bd-8479-210a4428b1f7.png"
      },
      action: "added new files to",
      project: "Smart Campus Navigation",
      time: "3 hours ago"
    },
    {
      id: 3,
      user: {
        name: "Emily Rodriguez",
        avatar: "public/lovable-uploads/e90a5653-7ae3-4c4f-a254-5829b53b5172.png"
      },
      action: "started a new project",
      project: "Campus Events Calendar",
      time: "Yesterday"
    },
    {
      id: 4,
      user: {
        name: "Dr. Sarah Williams",
        avatar: "public/lovable-uploads/35ad675b-9325-4c13-aa1f-b885708a3ff8.png"
      },
      action: "completed a milestone in",
      project: "AI Study Assistant",
      time: "2 days ago"
    }
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
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
      </CardContent>
    </Card>
  );
};
