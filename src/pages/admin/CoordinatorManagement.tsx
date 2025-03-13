
import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Search,
  Check,
  X
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from 'sonner';

// Mock coordinator data
const initialCoordinators = [
  { id: 1, nombre: 'Ana Martínez', email: 'ana.martinez@example.com', carrera: 'Ingeniería en Sistemas', grupos: 5 },
  { id: 2, nombre: 'Carlos López', email: 'carlos.lopez@example.com', carrera: 'Licenciatura en Derecho', grupos: 4 },
  { id: 3, nombre: 'Laura Sánchez', email: 'laura.sanchez@example.com', carrera: 'Contabilidad', grupos: 3 },
  { id: 4, nombre: 'Roberto Jiménez', email: 'roberto.jimenez@example.com', carrera: 'Arquitectura', grupos: 6 },
  { id: 5, nombre: 'Patricia González', email: 'patricia.gonzalez@example.com', carrera: 'Medicina', grupos: 7 },
  { id: 6, nombre: 'Miguel Torres', email: 'miguel.torres@example.com', carrera: 'Psicología', grupos: 4 },
  { id: 7, nombre: 'Isabel Ramírez', email: 'isabel.ramirez@example.com', carrera: 'Administración de Empresas', grupos: 5 },
  { id: 8, nombre: 'Javier Morales', email: 'javier.morales@example.com', carrera: 'Ingeniería Civil', grupos: 3 },
];

interface Coordinator {
  id: number;
  nombre: string;
  email: string;
  carrera: string;
  grupos: number;
}

const CoordinatorManagement = () => {
  const [coordinators, setCoordinators] = useState<Coordinator[]>(initialCoordinators);
  const [searchQuery, setSearchQuery] = useState('');
  const [editing, setEditing] = useState<Coordinator | null>(null);
  const [newCoordinator, setNewCoordinator] = useState({
    nombre: '',
    email: '',
    carrera: '',
    grupos: 0
  });
  
  const filteredCoordinators = coordinators.filter(c => 
    c.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.carrera.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAddCoordinator = () => {
    const id = Math.max(0, ...coordinators.map(c => c.id)) + 1;
    setCoordinators([...coordinators, { ...newCoordinator, id }]);
    setNewCoordinator({ nombre: '', email: '', carrera: '', grupos: 0 });
    toast.success('Coordinador agregado con éxito');
  };
  
  const handleUpdateCoordinator = () => {
    if (!editing) return;
    
    setCoordinators(coordinators.map(c => 
      c.id === editing.id ? editing : c
    ));
    setEditing(null);
    toast.success('Coordinador actualizado con éxito');
  };
  
  const handleDeleteCoordinator = (id: number) => {
    setCoordinators(coordinators.filter(c => c.id !== id));
    toast.success('Coordinador eliminado con éxito');
  };
  
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Gestión de Coordinadores</h1>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Coordinador
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Coordinador</DialogTitle>
              <DialogDescription>
                Completa los datos del nuevo coordinador.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo</Label>
                <Input 
                  id="name" 
                  value={newCoordinator.nombre}
                  onChange={(e) => setNewCoordinator({...newCoordinator, nombre: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={newCoordinator.email}
                  onChange={(e) => setNewCoordinator({...newCoordinator, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="carrera">Carrera Asignada</Label>
                <Input 
                  id="carrera" 
                  value={newCoordinator.carrera}
                  onChange={(e) => setNewCoordinator({...newCoordinator, carrera: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grupos">Grupos Asignados</Label>
                <Input 
                  id="grupos" 
                  type="number"
                  value={newCoordinator.grupos.toString()}
                  onChange={(e) => setNewCoordinator({...newCoordinator, grupos: parseInt(e.target.value)})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddCoordinator}>Agregar Coordinador</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Lista de Coordinadores</CardTitle>
          <CardDescription>
            Gestiona los coordinadores académicos y sus asignaciones.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar coordinador..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="rounded-md border">
            <div className="grid grid-cols-5 border-b bg-muted/50 p-3 font-medium">
              <div>Nombre</div>
              <div>Correo Electrónico</div>
              <div>Carrera Asignada</div>
              <div>Grupos</div>
              <div className="text-right">Acciones</div>
            </div>
            
            {filteredCoordinators.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                No se encontraron coordinadores.
              </div>
            ) : (
              filteredCoordinators.map((coordinator) => (
                <div key={coordinator.id} className="grid grid-cols-5 border-b p-3">
                  <div className="font-medium">{coordinator.nombre}</div>
                  <div>{coordinator.email}</div>
                  <div>{coordinator.carrera}</div>
                  <div>{coordinator.grupos}</div>
                  <div className="flex justify-end gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="icon" onClick={() => setEditing(coordinator)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Editar Coordinador</DialogTitle>
                          <DialogDescription>
                            Actualiza los datos del coordinador.
                          </DialogDescription>
                        </DialogHeader>
                        {editing && (
                          <>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-name">Nombre Completo</Label>
                                <Input 
                                  id="edit-name" 
                                  value={editing.nombre}
                                  onChange={(e) => setEditing({...editing, nombre: e.target.value})}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-email">Correo Electrónico</Label>
                                <Input 
                                  id="edit-email" 
                                  type="email"
                                  value={editing.email}
                                  onChange={(e) => setEditing({...editing, email: e.target.value})}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-carrera">Carrera Asignada</Label>
                                <Input 
                                  id="edit-carrera" 
                                  value={editing.carrera}
                                  onChange={(e) => setEditing({...editing, carrera: e.target.value})}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-grupos">Grupos Asignados</Label>
                                <Input 
                                  id="edit-grupos" 
                                  type="number"
                                  value={editing.grupos.toString()}
                                  onChange={(e) => setEditing({...editing, grupos: parseInt(e.target.value)})}
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button onClick={handleUpdateCoordinator}>Guardar Cambios</Button>
                            </DialogFooter>
                          </>
                        )}
                      </DialogContent>
                    </Dialog>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="icon" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Eliminar coordinador?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción no se puede deshacer. El coordinador y sus asignaciones serán eliminados permanentemente.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive text-destructive-foreground"
                            onClick={() => handleDeleteCoordinator(coordinator.id)}
                          >
                            Eliminar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default CoordinatorManagement;
