
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/config/firebase';
import { User } from '@/App';

export class AuthModel {
  static async login(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return {
          id: firebaseUser.uid,
          name: userData.name || 'Usuario',
          email: firebaseUser.email || '',
          role: userData.role as 'admin' | 'coordinator'
        };
      } else {
        throw new Error('No se encontró información del usuario');
      }
    } catch (error) {
      console.error("Error en inicio de sesión:", error);
      
      // Modo demo para desarrollo
      if (email === 'admin@example.com' && password === 'password') {
        return {
          id: '1',
          name: 'Administrador',
          email: 'admin@example.com',
          role: 'admin'
        };
      } else if (email === 'coordinator@example.com' && password === 'password') {
        return {
          id: '2',
          name: 'Coordinador',
          email: 'coordinator@example.com',
          role: 'coordinator'
        };
      }
      
      throw error;
    }
  }

  static async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      throw error;
    }
  }
}
