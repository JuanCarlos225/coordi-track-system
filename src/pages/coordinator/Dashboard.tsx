
import React, { useState, useEffect } from 'react';
import CoordinatorLayout from '@/components/CoordinatorLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  BookOpen, 
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { GroupController } from '@/controllers/GroupController';
import { GroupData } from '@/models/GroupModel';

const Dashboard = () => {
  const [groups, setGroups] = useState<GroupData[]>([]);
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
  
  // Calcular estadísticas
  const totalGroups = groups.length;
  const totalStudents = groups.reduce((sum, group) => sum + group.alumnosTotales, 0);
  const completeGroups = groups.filter(g => g.estado === 'completo').length;
  const incompleteGroups = totalGroups - completeGroups;
  const totalAttendance = groups.length > 0 
    ? Math.round(
        groups.reduce((sum, group) => 
          sum + (group.alumnosPresentes / group.alumnosTotales) * 100, 0
        ) / groups.length
      ) 
    : 0;
  const notifications = incompleteGroups;
  
  return (
    <CoordinatorLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Dashboard del Coordinador</h1>
      </div>
      
      {loading ? (
        <div className="text-center py-8">Cargando datos...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="card-hover">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Users className="h-5 w-5 text-brand-teal" />
                  Grupos Asignados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalGroups}</div>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-brand-teal" />
                  Total de Alumnos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalStudents}</div>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-brand-amber" />
                  Notificaciones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{notifications}</div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-brand-amber" />
                  Estado de Asistencia
                </CardTitle>
                <CardDescription>
                  Resumen de asistencia de tus grupos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Grupos Completos</span>
                    </div>
                    <Badge variant="outline" className="bg-green-50">
                      {completeGroups}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      <span>Grupos Incompletos</span>
                    </div>
                    <Badge variant="outline" className="bg-amber-50">
                      {incompleteGroups}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Asistencia Total</span>
                      <span className="text-sm font-medium">{totalAttendance}%</span>
                    </div>
                    <Progress value={totalAttendance} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-brand-amber" />
                  Notificaciones Recientes
                </CardTitle>
                <CardDescription>
                  Alertas sobre la asistencia de tus grupos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {groups.filter(g => g.estado === 'incompleto').slice(0, 2).map((group, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-md bg-amber-50 border border-amber-200">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <p className="font-medium">{group.grupo} - Faltan {group.alumnosTotales - group.alumnosPresentes} alumnos</p>
                        <p className="text-sm text-gray-600">Hoy, {new Date().getHours()}:{new Date().getMinutes().toString().padStart(2, '0')} {new Date().getHours() >= 12 ? 'PM' : 'AM'}</p>
                      </div>
                    </div>
                  ))}
                  
                  {groups.filter(g => g.estado === 'completo').slice(0, 1).map((group, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-md bg-green-50 border border-green-200">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">{group.grupo} - Asistencia completa</p>
                        <p className="text-sm text-gray-600">Hoy, {new Date().getHours()}:{new Date().getMinutes().toString().padStart(2, '0')} {new Date().getHours() >= 12 ? 'PM' : 'AM'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Estado de Grupos</CardTitle>
                <CardDescription>
                  Resumen de asistencia actual de tus grupos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 border-b bg-muted/50 p-3 font-medium">
                    <div>Grupo</div>
                    <div>Maestro</div>
                    <div>Alumnos Totales</div>
                    <div>Alumnos Presentes</div>
                    <div>Estado</div>
                  </div>
                  
                  {groups.map((group, index) => (
                    <div key={index} className="grid grid-cols-5 border-b p-3">
                      <div className="font-medium">{group.grupo}</div>
                      <div>{group.maestro}</div>
                      <div>{group.alumnosTotales}</div>
                      <div>{group.alumnosPresentes}</div>
                      <div>
                        <Badge 
                          variant="outline" 
                          className={group.estado === "completo"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                          }
                        >
                          {group.estado === "completo" ? "Completo" : "Incompleto"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </CoordinatorLayout>
  );
};

export default Dashboard;
