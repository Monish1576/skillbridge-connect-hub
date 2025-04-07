
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";

type NotificationItem = {
  id: number;
  name: string;
  avatar: string;
  action: string;
  time: string;
  read: boolean;
}

export const NotificationsPanel = () => {
  const notifications: NotificationItem[] = [
    {
      id: 1,
      name: "Dr. Sarah Williams",
      avatar: "public/lovable-uploads/35ad675b-9325-4c13-aa1f-b885708a3ff8.png",
      action: "requested to join your 'AI Study Assistant' project",
      time: "2 hours ago",
      read: false
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "public/lovable-uploads/dc24bf8c-9388-42bd-8479-210a4428b1f7.png",
      action: "commented on your 'Smart Campus Navigation' project",
      time: "Yesterday",
      read: false
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      avatar: "public/lovable-uploads/e90a5653-7ae3-4c4f-a254-5829b53b5172.png",
      action: "shared a new project that matches your skills",
      time: "3 days ago",
      read: true
    }
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <AnimatePresence>
            {notifications.map((notification, i) => (
              <motion.div 
                key={notification.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, delay: i * 0.1 }}
                className={`flex items-start gap-4 py-4 border-b last:border-0 ${notification.read ? 'opacity-70' : ''}`}
              >
                {!notification.read && (
                  <span className="absolute -ml-2 mt-4 h-2 w-2 rounded-full bg-primary"></span>
                )}
                <Avatar className="h-10 w-10">
                  <AvatarImage src={notification.avatar} />
                  <AvatarFallback>{notification.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{notification.name}</span>{" "}
                    {notification.action}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {notification.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
};
