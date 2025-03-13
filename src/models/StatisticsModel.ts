
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/config/firebase';

export interface AttendanceData {
  day: string;
  asistencia: number;
  ausencia: number;
}

export interface MonthlyAttendanceData {
  semana: string;
  asistencia: number;
  ausencia: number;
}

export interface CareerAttendanceData {
  name: string;
  value: number;
}

export interface AttendanceDetailData {
  carrera?: string;
  grupo: string;
  totalAlumnos: number;
  asistenciaPromedio: number;
  tendencia: string;
  tendenciaValor: number;
  alertas?: number;
}

export class StatisticsModel {
  static async getWeeklyAttendance(carrera?: string): Promise<AttendanceData[]> {
    try {
      // Aquí iría la lógica para obtener datos de Firebase
      const attendanceCollection = collection(db, "attendance");
      let q = attendanceCollection;
      
      if (carrera && carrera !== 'todas') {
        q = query(attendanceCollection, where("carrera", "==", carrera));
      }
      
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        // Procesar datos reales de Firebase
        // Este es un ejemplo muy simplificado
        return querySnapshot.docs.map(doc => doc.data() as AttendanceData);
      }
      
      // Retornar datos de prueba como fallback
      return [
        { day: 'Lunes', asistencia: 92, ausencia: 8 },
        { day: 'Martes', asistencia: 88, ausencia: 12 },
        { day: 'Miércoles', asistencia: 95, ausencia: 5 },
        { day: 'Jueves', asistencia: 85, ausencia: 15 },
        { day: 'Viernes', asistencia: 78, ausencia: 22 },
      ];
    } catch (error) {
      console.error("Error fetching weekly attendance:", error);
      return [
        { day: 'Lunes', asistencia: 92, ausencia: 8 },
        { day: 'Martes', asistencia: 88, ausencia: 12 },
        { day: 'Miércoles', asistencia: 95, ausencia: 5 },
        { day: 'Jueves', asistencia: 85, ausencia: 15 },
        { day: 'Viernes', asistencia: 78, ausencia: 22 },
      ];
    }
  }

  static async getMonthlyAttendance(carrera?: string): Promise<MonthlyAttendanceData[]> {
    try {
      // Lógica similar para datos mensuales de Firebase
      // ...
      
      // Retornar datos de prueba como fallback
      return [
        { semana: 'Semana 1', asistencia: 90, ausencia: 10 },
        { semana: 'Semana 2', asistencia: 87, ausencia: 13 },
        { semana: 'Semana 3', asistencia: 92, ausencia: 8 },
        { semana: 'Semana 4', asistencia: 88, ausencia: 12 },
      ];
    } catch (error) {
      console.error("Error fetching monthly attendance:", error);
      return [
        { semana: 'Semana 1', asistencia: 90, ausencia: 10 },
        { semana: 'Semana 2', asistencia: 87, ausencia: 13 },
        { semana: 'Semana 3', asistencia: 92, ausencia: 8 },
        { semana: 'Semana 4', asistencia: 88, ausencia: 12 },
      ];
    }
  }

  static async getCareerAttendance(): Promise<CareerAttendanceData[]> {
    try {
      // Lógica para obtener datos de asistencia por carrera
      // ...
      
      // Datos de prueba
      return [
        { name: 'Sistemas', value: 92 },
        { name: 'Derecho', value: 85 },
        { name: 'Contabilidad', value: 88 },
        { name: 'Arquitectura', value: 91 },
        { name: 'Medicina', value: 95 },
      ];
    } catch (error) {
      console.error("Error fetching career attendance:", error);
      return [
        { name: 'Sistemas', value: 92 },
        { name: 'Derecho', value: 85 },
        { name: 'Contabilidad', value: 88 },
        { name: 'Arquitectura', value: 91 },
        { name: 'Medicina', value: 95 },
      ];
    }
  }

  static async getAttendanceDetails(isAdmin: boolean = false): Promise<AttendanceDetailData[]> {
    try {
      // Lógica para obtener detalles de asistencia
      // ...
      
      // Datos de prueba para administrador
      if (isAdmin) {
        return [
          { carrera: 'Ingeniería en Sistemas', grupo: 'Grupo A - 1er Semestre', totalAlumnos: 32, asistenciaPromedio: 92, tendencia: '↗', tendenciaValor: 3 },
          { carrera: 'Ingeniería en Sistemas', grupo: 'Grupo B - 1er Semestre', totalAlumnos: 30, asistenciaPromedio: 87, tendencia: '↘', tendenciaValor: -2 },
          { carrera: 'Licenciatura en Derecho', grupo: 'Grupo A - 1er Semestre', totalAlumnos: 35, asistenciaPromedio: 85, tendencia: '↘', tendenciaValor: -1 },
          { carrera: 'Medicina', grupo: 'Grupo A - 3er Semestre', totalAlumnos: 28, asistenciaPromedio: 95, tendencia: '↗', tendenciaValor: 2 },
          { carrera: 'Arquitectura', grupo: 'Grupo A - 5to Semestre', totalAlumnos: 25, asistenciaPromedio: 91, tendencia: '→', tendenciaValor: 0 },
        ];
      }
      
      // Datos de prueba para coordinador
      return [
        { grupo: 'Grupo A - 1er Semestre', totalAlumnos: 32, asistenciaPromedio: 92, tendencia: '↗', tendenciaValor: 3, alertas: 1 },
        { grupo: 'Grupo B - 1er Semestre', totalAlumnos: 30, asistenciaPromedio: 87, tendencia: '↘', tendenciaValor: -2, alertas: 2 },
        { grupo: 'Grupo A - 3er Semestre', totalAlumnos: 28, asistenciaPromedio: 94, tendencia: '↗', tendenciaValor: 1, alertas: 0 },
      ];
    } catch (error) {
      console.error("Error fetching attendance details:", error);
      return [];
    }
  }
}
