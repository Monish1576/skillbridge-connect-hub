
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/lib/auth";
import Auth from "@/pages/Auth";
import Index from "@/pages/Index";
import Explore from "@/pages/Explore";
import Projects from "@/pages/Projects";
import NewProject from "@/pages/NewProject";
import UserProfile from "@/pages/UserProfile";
import ProfileSetup from "@/pages/ProfileSetup";
import Dashboard from "@/pages/Dashboard";
import About from "@/pages/About";
import SignUp from "@/pages/SignUp";
import FeatureComingSoon from "@/pages/FeatureComingSoon";
import React from "react";

function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Index />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/new-project" element={<NewProject />} />
            <Route path="/profile/:userId" element={<UserProfile />} />
            <Route path="/profile-setup" element={<ProfileSetup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Navigate to="/auth" replace />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            <Route path="/feature-coming-soon/:feature" element={<FeatureComingSoon />} />
          </Routes>
          <Toaster />
        </Router>
      </AuthProvider>
    </React.StrictMode>
  );
}

export default App;
