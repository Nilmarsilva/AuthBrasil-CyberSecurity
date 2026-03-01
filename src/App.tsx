import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import LandingPricingPage from './components/LandingPricingPage';
import LandingHowItWorksPage from './components/LandingHowItWorksPage';
import LandingAboutUsPage from './components/LandingAboutUsPage';
import LandingSampleReportPage from './components/LandingSampleReportPage';
import LandingApiDocsPage from './components/LandingApiDocsPage';
import LandingContactPage from './components/LandingContactPage';
import { LandingTermsPage, LandingPrivacyPage, LandingCookiesPage } from './components/LandingLegalPages';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import DashboardPage from './components/DashboardPage';

export default function App() {
  const [view, setView] = useState<'landing' | 'pricing' | 'how-it-works' | 'about-us' | 'sample-report' | 'api-docs' | 'contact' | 'terms' | 'privacy' | 'cookies' | 'login' | 'register' | 'dashboard'>('landing');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <div className="min-h-screen">
      {view === 'landing' && (
        <LandingPage 
          onStart={() => setView('register')} 
          onLogin={() => setView('login')} 
          onPricing={() => setView('pricing')}
          onHowItWorks={() => setView('how-it-works')}
          onAboutUs={() => setView('about-us')}
          onSampleReport={() => setView('sample-report')}
          onApiDocs={() => setView('api-docs')}
          onContact={() => setView('contact')}
          onTerms={() => setView('terms')}
          onPrivacy={() => setView('privacy')}
          onCookies={() => setView('cookies')}
        />
      )}
      {view === 'pricing' && (
        <LandingPricingPage 
          onBack={() => setView('landing')}
          onStart={() => setView('register')}
          onLogin={() => setView('login')}
          onHowItWorks={() => setView('how-it-works')}
          onAboutUs={() => setView('about-us')}
          onSampleReport={() => setView('sample-report')}
          onApiDocs={() => setView('api-docs')}
          onContact={() => setView('contact')}
          onTerms={() => setView('terms')}
          onPrivacy={() => setView('privacy')}
          onCookies={() => setView('cookies')}
        />
      )}
      {view === 'how-it-works' && (
        <LandingHowItWorksPage 
          onBack={() => setView('landing')}
          onStart={() => setView('register')}
          onLogin={() => setView('login')}
          onPricing={() => setView('pricing')}
          onAboutUs={() => setView('about-us')}
          onSampleReport={() => setView('sample-report')}
          onApiDocs={() => setView('api-docs')}
          onContact={() => setView('contact')}
          onTerms={() => setView('terms')}
          onPrivacy={() => setView('privacy')}
          onCookies={() => setView('cookies')}
        />
      )}
      {view === 'about-us' && (
        <LandingAboutUsPage 
          onBack={() => setView('landing')}
          onStart={() => setView('register')}
          onLogin={() => setView('login')}
          onPricing={() => setView('pricing')}
          onHowItWorks={() => setView('how-it-works')}
          onSampleReport={() => setView('sample-report')}
          onApiDocs={() => setView('api-docs')}
          onContact={() => setView('contact')}
          onTerms={() => setView('terms')}
          onPrivacy={() => setView('privacy')}
          onCookies={() => setView('cookies')}
        />
      )}
      {view === 'sample-report' && (
        <LandingSampleReportPage 
          onBack={() => setView('landing')}
          onStart={() => setView('register')}
          onLogin={() => setView('login')}
          onPricing={() => setView('pricing')}
          onHowItWorks={() => setView('how-it-works')}
          onAboutUs={() => setView('about-us')}
          onApiDocs={() => setView('api-docs')}
          onContact={() => setView('contact')}
          onTerms={() => setView('terms')}
          onPrivacy={() => setView('privacy')}
          onCookies={() => setView('cookies')}
        />
      )}
      {view === 'api-docs' && (
        <LandingApiDocsPage 
          onBack={() => setView('landing')}
          onStart={() => setView('register')}
          onLogin={() => setView('login')}
          onPricing={() => setView('pricing')}
          onHowItWorks={() => setView('how-it-works')}
          onAboutUs={() => setView('about-us')}
          onSampleReport={() => setView('sample-report')}
          onContact={() => setView('contact')}
          onTerms={() => setView('terms')}
          onPrivacy={() => setView('privacy')}
          onCookies={() => setView('cookies')}
        />
      )}
      {view === 'contact' && (
        <LandingContactPage 
          onBack={() => setView('landing')}
          onStart={() => setView('register')}
          onLogin={() => setView('login')}
          onPricing={() => setView('pricing')}
          onHowItWorks={() => setView('how-it-works')}
          onAboutUs={() => setView('about-us')}
          onSampleReport={() => setView('sample-report')}
          onApiDocs={() => setView('api-docs')}
          onTerms={() => setView('terms')}
          onPrivacy={() => setView('privacy')}
          onCookies={() => setView('cookies')}
        />
      )}
      {view === 'terms' && (
        <LandingTermsPage 
          onBack={() => setView('landing')}
          onPricing={() => setView('pricing')}
          onHowItWorks={() => setView('how-it-works')}
          onAboutUs={() => setView('about-us')}
          onSampleReport={() => setView('sample-report')}
          onApiDocs={() => setView('api-docs')}
          onContact={() => setView('contact')}
          onTerms={() => setView('terms')}
          onPrivacy={() => setView('privacy')}
          onCookies={() => setView('cookies')}
        />
      )}
      {view === 'privacy' && (
        <LandingPrivacyPage 
          onBack={() => setView('landing')}
          onPricing={() => setView('pricing')}
          onHowItWorks={() => setView('how-it-works')}
          onAboutUs={() => setView('about-us')}
          onSampleReport={() => setView('sample-report')}
          onApiDocs={() => setView('api-docs')}
          onContact={() => setView('contact')}
          onTerms={() => setView('terms')}
          onPrivacy={() => setView('privacy')}
          onCookies={() => setView('cookies')}
        />
      )}
      {view === 'cookies' && (
        <LandingCookiesPage 
          onBack={() => setView('landing')}
          onPricing={() => setView('pricing')}
          onHowItWorks={() => setView('how-it-works')}
          onAboutUs={() => setView('about-us')}
          onSampleReport={() => setView('sample-report')}
          onApiDocs={() => setView('api-docs')}
          onContact={() => setView('contact')}
          onTerms={() => setView('terms')}
          onPrivacy={() => setView('privacy')}
          onCookies={() => setView('cookies')}
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

