
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

type MessageItem = {
  id: number;
  name: string;
  avatar: string;
  preview: string;
  time: string;
  unread: boolean;
}

export const MessagesPanel = () => {
  const messages: MessageItem[] = [
    {
      id: 1,
      name: "Dr. Sarah Williams",
      avatar: "public/lovable-uploads/35ad675b-9325-4c13-aa1f-b885708a3ff8.png",
      preview: "Hi Alex, I'm interested in collaborating on your AI Study Assistant project. Could we discuss the details?",
      time: "10:45 AM",
      unread: true
    },
    {
      id: 2,
      name: "Emily Rodriguez",
      avatar: "public/lovable-uploads/e90a5653-7ae3-4c4f-a254-5829b53b5172.png",
      preview: "The latest UI mockups are ready for review. Let me know what you think!",
      time: "Yesterday",
      unread: false
    },
    {
      id: 3,
      name: "Michael Chen",
      avatar: "public/lovable-uploads/dc24bf8c-9388-42bd-8479-210a4428b1f7.png",
      preview: "I've pushed the latest code changes. The navigation feature is now working correctly.",
      time: "2 days ago",
      unread: false
    }
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          {messages.map((message, i) => (
            <motion.div 
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className={`flex items-start gap-4 py-4 border-b last:border-0 ${message.unread ? 'bg-primary/5 -mx-6 px-6' : ''} hover:bg-muted/30 -mx-6 px-6 cursor-pointer transition-colors duration-200`}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={message.avatar} />
                <AvatarFallback>{message.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="font-medium text-sm flex items-center">
                    {message.name}
                    {message.unread && <span className="ml-2 h-2 w-2 rounded-full bg-primary"></span>}
                  </p>
                  <p className="text-xs text-muted-foreground">{message.time}</p>
                </div>
                <p className="text-sm mt-1 line-clamp-2">{message.preview}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
