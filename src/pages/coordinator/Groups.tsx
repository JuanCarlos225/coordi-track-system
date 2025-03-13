
import React, { useState, useEffect } from 'react';
import CoordinatorLayout from '@/components/CoordinatorLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Search,
  Eye,
  Users,
  UserCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from '@/components/ui/progress';
import { GroupController } from '@/controllers/GroupController';
import { GroupData, StudentData } from '@/models/GroupModel';

const Groups = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [groups, setGroups] = useState<GroupData[]>([]);
  const [students, setStudents] = useState<StudentData[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data = await GroupController.getAllGroups();
        setGroups(data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchGroups();
  }, []);
  
  useEffect(() => {
    if (selectedGroup) {
      const fetchStudents = async () => {
        try {
          const data = await GroupController.getStudentsByGroup(selectedGroup);
          setStudents(data);
        } catch (error) {
          console.error("Error fetching students:", error);
        }
      };
      
      fetchStudents();
    }
  }, [selectedGroup]);
  
  const filteredGroups = groups.filter(group => 
    group.grupo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.carrera.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.maestro.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <CoordinatorLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Grupos Asignados</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Lista de Grupos</CardTitle>
          <CardDescription>
            Visualiza los grupos académicos a tu cargo y su estado de asistencia.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar grupo..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {loading ? (
            <div className="text-center py-8">Cargando grupos...</div>
          ) : (
            <div className="rounded-md border">
              <div className="grid grid-cols-6 border-b bg-muted/50 p-3 font-medium">
                <div>Grupo</div>
                <div>Carrera</div>
                <div>Maestro</div>
                <div>Alumnos</div>
                <div>Estado</div>
                <div className="text-right">Acciones</div>
              </div>
              
              {filteredGroups.length === 0 ? (
                <div className="p-3 text-center text-gray-500">No se encontraron grupos.</div>
              ) : (
                filteredGroups.map((group) => (
                  <div key={group.id} className="grid grid-cols-6 border-b p-3">
                    <div className="font-medium">{group.grupo}</div>
                    <div>{group.carrera}</div>
                    <div>{group.maestro}</div>
                    <div>{group.alumnosPresentes}/{group.alumnosTotales}</div>
                    <div>
                      <Badge 
                        variant="outline" 
                        className={group.estado === 'completo' 
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                        }
                      >
                        {group.estado === 'completo' ? 'Completo' : 'Incompleto'}
                      </Badge>
                    </div>
                    <div className="flex justify-end">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => setSelectedGroup(group.grupo)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
                          <DialogHeader>
                            <DialogTitle>Detalle del Grupo {selectedGroup}</DialogTitle>
                            <DialogDescription>
                              Información detallada del grupo y asistencia de alumnos.
                            </DialogDescription>
                          </DialogHeader>
                          
                          {students.length > 0 && (
                            <div className="space-y-6 py-4">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Card>
                                  <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                                      <Users className="h-4 w-4 text-brand-teal" />
                                      Alumnos
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="text-2xl font-bold">{students.length}</div>
                                  </CardContent>
                                </Card>
                                
                                <Card>
                                  <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                                      <UserCheck className="h-4 w-4 text-green-500" />
                                      Presentes
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="text-2xl font-bold">
                                      {students.filter(s => s.presente).length}
                                    </div>
                                  </CardContent>
                                </Card>
                                
                                <Card>
                                  <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                                      <Users className="h-4 w-4 text-amber-500" />
                                      Ausentes
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="text-2xl font-bold">
                                      {students.filter(s => !s.presente).length}
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-gray-500">Porcentaje de Asistencia</span>
                                  <span className="text-sm font-medium">
                                    {GroupController.calculateAttendancePercentageFromStudents(students)}%
                                  </span>
                                </div>
                                <Progress 
                                  value={GroupController.calculateAttendancePercentageFromStudents(students)} 
                                  className="h-2" 
                                />
                              </div>
                              
                              <div className="rounded-md border">
                                <div className="grid grid-cols-3 border-b bg-muted/50 p-3 font-medium">
                                  <div>Nombre</div>
                                  <div>Matrícula</div>
                                  <div>Estado</div>
                                </div>
                                
                                <div className="max-h-60 overflow-auto">
                                  {students.map((student) => (
                                    <div key={student.id} className="grid grid-cols-3 border-b p-3">
                                      <div className="font-medium">{student.nombre}</div>
                                      <div>{student.matricula}</div>
                                      <div>
                                        <Badge 
                                          variant="outline" 
                                          className={student.presente 
                                            ? "bg-green-50 text-green-700 border-green-200"
                                            : "bg-red-50 text-red-700 border-red-200"
                                          }
                                        >
                                          {student.presente ? 'Presente' : 'Ausente'}
                                        </Badge>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </CoordinatorLayout>
  );
};

export default Groups;
