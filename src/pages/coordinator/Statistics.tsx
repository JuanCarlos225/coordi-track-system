
import React, { useState } from 'react';
import CoordinatorLayout from '@/components/CoordinatorLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer
} from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label';

// Mock data
const weeklyData = [
  { day: 'Lunes', asistencia: 92, ausencia: 8 },
  { day: 'Martes', asistencia: 88, ausencia: 12 },
  { day: 'Miércoles', asistencia: 95, ausencia: 5 },
  { day: 'Jueves', asistencia: 85, ausencia: 15 },
  { day: 'Viernes', asistencia: 78, ausencia: 22 },
];

const monthlyData = [
  { semana: 'Semana 1', asistencia: 90, ausencia: 10 },
  { semana: 'Semana 2', asistencia: 87, ausencia: 13 },
  { semana: 'Semana 3', asistencia: 92, ausencia: 8 },
  { semana: 'Semana 4', asistencia: 88, ausencia: 12 },
];

const CoordinatorStatistics = () => {
  const [selectedGroup, setSelectedGroup] = useState<string>("todos");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("weekly");
  
  return (
    <CoordinatorLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Estadísticas de Asistencia</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">92%</CardTitle>
            <CardDescription>Asistencia Promedio (Sistemas)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-2 bg-gray-200 rounded-full mt-2">
              <div className="h-2 bg-brand-blue rounded-full" style={{ width: '92%' }}></div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">78%</CardTitle>
            <CardDescription>Día con Menor Asistencia (Viernes)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-2 bg-gray-200 rounded-full mt-2">
              <div className="h-2 bg-brand-amber rounded-full" style={{ width: '78%' }}></div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">3</CardTitle>
            <CardDescription>Alertas de Asistencia esta Semana</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-2 bg-gray-200 rounded-full mt-2">
              <div className="h-2 bg-red-500 rounded-full" style={{ width: '30%' }}></div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Tendencia de Asistencia</CardTitle>
          <CardDescription>
            Visualización de asistencia a lo largo del tiempo
          </CardDescription>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="group-select">Grupo</Label>
              <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                <SelectTrigger id="group-select" className="w-[240px]">
                  <SelectValue placeholder="Seleccionar grupo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los grupos</SelectItem>
                  <SelectItem value="sistemas-a">Sistemas - Grupo A - 1er Semestre</SelectItem>
                  <SelectItem value="sistemas-b">Sistemas - Grupo B - 1er Semestre</SelectItem>
                  <SelectItem value="sistemas-c">Sistemas - Grupo A - 3er Semestre</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex flex-col gap-2">
              <Label htmlFor="period-select">Periodo</Label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger id="period-select" className="w-[180px]">
                  <SelectValue placeholder="Seleccionar periodo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Semanal</SelectItem>
                  <SelectItem value="monthly">Mensual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            {selectedPeriod === "weekly" ? (
              <BarChart
                data={weeklyData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="asistencia" fill="#1a56db" name="Asistencia %" />
                <Bar dataKey="ausencia" fill="#dc2626" name="Ausencia %" />
              </BarChart>
            ) : (
              <LineChart
                data={monthlyData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="semana" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="asistencia" stroke="#1a56db" name="Asistencia %" />
                <Line type="monotone" dataKey="ausencia" stroke="#dc2626" name="Ausencia %" />
              </LineChart>
            )}
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Detalle por Grupo</CardTitle>
          <CardDescription>
            Estadísticas de asistencia desglosadas por grupo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-5 border-b bg-muted/50 p-3 font-medium">
              <div>Grupo</div>
              <div>Total Alumnos</div>
              <div>Asistencia Promedio</div>
              <div>Tendencia</div>
              <div>Alertas</div>
            </div>
            
            <div className="grid grid-cols-5 border-b p-3">
              <div>Grupo A - 1er Semestre</div>
              <div>32</div>
              <div>92%</div>
              <div className="text-green-600">↗ 3%</div>
              <div>1</div>
            </div>
            
            <div className="grid grid-cols-5 border-b p-3">
              <div>Grupo B - 1er Semestre</div>
              <div>30</div>
              <div>87%</div>
              <div className="text-red-600">↘ 2%</div>
              <div>2</div>
            </div>
            
            <div className="grid grid-cols-5 p-3">
              <div>Grupo A - 3er Semestre</div>
              <div>28</div>
              <div>94%</div>
              <div className="text-green-600">↗ 1%</div>
              <div>0</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </CoordinatorLayout>
  );
};

export default CoordinatorStatistics;
