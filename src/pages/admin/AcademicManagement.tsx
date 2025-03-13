
import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  UserIcon, 
  BookOpen, 
  Users, 
  Bell
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from 'sonner';

// Mock data
const careers = [
  { id: 1, nombre: 'Ingeniería en Sistemas Computacionales', grupos: 12, coordinador: 'Ana Martínez' },
  { id: 2, nombre: 'Licenciatura en Derecho', grupos: 10, coordinador: 'Carlos López' },
  { id: 3, nombre: 'Contaduría Pública', grupos: 8, coordinador: 'Laura Sánchez' },
  { id: 4, nombre: 'Arquitectura', grupos: 5, coordinador: 'Roberto Jiménez' },
  { id: 5, nombre: 'Medicina', grupos: 15, coordinador: 'Patricia González' },
  { id: 6, nombre: 'Psicología', grupos: 7, coordinador: 'Miguel Torres' },
  { id: 7, nombre: 'Administración de Empresas', grupos: 9, coordinador: 'Isabel Ramírez' },
  { id: 8, nombre: 'Ingeniería Civil', grupos: 6, coordinador: 'Javier Morales' },
];

const groups = [
  { id: 1, carrera: 'Ingeniería en Sistemas Computacionales', nombre: 'Grupo A - 1er Semestre', alumnos: 32, maestro: 'Dr. Ricardo Hernández' },
  { id: 2, carrera: 'Ingeniería en Sistemas Computacionales', nombre: 'Grupo B - 1er Semestre', alumnos: 30, maestro: 'Dra. Susana López' },
  { id: 3, carrera: 'Ingeniería en Sistemas Computacionales', nombre: 'Grupo A - 3er Semestre', alumnos: 28, maestro: 'Mtro. Eduardo Sánchez' },
  { id: 4, carrera: 'Ingeniería en Sistemas Computacionales', nombre: 'Grupo A - 5to Semestre', alumnos: 25, maestro: 'Dr. Alejandro Torres' },
  { id: 5, carrera: 'Licenciatura en Derecho', nombre: 'Grupo A - 1er Semestre', alumnos: 35, maestro: 'Dr. Javier Robles' },
  { id: 6, carrera: 'Licenciatura en Derecho', nombre: 'Grupo B - 1er Semestre', alumnos: 33, maestro: 'Dra. Mariana Álvarez' },
];

const notifications = [
  { id: 1, grupo: 'Sistemas - Grupo A - 1er Semestre', mensaje: '3 alumnos ausentes', fecha: '2023-06-10 10:15', leida: false },
  { id: 2, grupo: 'Derecho - Grupo B - 1er Semestre', mensaje: '2 alumnos ausentes', fecha: '2023-06-10 11:30', leida: true },
  { id: 3, grupo: 'Sistemas - Grupo A - 3er Semestre', mensaje: '1 alumno ausente', fecha: '2023-06-09 09:45', leida: false },
  { id: 4, grupo: 'Derecho - Grupo A - 1er Semestre', mensaje: 'Grupo completo', fecha: '2023-06-09 12:00', leida: true },
];

const AcademicManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('careers');
  
  const filteredCareers = careers.filter(c => 
    c.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.coordinador.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredGroups = groups.filter(g => 
    g.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.carrera.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.maestro.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredNotifications = notifications.filter(n => 
    n.grupo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.mensaje.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleMarkAsRead = (id: number) => {
    toast.success('Notificación marcada como leída');
  };
  
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Gestión Académica</h1>
      </div>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="careers" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Carreras</span>
          </TabsTrigger>
          <TabsTrigger value="groups" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Grupos</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Notificaciones</span>
          </TabsTrigger>
        </TabsList>
        
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedTab === 'careers' && 'Lista de Carreras'}
              {selectedTab === 'groups' && 'Lista de Grupos'}
              {selectedTab === 'notifications' && 'Notificaciones de Asistencia'}
            </CardTitle>
            <CardDescription>
              {selectedTab === 'careers' && 'Visualiza todas las carreras disponibles.'}
              {selectedTab === 'groups' && 'Explora los grupos académicos.'}
              {selectedTab === 'notifications' && 'Recibe alertas sobre la asistencia de alumnos.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={
                    selectedTab === 'careers' ? "Buscar carrera..." :
                    selectedTab === 'groups' ? "Buscar grupo..." :
                    "Buscar notificación..."
                  }
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <TabsContent value="careers" className="mt-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-4 border-b bg-muted/50 p-3 font-medium">
                  <div>Nombre de la Carrera</div>
                  <div>Coordinador</div>
                  <div>Grupos</div>
                  <div className="text-right">Acciones</div>
                </div>
                
                {filteredCareers.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    No se encontraron carreras.
                  </div>
                ) : (
                  filteredCareers.map((career) => (
                    <div key={career.id} className="grid grid-cols-4 border-b p-3">
                      <div className="font-medium">{career.nombre}</div>
                      <div>{career.coordinador}</div>
                      <div>{career.grupos}</div>
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm">
                          Ver Detalles
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="groups" className="mt-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-5 border-b bg-muted/50 p-3 font-medium">
                  <div>Carrera</div>
                  <div>Grupo</div>
                  <div>Maestro</div>
                  <div>Alumnos</div>
                  <div className="text-right">Acciones</div>
                </div>
                
                {filteredGroups.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    No se encontraron grupos.
                  </div>
                ) : (
                  filteredGroups.map((group) => (
                    <div key={group.id} className="grid grid-cols-5 border-b p-3">
                      <div>{group.carrera}</div>
                      <div className="font-medium">{group.nombre}</div>
                      <div>{group.maestro}</div>
                      <div>{group.alumnos}</div>
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm">
                          Ver Asistencia
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="notifications" className="mt-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-4 border-b bg-muted/50 p-3 font-medium">
                  <div>Grupo</div>
                  <div>Mensaje</div>
                  <div>Fecha</div>
                  <div className="text-right">Acciones</div>
                </div>
                
                {filteredNotifications.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    No hay notificaciones.
                  </div>
                ) : (
                  filteredNotifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`grid grid-cols-4 border-b p-3 ${!notification.leida ? 'bg-blue-50' : ''}`}
                    >
                      <div className="font-medium">{notification.grupo}</div>
                      <div>{notification.mensaje}</div>
                      <div>{notification.fecha}</div>
                      <div className="flex justify-end">
                        {!notification.leida ? (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            Marcar como leída
                          </Button>
                        ) : (
                          <span className="text-gray-400 px-3 py-2">Leída</span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </AdminLayout>
  );
};

export default AcademicManagement;
