
import React from 'react';
import { UserCircleIcon } from './icons/UserCircleIcon';
import { QrCodeIcon } from './icons/QrCodeIcon';

const DigitalIdCard: React.FC = () => {
  // Mock user data
  const user = {
    name: 'Alex Ryder',
    nationality: 'USA',
    dob: '1995-08-12',
    id: 'SJ-8A4B-9C2D-F5E1',
    blockchainId: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  };

  return (
    <div className="flex flex-col items-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-center mb-8">Secure Digital Identity</h2>
        <div className="w-full max-w-md bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 shadow-2xl p-6 text-white transform hover:scale-105 transition-transform duration-300">
            <div className="flex justify-between items-start pb-4 border-b border-slate-700">
                <div>
                    <p className="text-xs text-cyan-400 font-semibold tracking-wider">SAFEJOURNEY ID</p>
                    <p className="text-2xl font-bold">{user.name}</p>
                </div>
                <UserCircleIcon className="w-16 h-16 text-slate-500" />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
                <div>
                    <p className="text-xs text-slate-400">Nationality</p>
                    <p className="font-medium">{user.nationality}</p>
                </div>
                <div>
                    <p className="text-xs text-slate-400">Date of Birth</p>
                    <p className="font-medium">{user.dob}</p>
                </div>
                <div className="col-span-2">
                    <p className="text-xs text-slate-400">Unique Identifier</p>
                    <p className="font-mono text-sm">{user.id}</p>
                </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-700 flex items-center gap-4">
                <div className="bg-white p-2 rounded-lg">
                    <QrCodeIcon className="w-16 h-16 text-slate-900" />
                </div>
                <div className="flex-1">
                    <p className="text-xs text-slate-400">Decentralized Verifiable Credential</p>
                    <p className="font-mono text-xs break-all text-green-400">{user.blockchainId}</p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default DigitalIdCard;
