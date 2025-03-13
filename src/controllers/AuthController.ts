
import { AuthModel } from '@/models/AuthModel';
import { toast } from 'sonner';
import { User } from '@/App';

export class AuthController {
  static async login(email: string, password: string, setUser: React.Dispatch<React.SetStateAction<User>>): Promise<boolean> {
    try {
      const user = await AuthModel.login(email, password);
      setUser(user);
      toast.success('Inicio de sesión exitoso');
      return true;
    } catch (error) {
      console.error("Error en AuthController.login:", error);
      toast.error('Credenciales incorrectas');
      return false;
    }
  }

  static async logout(setUser: React.Dispatch<React.SetStateAction<User>>): Promise<void> {
    try {
      await AuthModel.logout();
      setUser(null);
      localStorage.removeItem("user");
      toast.success('Sesión cerrada');
    } catch (error) {
      console.error("Error en AuthController.logout:", error);
      toast.error('Error al cerrar sesión');
    }
  }
}
