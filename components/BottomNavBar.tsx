import React from 'react';
// FIX: Added .ts extension to type import to resolve module not found error.
import type { Page } from '../types';
import { HomeIcon } from './icons/HomeIcon';
import { UserCircleIcon } from './icons/UserCircleIcon';
import { ListBulletIcon } from './icons/ListBulletIcon';
import { ChatBubbleLeftRightIcon } from './icons/ChatBubbleLeftRightIcon';

interface BottomNavBarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <HomeIcon className="w-6 h-6" /> },
    { id: 'chat', label: 'AI Chat', icon: <ChatBubbleLeftRightIcon className="w-6 h-6" /> },
    { id: 'id', label: 'Digital ID', icon: <UserCircleIcon className="w-6 h-6" /> },
    { id: 'log', label: 'Safety Log', icon: <ListBulletIcon className="w-6 h-6" /> },
  ] as const;

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm mx-auto bg-slate-800/70 backdrop-blur-lg border border-slate-700 rounded-full shadow-2xl z-50">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            title={item.label}
            aria-label={item.label}
            className={`flex flex-col items-center justify-center gap-1 w-20 h-16 transition-colors duration-300 rounded-full ${
              currentPage === item.id
                ? 'text-cyan-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {item.icon}
            <span
              className={`text-xs font-medium transition-opacity duration-300 ${
                currentPage === item.id ? 'opacity-100' : 'opacity-0 scale-90'
              }`}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavBar;