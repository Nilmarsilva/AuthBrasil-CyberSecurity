import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  Eye, 
  Download, 
  Globe, 
  Code, 
  Database, 
  ChevronDown,
  AlertCircle,
  ListFilter
} from 'lucide-react';

interface ReportsPageProps {
  onNavigate?: (view: any, target?: string) => void;
}

export default function ReportsPage({ onNavigate }: ReportsPageProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'critical' | 'medium' | 'safe'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState<number | 'all'>(5);

  const reports = [
    { date: '15 Out 2023', time: '14:30', target: 'authbrasil.com.br', type: 'language', score: '98 (A+)', status: 'success', issues: '0 Críticos, 2 Baixos' },
    { date: '14 Out 2023', time: '09:15', target: 'api.cliente-alpha.com', type: 'dns', score: '45 (F)', status: 'danger', issues: '5 Críticos, 12 Médios' },
    { date: '12 Out 2023', time: '18:45', target: 'github.com/auth-lib', type: 'code', score: '72 (C)', status: 'warning', issues: '1 Crítico, 4 Médios' },
    { date: '10 Out 2023', time: '11:20', target: 'dev.plataforma-beta.io', type: 'language', score: '88 (B)', status: 'primary', issues: '0 Críticos, 3 Médios' },
    { date: '08 Out 2023', time: '16:00', target: 'legacy-system.net', type: 'storage', score: '32 (F)', status: 'danger', issues: '8 Críticos, 15 Médios' },
  ];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.target.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'critical') return matchesSearch && report.status === 'danger';
    if (activeFilter === 'medium') return matchesSearch && (report.status === 'warning' || report.status === 'primary');
    if (activeFilter === 'safe') return matchesSearch && report.status === 'success';
    
    return matchesSearch;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'language': return <Globe className="size-4 text-slate-400" />;
      case 'dns': return <svg className="size-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12V7H3V12M21 12V17H3V12M21 12H3M18 7V17M6 7V17" /></svg>;
      case 'code': return <Code className="size-4 text-slate-400" />;
      case 'storage': return <Database className="size-4 text-slate-400" />;
      default: return <Globe className="size-4 text-slate-400" />;
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'success': return 'bg-status-success/10 border-status-success/20 text-status-success shadow-neon-green';
      case 'danger': return 'bg-status-danger/10 border-status-danger/20 text-status-danger shadow-neon-red';
      case 'warning': return 'bg-status-warning/10 border-status-warning/20 text-status-warning';
      case 'primary': return 'bg-primary/10 border-primary/30 text-blue-300';
      default: return '';
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden relative">
      {/* Content Container */}
      <div className="relative z-10 flex flex-col h-full w-full max-w-[1440px] mx-auto">
        {/* Header Section */}
        <header className="flex flex-col sm:flex-row items-start justify-between p-4 sm:p-8 pb-4 shrink-0 gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Histórico de Relatórios</h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-2xl">
              Gerencie o histórico completo de análises de vulnerabilidade e auditorias.
            </p>
          </div>
          <button 
            onClick={() => onNavigate?.('overview')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow-neon transition-all duration-300 transform hover:scale-105 active:scale-95 group cursor-pointer"
          >
            <ShieldAlert className="size-5 group-hover:animate-pulse" />
            <span className="text-sm font-bold tracking-wide">Nova Varredura</span>
          </button>
        </header>

        {/* Filters & Stats Row */}
        <div className="px-4 sm:px-8 py-4 flex flex-col lg:flex-row gap-4 items-center justify-between shrink-0">
          {/* Status Filter Tabs */}
          <div className="w-full lg:w-auto flex p-1 bg-surface-dark/80 backdrop-blur-md rounded-lg border border-surface-border overflow-x-auto no-scrollbar">
            <div className="flex min-w-max">
              <button 
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-1.5 rounded text-[10px] sm:text-xs font-semibold transition-all cursor-pointer ${
                  activeFilter === 'all' 
                    ? 'text-white bg-primary/20 border border-primary/30 shadow-sm' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                Todos
              </button>
              <button 
                onClick={() => setActiveFilter('critical')}
                className={`px-4 py-1.5 rounded text-[10px] sm:text-xs font-semibold transition-all cursor-pointer ${
                  activeFilter === 'critical' 
                    ? 'text-white bg-status-danger/20 border border-status-danger/30 shadow-sm' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                Críticos
              </button>
              <button 
                onClick={() => setActiveFilter('medium')}
                className={`px-4 py-1.5 rounded text-[10px] sm:text-xs font-semibold transition-all cursor-pointer ${
                  activeFilter === 'medium' 
                    ? 'text-white bg-status-warning/20 border border-status-warning/30 shadow-sm' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                Médio Risco
              </button>
              <button 
                onClick={() => setActiveFilter('safe')}
                className={`px-4 py-1.5 rounded text-[10px] sm:text-xs font-semibold transition-all cursor-pointer ${
                  activeFilter === 'safe' 
                    ? 'text-white bg-status-success/20 border border-status-success/30 shadow-sm' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                Seguros
              </button>
            </div>
          </div>
          
          {/* Search */}
          <div className="w-full lg:w-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="size-4 text-slate-500 group-focus-within:text-primary transition-colors" />
            </div>
            <input 
              className="block w-full lg:w-64 pl-10 pr-3 py-2 border border-surface-border rounded-lg leading-5 bg-surface-dark/50 text-slate-300 placeholder-slate-500 focus:outline-none focus:bg-surface-dark focus:border-primary focus:ring-1 focus:ring-primary text-xs sm:text-sm transition-all" 
              placeholder="Buscar domínio ou repositório..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Table Container */}
        <div className="flex-1 px-4 sm:px-8 pb-8 overflow-hidden">
          <div className="h-full flex flex-col glass-panel rounded-xl overflow-hidden shadow-2xl">
            {/* Desktop Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-white/5 border-b border-white/10 text-[10px] font-bold text-slate-400 uppercase tracking-wider sticky top-0 z-10">
              <div className="col-span-2 flex items-center gap-1 cursor-pointer hover:text-primary">
                DATA/HORA
                <ChevronDown className="size-3" />
              </div>
              <div className="col-span-3">DOMÍNIO/REPO</div>
              <div className="col-span-2 text-center">SCORE FINAL</div>
              <div className="col-span-3">PROBLEMAS ENCONTRADOS</div>
              <div className="col-span-2 text-right">AÇÕES</div>
            </div>
            
            {/* Table Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto">
              {filteredReports.length > 0 ? (
                filteredReports.slice(0, itemsPerPage === 'all' ? filteredReports.length : itemsPerPage).map((report, index) => (
                  <div key={index} className="flex flex-col md:grid md:grid-cols-12 gap-4 px-6 py-4 border-b border-surface-border hover:bg-white/5 transition-colors items-center group">
                    {/* Date/Time */}
                    <div className="w-full md:col-span-2 flex md:flex-col justify-between md:justify-center items-center md:items-start">
                      <span className="text-sm font-medium text-slate-200">{report.date}</span>
                      <span className="text-xs text-slate-500">{report.time}</span>
                    </div>
                    
                    {/* Domain/Repo */}
                    <div className="w-full md:col-span-3 flex items-center gap-3">
                      <div className="p-2 rounded bg-surface-dark border border-surface-border shrink-0">
                        {getIcon(report.type)}
                      </div>
                      <span className="text-sm font-semibold text-white tracking-wide truncate">{report.target}</span>
                    </div>

                    {/* Score */}
                    <div className="w-full md:col-span-2 flex md:justify-center items-center justify-between">
                      <span className="md:hidden text-xs text-slate-500 font-bold uppercase">Score:</span>
                      <div className={`px-3 py-1 rounded-full border text-[10px] font-bold flex items-center gap-1 ${getStatusStyles(report.status)}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${report.status === 'danger' ? 'bg-status-danger animate-pulse' : report.status === 'success' ? 'bg-status-success' : report.status === 'warning' ? 'bg-status-warning' : 'bg-blue-400'}`}></span>
                        {report.score}
                      </div>
                    </div>

                    {/* Issues */}
                    <div className="w-full md:col-span-3 flex flex-col justify-center">
                      <div className="flex items-center justify-between md:justify-start gap-2">
                        <span className="md:hidden text-xs text-slate-500 font-bold uppercase">Problemas:</span>
                        {report.status === 'danger' ? (
                          <div className="flex items-center gap-2 text-status-danger font-medium text-xs">
                            <AlertCircle className="size-3" />
                            {report.issues.split(',')[0]}
                          </div>
                        ) : report.status === 'warning' ? (
                          <span className="text-xs text-status-warning font-medium">{report.issues.split(',')[0]}</span>
                        ) : (
                          <span className="text-xs text-slate-400">{report.issues.split(',')[0]}</span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500 md:pl-5 text-right md:text-left">{report.issues.split(',')[1]}</span>
                    </div>

                    {/* Actions */}
                    <div className="w-full md:col-span-2 flex justify-end gap-4 md:gap-2 md:opacity-60 group-hover:opacity-100 transition-opacity pt-2 md:pt-0 border-t md:border-t-0 border-white/5">
                      <button 
                        onClick={() => onNavigate?.('analyses', report.target)}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 md:block p-2 md:p-1.5 rounded bg-white/5 md:bg-transparent hover:bg-primary/20 hover:text-primary text-slate-400 transition-colors cursor-pointer" 
                      >
                        <Eye className="size-5" />
                        <span className="md:hidden text-xs font-bold">Ver</span>
                      </button>
                      <button 
                        onClick={() => alert(`Iniciando download do relatório: ${report.target}`)}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 md:block p-2 md:p-1.5 rounded bg-white/5 md:bg-transparent hover:bg-white/10 text-slate-400 transition-colors cursor-pointer" 
                      >
                        <Download className="size-5" />
                        <span className="md:hidden text-xs font-bold">PDF</span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-20 text-slate-500">
                  <Search className="size-12 mb-4 opacity-20" />
                  <p className="text-lg font-medium">Nenhum relatório encontrado</p>
                  <p className="text-sm">Tente ajustar seus filtros ou busca.</p>
                </div>
              )}
            </div>

            {/* Footer Actions (Pagination/Limit) */}
            <div className="px-4 sm:px-6 py-4 bg-surface-dark/90 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between shrink-0 gap-4">
              <div className="text-[10px] sm:text-xs text-slate-400">
                Mostrando {itemsPerPage === 'all' ? filteredReports.length : Math.min(itemsPerPage, filteredReports.length)} de {reports.length} relatórios
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mr-2">Exibir:</span>
                <div className="flex p-1 bg-bg-dark rounded-lg border border-white/5">
                  {[5, 10, 20, 'all'].map((limit) => (
                    <button
                      key={limit}
                      onClick={() => setItemsPerPage(limit as any)}
                      className={`px-3 py-1 rounded text-[10px] font-bold uppercase transition-all cursor-pointer ${
                        itemsPerPage === limit 
                          ? 'bg-primary text-white shadow-glow-sm' 
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {limit === 'all' ? 'Todos' : limit}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
