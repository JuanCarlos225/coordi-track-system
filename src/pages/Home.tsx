
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { School } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Home = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b py-4">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <School className="h-8 w-8 text-brand-blue" />
            <span className="font-bold text-2xl">CoordiTrack</span>
          </div>
          <Button onClick={() => navigate('/login')}>Iniciar Sesión</Button>
        </div>
      </header>
      
      <main className="flex-1 bg-gradient-to-b from-blue-50 to-white">
        <section className="container py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-brand-blue mb-6">
              Sistema de Coordinación y Seguimiento de Asistencia
            </h1>
            <p className="text-xl text-gray-600 mb-10">
              Una solución integral para gestionar coordinadores, carreras, 
              grupos académicos y monitorear la asistencia de alumnos mediante 
              tecnología IoT.
            </p>
            <Button 
              size="lg" 
              className="bg-brand-blue hover:bg-brand-blue/90 text-white px-8 py-6 text-lg"
              onClick={() => navigate('/login')}
            >
              Iniciar Sesión
            </Button>
          </div>
        </section>
        
        <section className="container py-20 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md card-hover">
            <h2 className="text-2xl font-bold text-brand-blue mb-4">Gestión Académica</h2>
            <p className="text-gray-600">
              Administra carreras, grupos, profesores y alumnos desde un solo lugar, 
              con acceso a toda la información necesaria para la toma de decisiones.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md card-hover">
            <h2 className="text-2xl font-bold text-brand-teal mb-4">Monitoreo IoT</h2>
            <p className="text-gray-600">
              Integración con dispositivos ESP32-CAM para contar automáticamente 
              alumnos presentes en las aulas, generando alertas en tiempo real.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md card-hover">
            <h2 className="text-2xl font-bold text-brand-amber mb-4">Estadísticas</h2>
            <p className="text-gray-600">
              Visualiza reportes de asistencia semanal y mensual, con datos precisos 
              sobre la presencia de alumnos en cada grupo y carrera.
            </p>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-100 py-8">
        <div className="container text-center text-gray-600">
          <p>© {new Date().getFullYear()} CoordiTrack - Sistema de Coordinación y Seguimiento de Asistencia</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
