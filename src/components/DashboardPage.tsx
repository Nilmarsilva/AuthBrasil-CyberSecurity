import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  AlertTriangle, 
  FileText, 
  Settings, 
  CheckCircle, 
  LogOut, 
  Shield, 
  CreditCard,
  Menu,
  X as CloseIcon
} from 'lucide-react';
import OverviewPage from './OverviewPage';
import AnalysesPage from './AnalysesPage';
import ReportsPage from './ReportsPage';
import VulnerabilitiesPage from './VulnerabilitiesPage';
import PlansPage from './PlansPage';
import SettingsPage from './SettingsPage';
import { motion, AnimatePresence } from 'motion/react';

interface DashboardPageProps {
  onLogout: () => void;
}

type ViewType = 'overview' | 'analyses' | 'reports' | 'vulnerabilities' | 'plans' | 'settings';

export default function DashboardPage({ onLogout }: DashboardPageProps) {
  const [currentView, setCurrentView] = useState<ViewType>('overview');
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigate = (view: ViewType, target?: string) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    if (target) {
      setSelectedTarget(target);
    } else if (view === 'overview') {
      setSelectedTarget(null);
    }
  };

  const menuItems = [
    { id: 'overview', label: 'Visão Geral', icon: LayoutDashboard },
    { id: 'analyses', label: 'Analises', icon: BarChart3 },
    { id: 'reports', label: 'Relatorios', icon: FileText },
    { id: 'vulnerabilities', label: 'Vulnerabilidades', icon: AlertTriangle },
    { id: 'plans', label: 'Planos', icon: CreditCard },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  const SidebarContent = () => (
    <>
      <div className="p-6 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
          <Shield className="size-6 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white leading-none">AuthBrasil</h1>
          <p className="text-[10px] text-primary font-medium mt-1 uppercase tracking-widest">Security Cloud</p>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id as ViewType)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
                isActive 
                  ? 'bg-primary/10 text-primary border border-primary/20' 
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100 border border-transparent'
              }`}
            >
              <Icon className="size-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="glassmorphism rounded-2xl p-4 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold text-primary uppercase">Plano Pro</span>
            <CheckCircle className="text-primary size-4" />
          </div>
          <p className="text-xs text-slate-400 mb-3">Sua proteção está ativa e monitorando 24/7.</p>
          <button className="w-full py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-bold transition-all neon-glow-primary cursor-pointer">
            Upgrade Plan
          </button>
        </div>
        
        <div className="mt-4 flex items-center gap-3 px-2">
          <div className="size-10 rounded-full bg-slate-800 border border-slate-700 overflow-hidden">
            <img 
              src="https://picsum.photos/seed/authbrasil/100/100" 
              alt="User avatar" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold">Admin Empresa</p>
            <p className="text-[10px] text-slate-500 uppercase">Sessão Ativa</p>
          </div>
          <button onClick={onLogout} className="text-slate-500 hover:text-white transition-colors cursor-pointer">
            <LogOut className="size-5" />
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex h-screen overflow-hidden font-space bg-bg-dark">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 bg-slate-950 border-r border-slate-800 flex-col shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] lg:hidden"
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-slate-950 border-r border-slate-800 flex flex-col z-[101] lg:hidden shadow-2xl"
            >
              <div className="absolute right-4 top-6 lg:hidden">
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <CloseIcon className="size-6" />
                </button>
              </div>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-slate-950 border-b border-slate-800 sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Shield className="size-5 text-primary" />
            </div>
            <h1 className="text-lg font-bold tracking-tight text-white leading-none">AuthBrasil</h1>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <Menu className="size-6" />
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-bg-deep text-slate-100 relative">
          {currentView === 'overview' && <OverviewPage />}
          {currentView === 'analyses' && <AnalysesPage target={selectedTarget} />}
          {currentView === 'reports' && <ReportsPage onNavigate={handleNavigate} />}
          {currentView === 'vulnerabilities' && <VulnerabilitiesPage onNavigate={handleNavigate} />}
          {currentView === 'plans' && <PlansPage />}
          {currentView === 'settings' && <SettingsPage />}
          {/* Placeholder for other views */}
          {!['overview', 'analyses', 'reports', 'vulnerabilities', 'plans', 'settings'].includes(currentView) && (
            <div className="flex items-center justify-center h-full text-slate-500">
              Página de {menuItems.find(m => m.id === currentView)?.label} em desenvolvimento.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
