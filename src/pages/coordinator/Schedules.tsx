
import React, { useState, useEffect } from 'react';
import CoordinatorLayout from '@/components/CoordinatorLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  FileText, 
  Download,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { ScheduleController } from '@/controllers/ScheduleController';
import { ScheduleData } from '@/models/ScheduleModel';

const CoordinatorSchedules = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");
  const [schedules, setSchedules] = useState<ScheduleData[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const data = await ScheduleController.getSchedules();
        setSchedules(data);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSchedules();
  }, []);
  
  const filteredSchedules = ScheduleController.filterSchedules(
    schedules,
    searchQuery,
    selectedGroup,
    selectedPeriod
  );
  
  const handleDownload = (fileName: string) => {
    ScheduleController.downloadSchedule(fileName);
  };
  
  // Extraer grupos y periodos únicos para los filtros
  const uniqueGroups = [...new Set(schedules.map(s => s.grupo))];
  const uniquePeriods = [...new Set(schedules.map(s => s.periodo))];
  
  return (
    <CoordinatorLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Horarios de Clases</h1>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>
            Filtra los horarios por grupo y periodo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar horario..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="group-select" className="mb-2 block">Grupo</Label>
              <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                <SelectTrigger id="group-select">
                  <SelectValue placeholder="Todos los grupos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos los grupos</SelectItem>
                  {uniqueGroups.map(group => (
                    <SelectItem key={group} value={group}>{group}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="period-select" className="mb-2 block">Periodo</Label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger id="period-select">
                  <SelectValue placeholder="Todos los periodos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos los periodos</SelectItem>
                  {uniquePeriods.map(period => (
                    <SelectItem key={period} value={period}>{period}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Horarios Disponibles</CardTitle>
          <CardDescription>
            Listado de horarios por grupo y periodo académico
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Cargando horarios...</div>
          ) : (
            <div className="rounded-md border">
              <div className="grid grid-cols-4 border-b bg-muted/50 p-3 font-medium">
                <div>Grupo</div>
                <div>Periodo</div>
                <div>Archivo</div>
                <div className="text-right">Acciones</div>
              </div>
              
              {filteredSchedules.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  No se encontraron horarios.
                </div>
              ) : (
                filteredSchedules.map((schedule) => (
                  <div key={schedule.id} className="grid grid-cols-4 border-b p-3">
                    <div className="font-medium">{schedule.grupo}</div>
                    <div>{schedule.periodo}</div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-brand-blue" />
                      {schedule.archivo}
                    </div>
                    <div className="flex justify-end">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownload(schedule.archivo)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Descargar
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </CoordinatorLayout>
  );
};

export default CoordinatorSchedules;
