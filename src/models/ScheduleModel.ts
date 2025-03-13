
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/config/firebase';

export interface ScheduleData {
  id: number;
  carrera: string;
  grupo: string;
  periodo: string;
  archivo: string;
}

export class ScheduleModel {
  static async getSchedules(): Promise<ScheduleData[]> {
    try {
      const schedulesCollection = collection(db, "schedules");
      const querySnapshot = await getDocs(schedulesCollection);
      
      if (!querySnapshot.empty) {
        return querySnapshot.docs.map(doc => ({
          id: doc.id ? Number(doc.id) : 0,
          ...doc.data()
        } as ScheduleData));
      }
      
      // Datos de prueba como fallback
      return [
        { id: 1, carrera: 'Ingeniería en Sistemas Computacionales', grupo: 'Grupo A - 1er Semestre', periodo: 'Agosto-Diciembre 2023', archivo: 'horarios_sistemas_1A_ago_dic_2023.pdf' },
        { id: 2, carrera: 'Ingeniería en Sistemas Computacionales', grupo: 'Grupo B - 1er Semestre', periodo: 'Agosto-Diciembre 2023', archivo: 'horarios_sistemas_1B_ago_dic_2023.pdf' },
        { id: 3, carrera: 'Ingeniería en Sistemas Computacionales', grupo: 'Grupo A - 3er Semestre', periodo: 'Agosto-Diciembre 2023', archivo: 'horarios_sistemas_3A_ago_dic_2023.pdf' },
        { id: 4, carrera: 'Ingeniería en Sistemas Computacionales', grupo: 'Grupo A - 1er Semestre', periodo: 'Enero-Junio 2023', archivo: 'horarios_sistemas_1A_ene_jun_2023.pdf' },
        { id: 5, carrera: 'Ingeniería en Sistemas Computacionales', grupo: 'Grupo B - 1er Semestre', periodo: 'Enero-Junio 2023', archivo: 'horarios_sistemas_1B_ene_jun_2023.pdf' },
      ];
    } catch (error) {
      console.error("Error fetching schedules:", error);
      return [
        { id: 1, carrera: 'Ingeniería en Sistemas Computacionales', grupo: 'Grupo A - 1er Semestre', periodo: 'Agosto-Diciembre 2023', archivo: 'horarios_sistemas_1A_ago_dic_2023.pdf' },
        { id: 2, carrera: 'Ingeniería en Sistemas Computacionales', grupo: 'Grupo B - 1er Semestre', periodo: 'Agosto-Diciembre 2023', archivo: 'horarios_sistemas_1B_ago_dic_2023.pdf' },
        { id: 3, carrera: 'Ingeniería en Sistemas Computacionales', grupo: 'Grupo A - 3er Semestre', periodo: 'Agosto-Diciembre 2023', archivo: 'horarios_sistemas_3A_ago_dic_2023.pdf' },
        { id: 4, carrera: 'Ingeniería en Sistemas Computacionales', grupo: 'Grupo A - 1er Semestre', periodo: 'Enero-Junio 2023', archivo: 'horarios_sistemas_1A_ene_jun_2023.pdf' },
        { id: 5, carrera: 'Ingeniería en Sistemas Computacionales', grupo: 'Grupo B - 1er Semestre', periodo: 'Enero-Junio 2023', archivo: 'horarios_sistemas_1B_ene_jun_2023.pdf' },
      ];
    }
  }
}
