
import React, { useState, useEffect } from 'react';
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
import { StatisticsController } from '@/controllers/StatisticsController';
import { 
  AttendanceData, 
  MonthlyAttendanceData, 
  CareerAttendanceData, 
  AttendanceDetailData 
} from '@/models/StatisticsModel';

const COLORS = ['#1a56db', '#0d9488', '#f59e0b', '#dc2626', '#8b5cf6'];

const Statistics = () => {
  const [selectedCareer, setSelectedCareer] = useState<string>("todas");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("weekly");
  const [weeklyData, setWeeklyData] = useState<AttendanceData[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyAttendanceData[]>([]);
  const [careerData, setCareerData] = useState<CareerAttendanceData[]>([]);
  const [detailData, setDetailData] = useState<AttendanceDetailData[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [weekly, monthly, career, details] = await Promise.all([
          StatisticsController.getWeeklyAttendance(selectedCareer !== "todas" ? selectedCareer : undefined),
          StatisticsController.getMonthlyAttendance(selectedCareer !== "todas" ? selectedCareer : undefined),
          StatisticsController.getCareerAttendance(),
          StatisticsController.getAttendanceDetails(true)
        ]);
        
        setWeeklyData(weekly);
        setMonthlyData(monthly);
        setCareerData(career);
        setDetailData(details);
      } catch (error) {
        console.error("Error fetching statistics data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [selectedCareer]);
  
  // Calcular estadísticas para las tarjetas
  const bestAttendance = StatisticsController.getBestAttendance(careerData);
  const lowestDay = StatisticsController.getLowestAttendanceDay(weeklyData);
  const averageAttendance = StatisticsController.getAverageAttendance(careerData);
  
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Estadísticas de Asistencia</h1>
      </div>
      
      {loading ? (
        <div className="text-center py-8">Cargando estadísticas...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="card-hover">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">{bestAttendance.value}%</CardTitle>
                <CardDescription>Asistencia Promedio ({bestAttendance.name})</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-2 bg-gray-200 rounded-full mt-2">
                  <div className="h-2 bg-brand-blue rounded-full" style={{ width: `${bestAttendance.value}%` }}></div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">{lowestDay.value}%</CardTitle>
                <CardDescription>Día con Menor Asistencia ({lowestDay.day})</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-2 bg-gray-200 rounded-full mt-2">
                  <div className="h-2 bg-brand-amber rounded-full" style={{ width: `${lowestDay.value}%` }}></div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">{averageAttendance}%</CardTitle>
                <CardDescription>Asistencia Promedio General</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-2 bg-gray-200 rounded-full mt-2">
                  <div className="h-2 bg-brand-teal rounded-full" style={{ width: `${averageAttendance}%` }}></div>
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
                
                {detailData.map((item, index) => (
                  <div key={index} className="grid grid-cols-5 border-b p-3">
                    <div>{item.carrera}</div>
                    <div>{item.grupo}</div>
                    <div>{item.totalAlumnos}</div>
                    <div>{item.asistenciaPromedio}%</div>
                    <div className={
                      item.tendenciaValor > 0 
                        ? "text-green-600" 
                        : item.tendenciaValor < 0 
                          ? "text-red-600" 
                          : "text-gray-600"
                    }>
                      {item.tendencia} {Math.abs(item.tendenciaValor)}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </AdminLayout>
  );
};

export default Statistics;
