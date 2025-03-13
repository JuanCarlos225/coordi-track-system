
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { School, Users, UserCog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthContext } from '@/App';

const UserSelection = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  
  // If user has only one role, redirect automatically
  React.useEffect(() => {
    if (user?.role === 'admin' && !user.email.includes('both')) {
      navigate('/admin');
    } else if (user?.role === 'coordinator' && !user.email.includes('both')) {
      navigate('/coordinator');
    }
  }, [user, navigate]);
  
  const handleRoleSelect = (role: 'admin' | 'coordinator') => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/coordinator');
      }
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="w-full max-w-4xl">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <School className="h-10 w-10 text-brand-blue" />
            <span className="font-bold text-3xl">CoordiTrack</span>
          </div>
        </div>
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold">Bienvenido, {user?.name}</h1>
          <p className="text-gray-600 mt-2">Por favor, selecciona el rol con el que deseas ingresar al sistema.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCog className="h-6 w-6 text-brand-blue" />
                <span>Administrador</span>
              </CardTitle>
              <CardDescription>
                Acceso completo al sistema de gestión académica
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Como administrador, tendrás acceso a la gestión de coordinadores, 
                carreras, grupos, estadísticas de asistencia y más.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-brand-blue hover:bg-brand-blue/90" 
                onClick={() => handleRoleSelect('admin')}
              >
                Ingresar como Administrador
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6 text-brand-teal" />
                <span>Coordinador</span>
              </CardTitle>
              <CardDescription>
                Acceso a las carreras y grupos asignados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Como coordinador, podrás ver la asistencia de tus grupos asignados, 
                recibir notificaciones, consultar estadísticas y horarios.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-brand-teal hover:bg-brand-teal/90" 
                onClick={() => handleRoleSelect('coordinator')}
              >
                Ingresar como Coordinador
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserSelection;
