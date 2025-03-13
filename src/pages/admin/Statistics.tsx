
import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
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
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
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

const careerData = [
  { name: 'Sistemas', value: 92 },
  { name: 'Derecho', value: 85 },
  { name: 'Contabilidad', value: 88 },
  { name: 'Arquitectura', value: 91 },
  { name: 'Medicina', value: 95 },
];

const COLORS = ['#1a56db', '#0d9488', '#f59e0b', '#dc2626', '#8b5cf6'];

const Statistics = () => {
  const [selectedCareer, setSelectedCareer] = useState<string>("todas");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("weekly");
  
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Estadísticas de Asistencia</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">95%</CardTitle>
            <CardDescription>Asistencia Promedio (Medicina)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-2 bg-gray-200 rounded-full mt-2">
              <div className="h-2 bg-brand-blue rounded-full" style={{ width: '95%' }}></div>
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
            <CardTitle className="text-2xl">88%</CardTitle>
            <CardDescription>Asistencia Promedio General</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-2 bg-gray-200 rounded-full mt-2">
              <div className="h-2 bg-brand-teal rounded-full" style={{ width: '88%' }}></div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Tendencia de Asistencia</CardTitle>
              <CardDescription>
                Visualización de asistencia a lo largo del tiempo
              </CardDescription>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="career-select">Carrera</Label>
                  <Select value={selectedCareer} onValueChange={setSelectedCareer}>
                    <SelectTrigger id="career-select" className="w-[200px]">
                      <SelectValue placeholder="Seleccionar carrera" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas las carreras</SelectItem>
                      <SelectItem value="sistemas">Ingeniería en Sistemas</SelectItem>
                      <SelectItem value="derecho">Licenciatura en Derecho</SelectItem>
                      <SelectItem value="contabilidad">Contaduría Pública</SelectItem>
                      <SelectItem value="arquitectura">Arquitectura</SelectItem>
                      <SelectItem value="medicina">Medicina</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label htmlFor="period-select">Periodo</Label>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger id="period-select" className="w-[200px]">
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
              <ResponsiveContainer width="100%" height={300}>
                {selectedPeriod === "weekly" ? (
                  <BarChart
                    data={weeklyData}
                    margin={{
                      top: 5,
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
                      top: 5,
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
        </div>
        
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Asistencia por Carrera</CardTitle>
              <CardDescription>
                Porcentaje de asistencia por carrera
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={careerData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {careerData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
      
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
              <div>Carrera</div>
              <div>Grupo</div>
              <div>Total Alumnos</div>
              <div>Asistencia Promedio</div>
              <div>Tendencia</div>
            </div>
            
            <div className="grid grid-cols-5 border-b p-3">
              <div>Ingeniería en Sistemas</div>
              <div>Grupo A - 1er Semestre</div>
              <div>32</div>
              <div>92%</div>
              <div className="text-green-600">↗ 3%</div>
            </div>
            
            <div className="grid grid-cols-5 border-b p-3">
              <div>Ingeniería en Sistemas</div>
              <div>Grupo B - 1er Semestre</div>
              <div>30</div>
              <div>87%</div>
              <div className="text-red-600">↘ 2%</div>
            </div>
            
            <div className="grid grid-cols-5 border-b p-3">
              <div>Licenciatura en Derecho</div>
              <div>Grupo A - 1er Semestre</div>
              <div>35</div>
              <div>85%</div>
              <div className="text-red-600">↘ 1%</div>
            </div>
            
            <div className="grid grid-cols-5 border-b p-3">
              <div>Medicina</div>
              <div>Grupo A - 3er Semestre</div>
              <div>28</div>
              <div>95%</div>
              <div className="text-green-600">↗ 2%</div>
            </div>
            
            <div className="grid grid-cols-5 p-3">
              <div>Arquitectura</div>
              <div>Grupo A - 5to Semestre</div>
              <div>25</div>
              <div>91%</div>
              <div className="text-gray-600">→ 0%</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default Statistics;
