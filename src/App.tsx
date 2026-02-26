import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import DashboardPage from './components/DashboardPage';

export default function App() {
  const [view, setView] = useState<'login' | 'register' | 'dashboard'>('login');

  return (
    <div className="min-h-screen">
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
        <DashboardPage onLogout={() => setView('login')} />
      )}
    </div>
  );
}

