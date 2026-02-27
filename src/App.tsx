import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import DashboardPage from './components/DashboardPage';

export default function App() {
  const [view, setView] = useState<'landing' | 'login' | 'register' | 'dashboard'>('landing');

  return (
    <div className="min-h-screen">
      {view === 'landing' && (
        <LandingPage 
          onStart={() => setView('register')} 
          onLogin={() => setView('login')} 
        />
      )}
      {view === 'login' && (
        <LoginPage 
          onSwitchToRegister={() => setView('register')} 
          onLogin={() => setView('dashboard')}
        />
      )}
      {view === 'register' && (
        <RegisterPage 
          onSwitchToLogin={() => setView('login')} 
          onRegister={() => setView('dashboard')}
        />
      )}
      {view === 'dashboard' && (
        <DashboardPage onLogout={() => setView('landing')} />
      )}
    </div>
  );
}

