
import React from 'react';
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

// Mock data
const stats = {
  grupos: 5,
  alumnos: 148,
  gruposCompletos: 3,
  gruposIncompletos: 2,
  asistenciaTotal: 96,
  notificaciones: 3,
};

const Dashboard = () => {
  return (
    <CoordinatorLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Dashboard del Coordinador</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Users className="h-5 w-5 text-brand-teal" />
              Grupos Asignados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.grupos}</div>
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
            <div className="text-3xl font-bold">{stats.alumnos}</div>
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
            <div className="text-3xl font-bold">{stats.notificaciones}</div>
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
              <div className="flex items-start gap-3 p-3 rounded-md bg-amber-50 border border-amber-200">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <p className="font-medium">Grupo A101 - Faltan 2 alumnos</p>
                  <p className="text-sm text-gray-600">Hoy, 10:15 AM</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 rounded-md bg-amber-50 border border-amber-200">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <p className="font-medium">Grupo C205 - Faltan 1 alumno</p>
                  <p className="text-sm text-gray-600">Hoy, 9:30 AM</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 rounded-md bg-green-50 border border-green-200">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium">Grupo B403 - Asistencia completa</p>
                  <p className="text-sm text-gray-600">Hoy, 8:45 AM</p>
                </div>
              </div>
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
              
              <div className="grid grid-cols-5 border-b p-3">
                <div className="font-medium">A101</div>
                <div>Mtro. Luis Hernández</div>
                <div>20</div>
                <div>18</div>
                <div>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                    Incompleto
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-5 border-b p-3">
                <div className="font-medium">C205</div>
                <div>Mtra. María González</div>
                <div>25</div>
                <div>24</div>
                <div>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                    Incompleto
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-5 border-b p-3">
                <div className="font-medium">B403</div>
                <div>Dr. Roberto Juárez</div>
                <div>30</div>
                <div>30</div>
                <div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Completo
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-5 border-b p-3">
                <div className="font-medium">D105</div>
                <div>Dra. Laura Vázquez</div>
                <div>28</div>
                <div>28</div>
                <div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Completo
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-5 p-3">
                <div className="font-medium">E201</div>
                <div>Mtro. Carlos Mendoza</div>
                <div>22</div>
                <div>22</div>
                <div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Completo
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CoordinatorLayout>
  );
};

export default Dashboard;
