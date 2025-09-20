import React, { useState } from 'react';
import { XMarkIcon } from './icons/XMarkIcon';
import type { Incident } from '../types';

interface ReportIncidentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReport: (incident: Omit<Incident, 'id' | 'timestamp' | 'status'>) => void;
}

const incidentTypes: Incident['type'][] = ['Theft', 'Scam', 'Harassment', 'Medical', 'Lost Item', 'Other'];

const ReportIncidentModal: React.FC<ReportIncidentModalProps> = ({ isOpen, onClose, onReport }) => {
  const [type, setType] = useState<Incident['type']>('Other');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !location.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    onReport({ type, description, location });
    // Reset form and close
    setType('Other');
    setDescription('');
    setLocation('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
    >
      <div 
        className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-6 w-full max-w-lg text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Report an Incident</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-slate-300">Incident Type</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as Incident['type'])}
              className="mt-1 w-full bg-slate-700 border border-slate-600 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
            >
              {incidentTypes.map(it => <option key={it} value={it}>{it}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-slate-300">Location</label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Near the train station"
              className="mt-1 w-full bg-slate-700 border border-slate-600 rounded-lg py-2 px-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-300">Description</label>
            <textarea
              id="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a brief description of what happened..."
              className="mt-1 w-full bg-slate-700 border border-slate-600 rounded-lg py-2 px-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-slate-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-slate-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-cyan-500 transition-colors"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportIncidentModal;
