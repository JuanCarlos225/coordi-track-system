
import React from 'react';
import { School } from 'lucide-react';

interface MainLogoProps {
  className?: string;
}

const MainLogo: React.FC<MainLogoProps> = ({ className }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <School className="h-6 w-6 text-brand-blue" />
      <span className="font-bold text-xl">CoordiTrack</span>
    </div>
  );
};

export default MainLogo;
