import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import LandingPricingPage from './components/LandingPricingPage';
import LandingHowItWorksPage from './components/LandingHowItWorksPage';
import LandingAboutUsPage from './components/LandingAboutUsPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import DashboardPage from './components/DashboardPage';

export default function App() {
  const [view, setView] = useState<'landing' | 'pricing' | 'how-it-works' | 'about-us' | 'login' | 'register' | 'dashboard'>('landing');

  return (
    <div className="min-h-screen">
      {view === 'landing' && (
        <LandingPage 
          onStart={() => setView('register')} 
          onLogin={() => setView('login')} 
          onPricing={() => setView('pricing')}
          onHowItWorks={() => setView('how-it-works')}
          onAboutUs={() => setView('about-us')}
        />
      )}
      {view === 'pricing' && (
        <LandingPricingPage 
          onBack={() => setView('landing')}
          onStart={() => setView('register')}
          onLogin={() => setView('login')}
          onHowItWorks={() => setView('how-it-works')}
          onAboutUs={() => setView('about-us')}
        />
      )}
      {view === 'how-it-works' && (
        <LandingHowItWorksPage 
          onBack={() => setView('landing')}
          onStart={() => setView('register')}
          onLogin={() => setView('login')}
          onPricing={() => setView('pricing')}
          onAboutUs={() => setView('about-us')}
        />
      )}
      {view === 'about-us' && (
        <LandingAboutUsPage 
          onBack={() => setView('landing')}
          onStart={() => setView('register')}
          onLogin={() => setView('login')}
          onPricing={() => setView('pricing')}
          onHowItWorks={() => setView('how-it-works')}
        />
      )}
      {view === 'login' && (
        <LoginPage 
          onSwitchToRegister={() => setView('register')} 
          onLogin={() => setView('dashboard')}
          onHome={() => setView('landing')}
          onHowItWorks={() => setView('how-it-works')}
          onAboutUs={() => setView('about-us')}
          onPricing={() => setView('pricing')}
        />
      )}
      {view === 'register' && (
        <RegisterPage 
          onSwitchToLogin={() => setView('login')} 
          onRegister={() => setView('dashboard')}
          onHome={() => setView('landing')}
          onHowItWorks={() => setView('how-it-works')}
          onAboutUs={() => setView('about-us')}
          onPricing={() => setView('pricing')}
        />
      )}
      {view === 'dashboard' && (
        <DashboardPage onLogout={() => setView('landing')} />
      )}
    </div>
  );
}

