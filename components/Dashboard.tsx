import React, { useState } from 'react';
import { getSafetyBriefing } from '../services/geminiService';
import type { SafetyBriefing } from '../types';
import { SafetyStatus } from '../types';
import { MapPinIcon } from './icons/MapPinIcon';
import { ExclamationTriangleIcon } from './icons/ExclamationTriangleIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { ViewfinderCircleIcon } from './icons/ViewfinderCircleIcon';

const Dashboard: React.FC = () => {
  const [location, setLocation] = useState('');
  const [briefing, setBriefing] = useState<SafetyBriefing | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGeofenceActive, setIsGeofenceActive] = useState(false);

  const handleSearch = async () => {
    if (!location.trim()) {
      setError('Please enter a location.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setBriefing(null);
    try {
      const result = await getSafetyBriefing(location);
      setBriefing(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusStyles = (status: SafetyStatus) => {
    switch (status) {
      case SafetyStatus.Safe:
        return {
          icon: <ShieldCheckIcon className="w-6 h-6 text-green-400" />,
          bgColor: 'bg-green-500/10',
          textColor: 'text-green-400',
          borderColor: 'border-green-500/20',
          progressColor: 'bg-green-500',
        };
      case SafetyStatus.Caution:
        return {
          icon: <ExclamationTriangleIcon className="w-6 h-6 text-yellow-400" />,
          bgColor: 'bg-yellow-500/10',
          textColor: 'text-yellow-400',
          borderColor: 'border-yellow-500/20',
          progressColor: 'bg-yellow-500',
        };
      case SafetyStatus.Alert:
        return {
          icon: <ExclamationTriangleIcon className="w-6 h-6 text-red-400" />,
          bgColor: 'bg-red-500/10',
          textColor: 'text-red-400',
          borderColor: 'border-red-500/20',
          progressColor: 'bg-red-500',
        };
    }
  };

  const handleToggleGeofence = () => {
    setIsGeofenceActive(!isGeofenceActive);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-center">Travel Safety Intelligence</h2>
      <p className="mt-4 text-lg text-slate-400 text-center">Enter a location to get a real-time safety briefing.</p>
      
      <div className="mt-8 max-w-xl mx-auto">
        <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-full p-2 shadow-lg">
          <MapPinIcon className="w-6 h-6 text-slate-400 ml-2" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSearch()}
            placeholder="e.g., Downtown Paris, France"
            className="w-full bg-transparent text-white placeholder-slate-400 focus:outline-none px-2"
            disabled={isLoading}
          />
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="bg-cyan-600 text-white font-bold rounded-full px-6 py-2.5 hover:bg-cyan-500 disabled:bg-slate-600 transition-all duration-200 flex-shrink-0"
          >
            {isLoading ? 'Analyzing...' : 'Search'}
          </button>
        </div>
      </div>

      <div className="mt-8 space-y-8">
        {error && (
            <div className="max-w-xl mx-auto bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg text-center">
                <p>{error}</p>
            </div>
        )}
        {briefing && (
          <div className={`max-w-xl mx-auto bg-slate-800/50 border ${getStatusStyles(briefing.status).borderColor} rounded-2xl p-6`}>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white">{location}</h3>
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyles(briefing.status).bgColor} ${getStatusStyles(briefing.status).textColor}`}>
                {getStatusStyles(briefing.status).icon}
                <span>{briefing.status}</span>
              </div>
            </div>

            <p className="mt-2 text-slate-300">{briefing.summary}</p>

            <div className="mt-6">
                <div className="flex justify-between items-center text-sm text-slate-400 mb-1">
                    <span>Safety Score</span>
                    <span className={`font-bold text-lg ${getStatusStyles(briefing.status).textColor}`}>{briefing.safetyScore}/100</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2.5">
                    <div className={`${getStatusStyles(briefing.status).progressColor} h-2.5 rounded-full`} style={{ width: `${briefing.safetyScore}%` }}></div>
                </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-semibold text-white">Recommendations:</h4>
              <ul className="mt-2 list-disc list-inside space-y-1 text-slate-300">
                {briefing.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Geofencing Map Section */}
        <div className="max-w-xl mx-auto bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
          <h3 className="text-2xl font-bold text-white text-center">Geofence Control</h3>
          <p className="mt-2 text-slate-400 text-center">Activate a virtual perimeter for enhanced safety alerts.</p>

          <div className="mt-6 relative h-48 bg-slate-700 rounded-lg overflow-hidden border border-slate-600">
            {/* Mock map grid */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-px">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="border-r border-b border-white/5"></div>
              ))}
            </div>
             {/* Mock map "buildings" */}
            <div className="absolute top-8 left-10 w-16 h-8 bg-slate-600/50 rounded"></div>
            <div className="absolute bottom-4 right-12 w-20 h-10 bg-slate-600/50 rounded"></div>
            <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-slate-600/50 rounded -translate-x-1/2 -translate-y-1/2"></div>
            
            {/* Geofence Circle */}
            {isGeofenceActive && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-cyan-500/20 border-2 border-cyan-400 animate-pulse"></div>
              </div>
            )}
          </div>
          
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleToggleGeofence}
              className={`flex items-center justify-center gap-2 w-full max-w-xs font-bold py-3 px-6 rounded-full transition-all duration-300 ${
                isGeofenceActive
                  ? 'bg-green-600 text-white hover:bg-green-500'
                  : 'bg-cyan-600 text-white hover:bg-cyan-500'
              }`}
            >
              <ViewfinderCircleIcon className="w-6 h-6" />
              <span>{isGeofenceActive ? 'Geofence Active' : 'Activate Geofence'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;