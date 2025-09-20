import React from 'react';
import { ExclamationTriangleIcon } from './icons/ExclamationTriangleIcon';

const SOSButton: React.FC = () => {
    
  const handleSOS = () => {
      alert("Emergency SOS Activated!\n\nIn a real application, this would contact local authorities with your location and identity information.");
  };

  return (
    <button 
      onClick={handleSOS}
      aria-label="Activate Emergency SOS"
      className="fixed bottom-24 right-4 z-50 group w-16 h-16 flex items-center justify-center bg-red-600 text-white font-bold rounded-full hover:bg-red-500 transition-transform duration-300 hover:scale-110 shadow-2xl shadow-red-900/60 border-4 border-red-700/50 animate-pulse"
    >
      <ExclamationTriangleIcon className="w-8 h-8 transition-transform group-hover:rotate-12" />
    </button>
  );
};

export default SOSButton;
