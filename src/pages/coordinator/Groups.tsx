
import React, { useState } from 'react';
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

// Mock group data
const groupsData = [
  { id: 1, grupo: 'A101', carrera: 'Ingeniería en Sistemas', maestro: 'Luis Hernández', alumnosTotales: 20, alumnosPresentes: 18, estado: 'incompleto' },
  { id: 2, grupo: 'C205', carrera: 'Contabilidad', maestro: 'María González', alumnosTotales: 25, alumnosPresentes: 24, estado: 'incompleto' },
  { id: 3, grupo: 'B403', carrera: 'Licenciatura en Derecho', maestro: 'Roberto Juárez', alumnosTotales: 30, alumnosPresentes: 30, estado: 'completo' },
  { id: 4, grupo: 'D105', carrera: 'Psicología', maestro: 'Laura Vázquez', alumnosTotales: 28, alumnosPresentes: 28, estado: 'completo' },
  { id: 5, grupo: 'E201', carrera: 'Administración de Empresas', maestro: 'Carlos Mendoza', alumnosTotales: 22, alumnosPresentes: 22, estado: 'completo' },
];

// Mock students for detail view
const studentsData = {
  'A101': [
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
  ]
};

const Groups = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  
  const filteredGroups = groupsData.filter(group => 
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
          
          <div className="rounded-md border">
            <div className="grid grid-cols-6 border-b bg-muted/50 p-3 font-medium">
              <div>Grupo</div>
              <div>Carrera</div>
              <div>Maestro</div>
              <div>Alumnos</div>
              <div>Estado</div>
              <div className="text-right">Acciones</div>
            </div>
            
            {filteredGroups.map((group) => (
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
                      
                      {selectedGroup && (
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
                                <div className="text-2xl font-bold">{studentsData[selectedGroup as keyof typeof studentsData]?.length || 0}</div>
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
                                  {studentsData[selectedGroup as keyof typeof studentsData]?.filter(s => s.presente).length || 0}
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
                                  {studentsData[selectedGroup as keyof typeof studentsData]?.filter(s => !s.presente).length || 0}
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500">Porcentaje de Asistencia</span>
                              <span className="text-sm font-medium">
                                {studentsData[selectedGroup as keyof typeof studentsData] 
                                  ? Math.round((studentsData[selectedGroup as keyof typeof studentsData].filter(s => s.presente).length / 
                                    studentsData[selectedGroup as keyof typeof studentsData].length) * 100) 
                                  : 0}%
                              </span>
                            </div>
                            <Progress 
                              value={studentsData[selectedGroup as keyof typeof studentsData] 
                                ? (studentsData[selectedGroup as keyof typeof studentsData].filter(s => s.presente).length / 
                                  studentsData[selectedGroup as keyof typeof studentsData].length) * 100 
                                : 0} 
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
                              {studentsData[selectedGroup as keyof typeof studentsData]?.map((student) => (
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
            ))}
          </div>
        </CardContent>
      </Card>
    </CoordinatorLayout>
  );
};

export default Groups;
