import React from 'react';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/70 backdrop-blur-lg sticky top-0 z-50 border-b border-slate-800">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <ShieldCheckIcon className="w-8 h-8 text-cyan-400" />
          <h1 className="text-xl font-bold tracking-tight text-white">SafeJourney</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;