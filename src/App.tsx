import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Timeline from "./pages/Timeline";
import HerPage from "./pages/HerPage";
import Journal from "./pages/Journal";
import Auth from "./pages/Auth";
import MoodTracker from "./pages/MoodTracker";
import BucketList from "./pages/BucketList";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import { supabase } from "./integrations/supabase/client";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuth();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <PrivateRoute>
                    <Index />
                  </PrivateRoute>
                ) : (
                  <Navigate to="/auth" replace />
                )
              }
            />
            <Route
              path="/timeline"
              element={
                <PrivateRoute>
                  <Timeline />
                </PrivateRoute>
              }
            />
            <Route
              path="/her"
              element={
                <PrivateRoute>
                  <HerPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/journal"
              element={
                <PrivateRoute>
                  <Journal />
                </PrivateRoute>
              }
            />
            <Route
              path="/moods"
              element={
                <PrivateRoute>
                  <MoodTracker />
                </PrivateRoute>
              }
            />
            <Route
              path="/bucket-list"
              element={
                <PrivateRoute>
                  <BucketList />
                </PrivateRoute>
              }
            />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
