
import { 
  StatisticsModel, 
  AttendanceData, 
  MonthlyAttendanceData, 
  CareerAttendanceData, 
  AttendanceDetailData 
} from '@/models/StatisticsModel';

export class StatisticsController {
  static async getWeeklyAttendance(carrera?: string): Promise<AttendanceData[]> {
    try {
      return await StatisticsModel.getWeeklyAttendance(carrera);
    } catch (error) {
      console.error("Error in StatisticsController.getWeeklyAttendance:", error);
      throw error;
    }
  }

  static async getMonthlyAttendance(carrera?: string): Promise<MonthlyAttendanceData[]> {
    try {
      return await StatisticsModel.getMonthlyAttendance(carrera);
    } catch (error) {
      console.error("Error in StatisticsController.getMonthlyAttendance:", error);
      throw error;
    }
  }

  static async getCareerAttendance(): Promise<CareerAttendanceData[]> {
    try {
      return await StatisticsModel.getCareerAttendance();
    } catch (error) {
      console.error("Error in StatisticsController.getCareerAttendance:", error);
      throw error;
    }
  }

  static async getAttendanceDetails(isAdmin: boolean = false): Promise<AttendanceDetailData[]> {
    try {
      return await StatisticsModel.getAttendanceDetails(isAdmin);
    } catch (error) {
      console.error("Error in StatisticsController.getAttendanceDetails:", error);
      throw error;
    }
  }

  static getBestAttendance(data: CareerAttendanceData[]): { name: string; value: number } {
    if (data.length === 0) return { name: '', value: 0 };
    
    let best = data[0];
    for (const item of data) {
      if (item.value > best.value) {
        best = item;
      }
    }
    
    return best;
  }

  static getLowestAttendanceDay(data: AttendanceData[]): { day: string; value: number } {
    if (data.length === 0) return { day: '', value: 0 };
    
    let lowest = data[0];
    for (const item of data) {
      if (item.asistencia < lowest.asistencia) {
        lowest = item;
      }
    }
    
    return { day: lowest.day, value: lowest.asistencia };
  }

  static getAverageAttendance(data: CareerAttendanceData[]): number {
    if (data.length === 0) return 0;
    
    const sum = data.reduce((acc, curr) => acc + curr.value, 0);
    return Math.round(sum / data.length);
  }
}
