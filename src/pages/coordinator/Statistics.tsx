
import React, { useState, useEffect } from 'react';
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
import { StatisticsController } from '@/controllers/StatisticsController';
import { 
  AttendanceData, 
  MonthlyAttendanceData, 
  AttendanceDetailData 
} from '@/models/StatisticsModel';

const CoordinatorStatistics = () => {
  const [selectedGroup, setSelectedGroup] = useState<string>("todos");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("weekly");
  const [weeklyData, setWeeklyData] = useState<AttendanceData[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyAttendanceData[]>([]);
  const [detailData, setDetailData] = useState<AttendanceDetailData[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [weekly, monthly, details] = await Promise.all([
          StatisticsController.getWeeklyAttendance(),
          StatisticsController.getMonthlyAttendance(),
          StatisticsController.getAttendanceDetails(false)
        ]);
        
        setWeeklyData(weekly);
        setMonthlyData(monthly);
        setDetailData(details);
      } catch (error) {
        console.error("Error fetching statistics data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Calculate stats for cards
  const averageAttendance = detailData.length > 0 
    ? Math.round(detailData.reduce((acc, curr) => acc + curr.asistenciaPromedio, 0) / detailData.length) 
    : 0;
  
  const lowestDay = StatisticsController.getLowestAttendanceDay(weeklyData);
  
  const alertCount = detailData.reduce((acc, curr) => acc + (curr.alertas || 0), 0);
  
  return (
    <CoordinatorLayout>
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
                <CardTitle className="text-2xl">{averageAttendance}%</CardTitle>
                <CardDescription>Asistencia Promedio (Sistemas)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-2 bg-gray-200 rounded-full mt-2">
                  <div className="h-2 bg-brand-blue rounded-full" style={{ width: `${averageAttendance}%` }}></div>
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
                <CardTitle className="text-2xl">{alertCount}</CardTitle>
                <CardDescription>Alertas de Asistencia esta Semana</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-2 bg-gray-200 rounded-full mt-2">
                  <div className="h-2 bg-red-500 rounded-full" style={{ width: `${alertCount * 10}%` }}></div>
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
                
                {detailData.map((item, index) => (
                  <div key={index} className="grid grid-cols-5 border-b p-3">
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
                    <div>{item.alertas}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </CoordinatorLayout>
  );
};

export default CoordinatorStatistics;
