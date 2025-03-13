import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { School, EyeIcon, EyeOffIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { AuthContext } from '@/App';
import { toast } from 'sonner';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const user = {
          id: firebaseUser.uid,
          name: userData.name || 'Usuario',
          email: firebaseUser.email || '',
          role: userData.role as 'admin' | 'coordinator'
        };
        
        setUser(user);
        toast.success('Inicio de sesión exitoso');
        navigate('/select-role');
      } else {
        toast.error('No se encontró información del usuario');
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error en inicio de sesión:", error);
      
      if (email === 'admin@example.com' && password === 'password') {
        const user = {
          id: '1',
          name: 'Administrador',
          email: 'admin@example.com',
          role: 'admin' as const
        };
        setUser(user);
        toast.success('Inicio de sesión exitoso (modo demo)');
        navigate('/select-role');
      } else if (email === 'coordinator@example.com' && password === 'password') {
        const user = {
          id: '2',
          name: 'Coordinador',
          email: 'coordinator@example.com',
          role: 'coordinator' as const
        };
        setUser(user);
        toast.success('Inicio de sesión exitoso (modo demo)');
        navigate('/select-role');
      } else {
        toast.error('Credenciales incorrectas');
      }
      
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <School className="h-10 w-10 text-brand-blue" />
            <span className="font-bold text-3xl">CoordiTrack</span>
          </div>
        </div>
        
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Iniciar Sesión</CardTitle>
            <CardDescription className="text-center">
              Ingresa tus credenciales para acceder al sistema
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="correo@ejemplo.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button 
                    type="button"
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Demo de acceso:</p>
          <p>Admin: admin@example.com / password</p>
          <p>Coordinador: coordinator@example.com / password</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
