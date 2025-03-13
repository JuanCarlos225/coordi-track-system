
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, createContext } from "react";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import UserSelection from "./pages/UserSelection";
import AdminDashboard from "./pages/admin/Dashboard";
import CoordinatorDashboard from "./pages/coordinator/Dashboard";
import CoordinatorManagement from "./pages/admin/CoordinatorManagement";
import AcademicManagement from "./pages/admin/AcademicManagement";
import Statistics from "./pages/admin/Statistics";
import Schedules from "./pages/admin/Schedules";
import CoordinatorStatistics from "./pages/coordinator/Statistics";
import CoordinatorGroups from "./pages/coordinator/Groups";
import CoordinatorSchedules from "./pages/coordinator/Schedules";
import NotFound from "./pages/NotFound";

// Types
export type UserRole = "admin" | "coordinator" | null;
export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
} | null;

// Context
export const AuthContext = createContext<{
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  isAuthenticated: boolean;
}>({
  user: null,
  setUser: () => {},
  isAuthenticated: false,
});

// Initialize QueryClient
const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<User>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check local storage for user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);
  
  // Update local storage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("user");
      setIsAuthenticated(false);
    }
  }, [user]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ user, setUser, isAuthenticated }}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              
              {/* Protected routes */}
              <Route 
                path="/select-role" 
                element={isAuthenticated ? <UserSelection /> : <Navigate to="/login" />} 
              />
              
              {/* Admin routes */}
              <Route 
                path="/admin" 
                element={
                  isAuthenticated && user?.role === "admin" 
                    ? <AdminDashboard /> 
                    : <Navigate to="/login" />
                } 
              />
              <Route 
                path="/admin/coordinators" 
                element={
                  isAuthenticated && user?.role === "admin" 
                    ? <CoordinatorManagement /> 
                    : <Navigate to="/login" />
                } 
              />
              <Route 
                path="/admin/academic" 
                element={
                  isAuthenticated && user?.role === "admin" 
                    ? <AcademicManagement /> 
                    : <Navigate to="/login" />
                } 
              />
              <Route 
                path="/admin/statistics" 
                element={
                  isAuthenticated && user?.role === "admin" 
                    ? <Statistics /> 
                    : <Navigate to="/login" />
                } 
              />
              <Route 
                path="/admin/schedules" 
                element={
                  isAuthenticated && user?.role === "admin" 
                    ? <Schedules /> 
                    : <Navigate to="/login" />
                } 
              />
              
              {/* Coordinator routes */}
              <Route 
                path="/coordinator" 
                element={
                  isAuthenticated && user?.role === "coordinator" 
                    ? <CoordinatorDashboard /> 
                    : <Navigate to="/login" />
                } 
              />
              <Route 
                path="/coordinator/groups" 
                element={
                  isAuthenticated && user?.role === "coordinator" 
                    ? <CoordinatorGroups /> 
                    : <Navigate to="/login" />
                } 
              />
              <Route 
                path="/coordinator/statistics" 
                element={
                  isAuthenticated && user?.role === "coordinator" 
                    ? <CoordinatorStatistics /> 
                    : <Navigate to="/login" />
                } 
              />
              <Route 
                path="/coordinator/schedules" 
                element={
                  isAuthenticated && user?.role === "coordinator" 
                    ? <CoordinatorSchedules /> 
                    : <Navigate to="/login" />
                } 
              />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
