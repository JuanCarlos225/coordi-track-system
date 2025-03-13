
import { doc, getDoc, getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '@/config/firebase';

export interface GroupData {
  id: number;
  grupo: string;
  carrera: string;
  maestro: string;
  alumnosTotales: number;
  alumnosPresentes: number;
  estado: 'completo' | 'incompleto';
}

export interface StudentData {
  id: number;
  nombre: string;
  matricula: string;
  presente: boolean;
}

export class GroupModel {
  static async getAllGroups(): Promise<GroupData[]> {
    try {
      const querySnapshot = await getDocs(collection(db, "groups"));
      if (querySnapshot.empty) {
        // Fallback para datos de prueba
        return [
          { id: 1, grupo: 'A101', carrera: 'Ingeniería en Sistemas', maestro: 'Luis Hernández', alumnosTotales: 20, alumnosPresentes: 18, estado: 'incompleto' },
          { id: 2, grupo: 'C205', carrera: 'Contabilidad', maestro: 'María González', alumnosTotales: 25, alumnosPresentes: 24, estado: 'incompleto' },
          { id: 3, grupo: 'B403', carrera: 'Licenciatura en Derecho', maestro: 'Roberto Juárez', alumnosTotales: 30, alumnosPresentes: 30, estado: 'completo' },
          { id: 4, grupo: 'D105', carrera: 'Psicología', maestro: 'Laura Vázquez', alumnosTotales: 28, alumnosPresentes: 28, estado: 'completo' },
          { id: 5, grupo: 'E201', carrera: 'Administración de Empresas', maestro: 'Carlos Mendoza', alumnosTotales: 22, alumnosPresentes: 22, estado: 'completo' },
        ];
      }
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id ? Number(doc.id) : 0,
        ...doc.data()
      } as GroupData));
    } catch (error) {
      console.error("Error fetching groups:", error);
      // Fallback para datos de prueba en caso de error
      return [
        { id: 1, grupo: 'A101', carrera: 'Ingeniería en Sistemas', maestro: 'Luis Hernández', alumnosTotales: 20, alumnosPresentes: 18, estado: 'incompleto' },
        { id: 2, grupo: 'C205', carrera: 'Contabilidad', maestro: 'María González', alumnosTotales: 25, alumnosPresentes: 24, estado: 'incompleto' },
        { id: 3, grupo: 'B403', carrera: 'Licenciatura en Derecho', maestro: 'Roberto Juárez', alumnosTotales: 30, alumnosPresentes: 30, estado: 'completo' },
        { id: 4, grupo: 'D105', carrera: 'Psicología', maestro: 'Laura Vázquez', alumnosTotales: 28, alumnosPresentes: 28, estado: 'completo' },
        { id: 5, grupo: 'E201', carrera: 'Administración de Empresas', maestro: 'Carlos Mendoza', alumnosTotales: 22, alumnosPresentes: 22, estado: 'completo' },
      ];
    }
  }

  static async getStudentsByGroup(groupId: string): Promise<StudentData[]> {
    try {
      const groupRef = doc(db, "groups", groupId);
      const groupDoc = await getDoc(groupRef);
      
      if (groupDoc.exists() && groupDoc.data().students) {
        return groupDoc.data().students as StudentData[];
      }
      
      // Buscar en una colección de estudiantes
      const studentCollection = collection(db, "students");
      const q = query(studentCollection, where("groupId", "==", groupId));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        return querySnapshot.docs.map(doc => ({
          id: doc.id ? Number(doc.id) : 0,
          ...doc.data()
        } as StudentData));
      }
      
      // Datos de prueba como fallback
      if (groupId === 'A101') {
        return [
          { id: 1, nombre: 'Ana García', matricula: 'A12345', presente: true },
          { id: 2, nombre: 'Carlos López', matricula: 'A12346', presente: true },
          { id: 3, nombre: 'David Martínez', matricula: 'A12347', presente: false },
          { id: 4, nombre: 'Elena Rodríguez', matricula: 'A12348', presente: true },
          { id: 5, nombre: 'Fernando Sánchez', matricula: 'A12349', presente: true },
          { id: 6, nombre: 'Gabriela Torres', matricula: 'A12350', presente: true },
          { id: 7, nombre: 'Héctor Vázquez', matricula: 'A12351', presente: true },
          { id: 8, nombre: 'Irene Ramírez', matricula: 'A12352', presente: true },
          { id: 9, nombre: 'Javier Gómez', matricula: 'A12353', presente: true },
          { id: 10, nombre: 'Karla Flores', matricula: 'A12354', presente: false },
          { id: 11, nombre: 'Luis Morales', matricula: 'A12355', presente: true },
          { id: 12, nombre: 'María Navarro', matricula: 'A12356', presente: true },
          { id: 13, nombre: 'Nicolás Ortiz', matricula: 'A12357', presente: true },
          { id: 14, nombre: 'Olivia Pérez', matricula: 'A12358', presente: true },
          { id: 15, nombre: 'Pablo Quintana', matricula: 'A12359', presente: true },
          { id: 16, nombre: 'Quetzal Ruiz', matricula: 'A12360', presente: true },
          { id: 17, nombre: 'Raquel Silva', matricula: 'A12361', presente: true },
          { id: 18, nombre: 'Salvador Treviño', matricula: 'A12362', presente: true },
          { id: 19, nombre: 'Teresa Urbina', matricula: 'A12363', presente: true },
          { id: 20, nombre: 'Ulises Vargas', matricula: 'A12364', presente: true },
        ];
      }
      
      return [];
    } catch (error) {
      console.error("Error fetching students:", error);
      // Fallback para datos de prueba
      if (groupId === 'A101') {
        return [
          { id: 1, nombre: 'Ana García', matricula: 'A12345', presente: true },
          { id: 2, nombre: 'Carlos López', matricula: 'A12346', presente: true },
          { id: 3, nombre: 'David Martínez', matricula: 'A12347', presente: false },
          // ... más estudiantes de prueba
        ];
      }
      return [];
    }
  }
}
