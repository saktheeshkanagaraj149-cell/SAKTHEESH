import React, { useState } from 'react';
import type { Page } from './types';
import Login from './components/Login';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';
import DigitalIdCard from './components/DigitalIdCard';
import SafetyLog from './components/SafetyLog';
import BottomNavBar from './components/BottomNavBar';
import SOSButton from './components/SOSButton';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'chat':
        return <Chatbot />;
      case 'id':
        return <DigitalIdCard />;
      case 'log':
        return <SafetyLog />;
      default:
        return <Dashboard />;
    }
  };

  if (!isLoggedIn) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="bg-slate-900 text-slate-200 font-sans min-h-screen">
      <Header />
      <main className="container mx-auto px-4 md:px-6 py-8 pb-24">
        {renderPage()}
      </main>
      <SOSButton />
      <BottomNavBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default App;
