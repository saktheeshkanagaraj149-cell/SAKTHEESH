// Implemented type definitions to be used across the application.
export type Page = 'dashboard' | 'chat' | 'id' | 'log';

export enum SafetyStatus {
  Safe = 'Safe',
  Caution = 'Caution',
  Alert = 'Alert',
}

export interface SafetyBriefing {
  safetyScore: number;
  status: SafetyStatus;
  summary: string;
  recommendations: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface Incident {
  id: string;
  type: 'Theft' | 'Scam' | 'Harassment' | 'Medical' | 'Lost Item' | 'Other';
  description: string;
  location: string;
  timestamp: string;
  status: 'Reported' | 'Resolved';
}
