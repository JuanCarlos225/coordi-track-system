
import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  FileText, 
  Download, 
  Upload,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label';

// Mock data
const schedules = [
  { id: 1, carrera: 'Ingeniería en Sistemas Computacionales', periodo: 'Agosto-Diciembre 2023', archivo: 'horarios_sistemas_ago_dic_2023.pdf' },
  { id: 2, carrera: 'Licenciatura en Derecho', periodo: 'Agosto-Diciembre 2023', archivo: 'horarios_derecho_ago_dic_2023.pdf' },
  { id: 3, carrera: 'Contaduría Pública', periodo: 'Agosto-Diciembre 2023', archivo: 'horarios_contaduria_ago_dic_2023.pdf' },
  { id: 4, carrera: 'Arquitectura', periodo: 'Agosto-Diciembre 2023', archivo: 'horarios_arquitectura_ago_dic_2023.pdf' },
  { id: 5, carrera: 'Medicina', periodo: 'Agosto-Diciembre 2023', archivo: 'horarios_medicina_ago_dic_2023.pdf' },
  { id: 6, carrera: 'Ingeniería en Sistemas Computacionales', periodo: 'Enero-Junio 2023', archivo: 'horarios_sistemas_ene_jun_2023.pdf' },
  { id: 7, carrera: 'Licenciatura en Derecho', periodo: 'Enero-Junio 2023', archivo: 'horarios_derecho_ene_jun_2023.pdf' },
];

const Schedules = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCareer, setSelectedCareer] = useState<string>("");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");
  
  const filteredSchedules = schedules.filter(s => {
    const matchesSearch = 
      s.carrera.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.periodo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.archivo.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCareer = selectedCareer === "" || s.carrera === selectedCareer;
    const matchesPeriod = selectedPeriod === "" || s.periodo === selectedPeriod;
    
    return matchesSearch && matchesCareer && matchesPeriod;
  });
  
  const handleDownload = (fileName: string) => {
    toast.success(`Descargando ${fileName}`);
  };
  
  const handleUpload = () => {
    toast.success('Horario subido correctamente');
  };
  
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Horarios de Clases</h1>
        
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Subir Nuevo Horario
        </Button>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>
            Filtra los horarios por carrera y periodo
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
              <Label htmlFor="career-select" className="mb-2 block">Carrera</Label>
              <Select value={selectedCareer} onValueChange={setSelectedCareer}>
                <SelectTrigger id="career-select">
                  <SelectValue placeholder="Todas las carreras" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas las carreras</SelectItem>
                  <SelectItem value="Ingeniería en Sistemas Computacionales">Ingeniería en Sistemas</SelectItem>
                  <SelectItem value="Licenciatura en Derecho">Licenciatura en Derecho</SelectItem>
                  <SelectItem value="Contaduría Pública">Contaduría Pública</SelectItem>
                  <SelectItem value="Arquitectura">Arquitectura</SelectItem>
                  <SelectItem value="Medicina">Medicina</SelectItem>
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
                  <SelectItem value="Agosto-Diciembre 2023">Agosto-Diciembre 2023</SelectItem>
                  <SelectItem value="Enero-Junio 2023">Enero-Junio 2023</SelectItem>
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
            Listado de horarios por carrera y periodo académico
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-4 border-b bg-muted/50 p-3 font-medium">
              <div>Carrera</div>
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
                  <div className="font-medium">{schedule.carrera}</div>
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
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default Schedules;
