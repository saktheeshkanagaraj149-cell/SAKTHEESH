import React, { useState } from 'react';
import type { Incident } from '../types';
import ReportIncidentModal from './ReportIncidentModal';
import { MegaphoneIcon } from './icons/MegaphoneIcon';
import { TagIcon } from './icons/TagIcon';

const mockIncidents: Incident[] = [
  {
    id: '1',
    type: 'Lost Item',
    description: 'Lost my wallet near the main square. Contained ID and credit cards.',
    location: 'Plaza Mayor, Madrid',
    timestamp: '2024-07-20T14:30:00Z',
    status: 'Reported',
  },
  {
    id: '2',
    type: 'Scam',
    description: 'Approached by someone with a "gold ring" scam. Did not fall for it but reported to local police.',
    location: 'Eiffel Tower, Paris',
    timestamp: '2024-07-18T11:00:00Z',
    status: 'Resolved',
  },
];

const SafetyLog: React.FC = () => {
    const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddIncident = (incident: Omit<Incident, 'id' | 'timestamp' | 'status'>) => {
        const newIncident: Incident = {
            ...incident,
            id: (incidents.length + 1).toString(),
            timestamp: new Date().toISOString(),
            status: 'Reported',
        };
        setIncidents(prev => [newIncident, ...prev]);
    };

    const getStatusChipClass = (status: 'Reported' | 'Resolved') => {
        return status === 'Reported' 
            ? 'bg-yellow-500/20 text-yellow-400' 
            : 'bg-green-500/20 text-green-400';
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Safety Log</h2>
                    <p className="mt-2 text-lg text-slate-400">Your personal record of safety-related incidents.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-cyan-500 transition-colors flex items-center gap-2"
                >
                    <MegaphoneIcon className="w-5 h-5"/>
                    <span>Report Incident</span>
                </button>
            </div>
            
            <div className="space-y-4">
                {incidents.map(incident => (
                    <div key={incident.id} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="flex items-center gap-3">
                                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${getStatusChipClass(incident.status)}`}>
                                        {incident.status}
                                    </span>
                                    <span className="text-sm font-semibold text-white flex items-center gap-1">
                                        <TagIcon className="w-4 h-4 text-slate-400" />
                                        {incident.type}
                                    </span>
                                </div>
                                <p className="mt-2 text-slate-300">{incident.description}</p>
                            </div>
                            <div className="text-right flex-shrink-0 ml-4">
                               <p className="text-sm font-medium text-white">{incident.location}</p>
                               <p className="text-xs text-slate-400">{new Date(incident.timestamp).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <ReportIncidentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onReport={handleAddIncident}
            />
        </div>
    );
};

export default SafetyLog;
