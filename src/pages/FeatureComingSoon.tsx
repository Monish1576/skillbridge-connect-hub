
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { Clock, CalendarClock, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function FeatureComingSoon() {
  const { feature } = useParams();
  
  const getFeatureDetails = () => {
    switch(feature) {
      case "messages":
        return {
          title: "Messaging Feature Coming Soon",
          description: "We're working hard to bring you a seamless messaging experience. Soon you'll be able to connect and collaborate with other users directly through our platform.",
          icon: <MessageIcon className="w-20 h-20 text-primary mb-4" />
        };
      case "notifications":
        return {
          title: "Notifications Feature Coming Soon",
          description: "Stay tuned! Soon you'll be able to receive real-time notifications about connections, project updates, and important events through our platform.",
          icon: <NotificationIcon className="w-20 h-20 text-primary mb-4" />
        };
      default:
        return {
          title: "Feature Coming Soon",
          description: "We're constantly improving our platform with new features. This particular feature is currently under development and will be available soon!",
          icon: <Clock className="w-20 h-20 text-primary mb-4" />
        };
    }
  };

  const featureDetails = getFeatureDetails();

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto text-center px-4 py-12"
        >
          {featureDetails.icon}
          
          <h1 className="text-3xl font-bold mb-4">{featureDetails.title}</h1>
          
          <p className="text-muted-foreground mb-8">
            {featureDetails.description}
          </p>
          
          <div className="flex flex-col space-y-3">
            <Link to="/dashboard">
              <Button className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
            
            <Link to="/">
              <Button variant="outline" className="w-full">
                Go to Home
              </Button>
            </Link>
          </div>
          
          <div className="mt-10 flex items-center justify-center">
            <CalendarClock className="text-muted-foreground h-5 w-5 mr-2" />
            <p className="text-sm text-muted-foreground">
              Expected release: Q2 2025
            </p>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

const MessageIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    <circle cx="9.5" cy="9.5" r="1"></circle>
    <circle cx="12" cy="12" r="1"></circle>
    <circle cx="14.5" cy="14.5" r="1"></circle>
  </svg>
);

const NotificationIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    <path d="M2 8c0-2.2.7-4.3 2-6"></path>
    <path d="M22 8a10 10 0 0 0-2-6"></path>
  </svg>
);
