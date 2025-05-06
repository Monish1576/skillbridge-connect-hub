
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useProfileConnections(userId: string | undefined) {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [isConnected, setIsConnected] = useState(false);
  const [connectLoading, setConnectLoading] = useState(false);

  // Check connection status when component mounts
  useEffect(() => {
    if (user && userId) {
      checkConnectionStatus();
    }
  }, [user, userId]);

  // Check connection status from localStorage
  const checkConnectionStatus = () => {
    if (user && userId && user.id !== userId) {
      const connectionsString = localStorage.getItem('connections') || '[]';
      const connections = JSON.parse(connectionsString);
      const isConnected = connections.includes(`${user.id}-${userId}`);
      setIsConnected(isConnected);
      return isConnected;
    }
    return false;
  };

  const handleConnectClick = async () => {
    if (!user) {
      navigate("/auth");
      toast.info("Please log in to connect with users");
      return;
    }

    if (user.id === userId) {
      toast.info("You cannot connect with yourself");
      return;
    }

    try {
      setConnectLoading(true);

      // Store connections in localStorage 
      const connectionsString = localStorage.getItem('connections') || '[]';
      const connections = JSON.parse(connectionsString);
      const connectionKey = `${user.id}-${userId}`;

      if (isConnected) {
        // Disconnect
        const filteredConnections = connections.filter((c: string) => c !== connectionKey);
        localStorage.setItem('connections', JSON.stringify(filteredConnections));
        setIsConnected(false);
        toast.success("Successfully disconnected");
      } else {
        // Connect
        connections.push(connectionKey);
        localStorage.setItem('connections', JSON.stringify(connections));
        setIsConnected(true);
        toast.success("Successfully connected");
      }
    } catch (error) {
      console.error('Error toggling connection:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setConnectLoading(false);
    }
  };

  const handleMessageClick = () => {
    navigate("/feature-coming-soon/messages");
  };

  return {
    isConnected,
    checkConnectionStatus,
    connectLoading,
    handleConnectClick,
    handleMessageClick
  };
}
