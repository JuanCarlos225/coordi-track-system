
import React, { useState } from 'react';
import CoordinatorNavbar from './CoordinatorNavbar';
import { 
  Users, 
  BarChart3, 
  FileText,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from './ui/button';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface CoordinatorLayoutProps {
  children: React.ReactNode;
}

const CoordinatorLayout: React.FC<CoordinatorLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col">
      <CoordinatorNavbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside 
          className={cn(
            "fixed inset-y-0 left-0 z-50 flex h-full w-56 flex-col border-r bg-sidebar transition-all duration-300 md:relative md:z-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:w-20 md:translate-x-0"
          )}
          style={{ marginTop: '4rem' }}
        >
          <div className="flex flex-1 flex-col">
            <nav className="flex-1 px-2 py-4">
              <Link
                to="/coordinator"
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  location.pathname === '/coordinator' ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90" : ""
                )}
              >
                <Users className="h-5 w-5" />
                {sidebarOpen && <span>Dashboard</span>}
              </Link>
              <Link
                to="/coordinator/groups"
                className={cn(
                  "mt-1 flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  location.pathname === '/coordinator/groups' ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90" : ""
                )}
              >
                <Users className="h-5 w-5" />
                {sidebarOpen && <span>Grupos</span>}
              </Link>
              <Link
                to="/coordinator/statistics"
                className={cn(
                  "mt-1 flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  location.pathname === '/coordinator/statistics' ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90" : ""
                )}
              >
                <BarChart3 className="h-5 w-5" />
                {sidebarOpen && <span>Estadísticas</span>}
              </Link>
              <Link
                to="/coordinator/schedules"
                className={cn(
                  "mt-1 flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  location.pathname === '/coordinator/schedules' ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90" : ""
                )}
              >
                <FileText className="h-5 w-5" />
                {sidebarOpen && <span>Horarios</span>}
              </Link>
            </nav>
          </div>
          
          <div className="border-t p-4">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-center"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </Button>
          </div>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 transition-all duration-300"
              style={{ marginLeft: sidebarOpen ? '0' : '0' }}>
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CoordinatorLayout;
