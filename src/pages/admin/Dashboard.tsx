
import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  GraduationCap, 
  Building2, 
  UserCheck, 
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// Mock data
const stats = {
  coordinadores: 8,
  carreras: 12,
  edificios: 4,
  maestros: 76,
  grupos: 48,
  gruposCompletos: 35,
  gruposIncompletos: 13,
  asistenciaTotal: 92,
};

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Dashboard del Administrador</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Users className="h-5 w-5 text-brand-blue" />
              Coordinadores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.coordinadores}</div>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-brand-blue" />
              Carreras
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.carreras}</div>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Building2 className="h-5 w-5 text-brand-blue" />
              Edificios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.edificios}</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-brand-teal" />
              Maestros y Grupos
            </CardTitle>
            <CardDescription>
              Total de maestros y grupos registrados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Maestros</p>
                <p className="text-3xl font-bold">{stats.maestros}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Grupos</p>
                <p className="text-3xl font-bold">{stats.grupos}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-brand-amber" />
              Estado de Asistencia
            </CardTitle>
            <CardDescription>
              Resumen de asistencia de grupos
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
                  {stats.gruposCompletos}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <span>Grupos Incompletos</span>
                </div>
                <Badge variant="outline" className="bg-amber-50">
                  {stats.gruposIncompletos}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Asistencia Total</span>
                  <span className="text-sm font-medium">{stats.asistenciaTotal}%</span>
                </div>
                <Progress value={stats.asistenciaTotal} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Grupos con Asistencia Incompleta</CardTitle>
            <CardDescription>
              Grupos que requieren atención por asistencia incompleta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-5 border-b bg-muted/50 p-3 font-medium">
                <div>Grupo</div>
                <div>Carrera</div>
                <div>Maestro</div>
                <div>Alumnos Presentes</div>
                <div>Estado</div>
              </div>
              
              <div className="grid grid-cols-5 border-b p-3">
                <div className="font-medium">A101</div>
                <div>Ingeniería en Sistemas</div>
                <div>Mtro. Luis Hernández</div>
                <div>18/20</div>
                <div>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                    Incompleto
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-5 border-b p-3">
                <div className="font-medium">C205</div>
                <div>Contabilidad</div>
                <div>Mtra. María González</div>
                <div>22/25</div>
                <div>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                    Incompleto
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-5 border-b p-3">
                <div className="font-medium">B403</div>
                <div>Licenciatura en Derecho</div>
                <div>Dr. Roberto Juárez</div>
                <div>28/30</div>
                <div>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                    Incompleto
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
