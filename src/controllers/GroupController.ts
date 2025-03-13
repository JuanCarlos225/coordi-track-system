
import { GroupModel, GroupData, StudentData } from '@/models/GroupModel';

export class GroupController {
  static async getAllGroups(): Promise<GroupData[]> {
    try {
      return await GroupModel.getAllGroups();
    } catch (error) {
      console.error("Error in GroupController.getAllGroups:", error);
      throw error;
    }
  }

  static async getStudentsByGroup(groupId: string): Promise<StudentData[]> {
    try {
      return await GroupModel.getStudentsByGroup(groupId);
    } catch (error) {
      console.error("Error in GroupController.getStudentsByGroup:", error);
      throw error;
    }
  }

  static calculateAttendancePercentage(group: GroupData): number {
    if (group.alumnosTotales === 0) return 0;
    return Math.round((group.alumnosPresentes / group.alumnosTotales) * 100);
  }

  static calculateAttendancePercentageFromStudents(students: StudentData[]): number {
    if (students.length === 0) return 0;
    const presentStudents = students.filter(s => s.presente).length;
    return Math.round((presentStudents / students.length) * 100);
  }
}
