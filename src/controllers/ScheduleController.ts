
import { ScheduleModel, ScheduleData } from '@/models/ScheduleModel';
import { toast } from 'sonner';

export class ScheduleController {
  static async getSchedules(): Promise<ScheduleData[]> {
    try {
      return await ScheduleModel.getSchedules();
    } catch (error) {
      console.error("Error in ScheduleController.getSchedules:", error);
      throw error;
    }
  }

  static async downloadSchedule(fileName: string): Promise<void> {
    try {
      // Aquí iría la lógica para descargar el archivo
      // Para este ejemplo solo mostramos una notificación
      toast.success(`Descargando ${fileName}`);
    } catch (error) {
      console.error("Error in ScheduleController.downloadSchedule:", error);
      toast.error(`Error al descargar ${fileName}`);
    }
  }

  static filterSchedules(
    schedules: ScheduleData[], 
    searchQuery: string = '', 
    selectedGroup: string = '', 
    selectedPeriod: string = ''
  ): ScheduleData[] {
    return schedules.filter(s => {
      const matchesSearch = 
        s.grupo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.periodo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.archivo.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesGroup = selectedGroup === "" || s.grupo === selectedGroup;
      const matchesPeriod = selectedPeriod === "" || s.periodo === selectedPeriod;
      
      return matchesSearch && matchesGroup && matchesPeriod;
    });
  }
}
