
import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Users, 
  BarChart3, 
  FileText,
  Bell, 
  LogOut,
  Menu,
  User
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MainLogo from './MainLogo';
import { AuthContext } from '@/App';
import { Badge } from './ui/badge';

interface CoordinatorNavbarProps {
  onToggleSidebar?: () => void;
}

const CoordinatorNavbar: React.FC<CoordinatorNavbarProps> = ({ onToggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  
  const notifications = 3; // Mock data
  
  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          {onToggleSidebar && (
            <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <MainLogo />
          
          <nav className="hidden md:flex items-center gap-4 ml-6">
            <Link 
              to="/coordinator" 
              className={`nav-link ${location.pathname === '/coordinator' ? 'active' : ''}`}
            >
              <Users className="h-4 w-4" />
              Dashboard
            </Link>
            <Link 
              to="/coordinator/groups" 
              className={`nav-link ${location.pathname === '/coordinator/groups' ? 'active' : ''}`}
            >
              <Users className="h-4 w-4" />
              Grupos
            </Link>
            <Link 
              to="/coordinator/statistics" 
              className={`nav-link ${location.pathname === '/coordinator/statistics' ? 'active' : ''}`}
            >
              <BarChart3 className="h-4 w-4" />
              Estadísticas
            </Link>
            <Link 
              to="/coordinator/schedules" 
              className={`nav-link ${location.pathname === '/coordinator/schedules' ? 'active' : ''}`}
            >
              <FileText className="h-4 w-4" />
              Horarios
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-brand-amber text-white">
                    {notifications}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Grupo A101 - Faltan 2 alumnos</DropdownMenuItem>
              <DropdownMenuItem>Grupo C205 - Faltan 1 alumno</DropdownMenuItem>
              <DropdownMenuItem>Grupo B403 - Asistencia completa</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative gap-2">
                <User className="h-4 w-4" />
                {user?.name || 'Coordinador'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/select-role')}>
                Cambiar rol
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default CoordinatorNavbar;
