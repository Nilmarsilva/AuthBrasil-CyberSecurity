import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Search, 
  Eye, 
  Download, 
  Globe, 
  Code, 
  Database, 
  ChevronDown,
  AlertCircle,
  ListFilter,
  Loader2
} from 'lucide-react';
import { scanApiService, ScanResponse } from '../services/api';

interface ReportsPageProps {
  onNavigate?: (view: any, target?: string) => void;
}

export default function ReportsPage({ onNavigate }: ReportsPageProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'critical' | 'medium' | 'safe'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState<number | 'all'>(5);
  const [reports, setReports] = useState<ScanResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setIsLoading(true);
      const data = await scanApiService.listScans();
      setReports(data);
    } catch (error) {
      console.error("Erro ao buscar relatórios:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = (id: number, target: string) => {
    // No ambiente do AI Studio, usamos o endpoint relativo
    const url = `/api/reports/pdf/${id}`;
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Relatorio_Seguranca_${target}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.url.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === 'all') return matchesSearch;
    
    const score = report.score || 0;
    if (activeFilter === 'critical') return matchesSearch && score < 50;
    if (activeFilter === 'medium') return matchesSearch && score >= 50 && score < 85;
    if (activeFilter === 'safe') return matchesSearch && score >= 85;
    
    return matchesSearch;
  });

  const getStatusStyles = (score?: number) => {
    if (score === undefined) return 'bg-slate-800 text-slate-400 border-slate-700';
    if (score >= 85) return 'bg-status-success/10 border-status-success/20 text-status-success shadow-neon-green';
    if (score < 50) return 'bg-status-danger/10 border-status-danger/20 text-status-danger shadow-neon-red';
    return 'bg-status-warning/10 border-status-warning/20 text-status-warning';
  };

  const getScoreLabel = (score?: number) => {
    if (score === undefined) return 'Pendente';
    if (score >= 95) return `${score} (A+)`;
    if (score >= 85) return `${score} (A)`;
    if (score >= 70) return `${score} (B)`;
    if (score >= 50) return `${score} (C)`;
    return `${score} (F)`;
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
            onClick={() => onNavigate?.('analyses')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow-neon transition-all duration-300 transform hover:scale-105 active:scale-95 group cursor-pointer"
          >
            <Shield className="size-5 group-hover:animate-pulse" />
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
              <div className="col-span-3">DOMÍNIO/URL</div>
              <div className="col-span-2 text-center">SCORE FINAL</div>
              <div className="col-span-3">STATUS DO SCAN</div>
              <div className="col-span-2 text-right">AÇÕES</div>
            </div>
            
            {/* Table Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full py-20 text-slate-500">
                  <Loader2 className="size-12 mb-4 animate-spin text-primary" />
                  <p className="text-lg font-medium">Carregando relatórios...</p>
                </div>
              ) : filteredReports.length > 0 ? (
                filteredReports.slice(0, itemsPerPage === 'all' ? filteredReports.length : itemsPerPage).map((report, index) => (
                  <div key={report.id} className="flex flex-col md:grid md:grid-cols-12 gap-4 px-6 py-4 border-b border-surface-border hover:bg-white/5 transition-colors items-center group">
                    {/* Date/Time */}
                    <div className="w-full md:col-span-2 flex md:flex-col justify-between md:justify-center items-center md:items-start">
                      <span className="text-sm font-medium text-slate-200">{new Date(report.created_at).toLocaleDateString()}</span>
                      <span className="text-xs text-slate-500">{new Date(report.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    
                    {/* Domain/Repo */}
                    <div className="w-full md:col-span-3 flex items-center gap-3">
                      <div className="p-2 rounded bg-surface-dark border border-surface-border shrink-0">
                        <Globe className="size-4 text-slate-400" />
                      </div>
                      <span className="text-sm font-semibold text-white tracking-wide truncate">{report.url}</span>
                    </div>

                    {/* Score */}
                    <div className="w-full md:col-span-2 flex md:justify-center items-center justify-between">
                      <span className="md:hidden text-xs text-slate-500 font-bold uppercase">Score:</span>
                      <div className={`px-3 py-1 rounded-full border text-[10px] font-bold flex items-center gap-1 ${getStatusStyles(report.score)}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${report.score && report.score < 50 ? 'bg-status-danger animate-pulse' : report.score && report.score >= 85 ? 'bg-status-success' : 'bg-status-warning'}`}></span>
                        {getScoreLabel(report.score)}
                      </div>
                    </div>

                    {/* Status */}
                    <div className="w-full md:col-span-3 flex flex-col justify-center">
                      <div className="flex items-center justify-between md:justify-start gap-2">
                        <span className="md:hidden text-xs text-slate-500 font-bold uppercase">Status:</span>
                        <span className={`text-xs font-medium ${report.status === 'completed' ? 'text-status-success' : report.status === 'failed' ? 'text-status-danger' : 'text-primary animate-pulse'}`}>
                          {report.status === 'completed' ? 'Concluído' : report.status === 'running' ? 'Em Execução' : report.status === 'failed' ? 'Falhou' : 'Pendente'}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="w-full md:col-span-2 flex justify-end gap-4 md:gap-2 md:opacity-60 group-hover:opacity-100 transition-opacity pt-2 md:pt-0 border-t md:border-t-0 border-white/5">
                      <button 
                        onClick={() => onNavigate?.('analyses', report.url)}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 md:block p-2 md:p-1.5 rounded bg-white/5 md:bg-transparent hover:bg-primary/20 hover:text-primary text-slate-400 transition-colors cursor-pointer" 
                      >
                        <Eye className="size-5" />
                        <span className="md:hidden text-xs font-bold">Ver</span>
                      </button>
                      <button 
                        onClick={() => handleDownloadPDF(report.id, report.url)}
                        disabled={report.status !== 'completed'}
                        className={`flex-1 md:flex-none flex items-center justify-center gap-2 md:block p-2 md:p-1.5 rounded bg-white/5 md:bg-transparent transition-colors cursor-pointer ${report.status === 'completed' ? 'hover:bg-white/10 text-slate-400' : 'opacity-20 cursor-not-allowed'}`} 
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
