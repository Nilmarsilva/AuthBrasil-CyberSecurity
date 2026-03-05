import React, { useEffect, useState } from 'react';
import { 
  TrendingUp, 
  Shield,
  Award,
  AlertCircle,
  Globe,
  Github,
  Activity,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Clock
} from 'lucide-react';
import { motion } from 'motion/react';
import { scanApiService, ScanResponse } from '../services/api';

interface OverviewPageProps {
  onNavigate?: (view: any) => void;
}

export default function OverviewPage({ onNavigate }: OverviewPageProps) {
  // ESTADO PARA DADOS REAIS DA API
  const [scans, setScans] = useState<ScanResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchScans = async () => {
      try {
        setIsLoading(true);
        // Chamada para o seu endpoint GET /scans
        const data = await scanApiService.listScans(0, 10);
        setScans(data);
      } catch (error) {
        console.error("Erro ao buscar scans da API:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchScans();
  }, []);

  // Cálculos baseados em dados reais
  const completedScans = scans.filter(s => s.status === 'completed');
  const globalScore = completedScans.length > 0 
    ? Math.round(completedScans.reduce((acc, s) => acc + (s.score || 0), 0) / completedScans.length)
    : 0;

  const totalCritical = completedScans.reduce((acc, s) => acc + (s.score !== undefined && s.score < 50 ? 1 : 0), 0);
  const totalMedium = completedScans.reduce((acc, s) => acc + (s.score !== undefined && s.score >= 50 && s.score < 85 ? 1 : 0), 0);
  const totalLow = completedScans.reduce((acc, s) => acc + (s.score !== undefined && s.score >= 85 && s.score < 100 ? 1 : 0), 0);

  const recentActivities = scans.slice(0, 5).map(s => ({
    id: s.id,
    type: 'scan' as const,
    target: s.url,
    status: s.status === 'completed' ? 'concluído' : s.status === 'running' ? 'em execução' : s.status === 'failed' ? 'falhou' : 'pendente',
    time: new Date(s.created_at).toLocaleDateString(),
    score: s.score
  }));

  const aiInsights = [
    { id: 1, text: 'Feche a porta 3306 no servidor X para aumentar seu score em +15 pontos.', impact: 'Alto' },
    { id: 2, text: 'Atualize o Nginx para a versão 1.25 (CVE-2023-XXXX).', impact: 'Médio' },
  ];

  const getScoreHealth = (score: number) => {
    if (score >= 85) return { label: 'Excelente', color: 'text-emerald-400' };
    if (score >= 70) return { label: 'Boa', color: 'text-primary' };
    if (score >= 50) return { label: 'Regular', color: 'text-amber-400' };
    return { label: 'Crítica', color: 'text-red-500' };
  };

  const health = getScoreHealth(globalScore);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 relative z-10">
      {/* Hero Section: Global Score */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
        <div className="lg:col-span-8 glassmorphism rounded-3xl p-8 flex flex-col sm:flex-row items-center gap-8 bg-gradient-to-br from-primary/10 via-transparent to-transparent border-primary/20">
          <div className="relative size-48 flex items-center justify-center">
            <svg className="size-full -rotate-90" viewBox="0 0 100 100">
              <circle className="stroke-slate-800" cx="50" cy="50" fill="none" r="45" strokeWidth="8" />
              <circle className="stroke-primary" cx="50" cy="50" fill="none" r="45" strokeDasharray={`${(globalScore / 100) * 283}, 283`} strokeLinecap="round" strokeWidth="8" style={{ strokeDashoffset: 0 }} />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-6xl font-black text-white">{globalScore}</span>
              <span className="text-[10px] text-primary font-bold tracking-widest uppercase">Score Global</span>
            </div>
            <div className="absolute inset-0 rounded-full shadow-[0_0_50px_rgba(59,130,246,0.2)] pointer-events-none" />
          </div>
          
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-3xl font-bold text-white mb-3">Sua saúde digital é <span className={health.color}>{health.label}</span></h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              {globalScore < 100 
                ? `Identificamos ${totalCritical} vulnerabilidades críticas que estão impactando seu score. Corrija-as para atingir o nível Excelente.`
                : 'Parabéns! Seu ambiente está seguro e segue as melhores práticas.'}
            </p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                <div className="size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <span className="text-xs font-bold text-slate-300">{completedScans.filter(s => s.score && s.score >= 85).length} Ativos Seguros</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                <div className="size-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                <span className="text-xs font-bold text-slate-300">{completedScans.filter(s => s.score && s.score < 50).length} Ativos em Risco</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 grid grid-cols-1 gap-4">
          <div className="glassmorphism rounded-2xl p-6 border-l-4 border-l-red-500 flex justify-between items-center">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Scans Críticos</p>
              <h3 className="text-2xl font-bold text-white mt-1">{totalCritical < 10 ? `0${totalCritical}` : totalCritical}</h3>
            </div>
            <AlertCircle className="text-red-500 size-8 opacity-50" />
          </div>
          <div className="glassmorphism rounded-2xl p-6 border-l-4 border-l-amber-500 flex justify-between items-center">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Scans Médios</p>
              <h3 className="text-2xl font-bold text-white mt-1">{totalMedium < 10 ? `0${totalMedium}` : totalMedium}</h3>
            </div>
            <AlertCircle className="text-amber-500 size-8 opacity-50" />
          </div>
          <div className="glassmorphism rounded-2xl p-6 border-l-4 border-l-blue-500 flex justify-between items-center">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Scans Seguros</p>
              <h3 className="text-2xl font-bold text-white mt-1">{totalLow < 10 ? `0${totalLow}` : totalLow}</h3>
            </div>
            <AlertCircle className="text-blue-500 size-8 opacity-50" />
          </div>
        </div>
      </section>

      {/* Asset Status & Activity */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
        {/* Asset Inventory */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <h3 className="text-lg font-bold text-white px-2">Inventário de Ativos</h3>
          
          <div className="glassmorphism rounded-2xl p-6 relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <Globe className="text-emerald-400 size-6" />
              </div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">DAST ATIVO</span>
            </div>
            <h4 className="text-xl font-bold text-white">Websites & APIs</h4>
            <p className="text-xs text-slate-500 mt-1">12 domínios monitorados</p>
            <div className="mt-6 flex items-center justify-between text-xs">
              <span className="text-slate-400">Saúde Média</span>
              <span className="text-emerald-400 font-bold">88%</span>
            </div>
            <div className="mt-2 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[88%]" />
            </div>
          </div>

          <div className="glassmorphism rounded-2xl p-6 relative overflow-hidden opacity-60 grayscale hover:grayscale-0 transition-all cursor-help">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                <Github className="text-primary size-6" />
              </div>
              <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded">SAST v2.0</span>
            </div>
            <h4 className="text-xl font-bold text-white">Repositórios</h4>
            <p className="text-xs text-slate-500 mt-1">Análise de código estático (OWASP)</p>
            <div className="mt-6 flex items-center justify-center py-2 border border-dashed border-white/10 rounded-lg">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Em Breve</span>
            </div>
          </div>
        </div>

        {/* Atividade Recente */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <h3 className="text-lg font-bold text-white px-2">Atividade Recente</h3>
          <div className="glassmorphism rounded-2xl overflow-hidden">
            {/* 
                DICA DE INTEGRAÇÃO:
                Aqui você pode mapear os dados reais vindos da sua API:
                {scans.length > 0 ? scans.map(...) : recentActivities.map(...)}
            */}
            {recentActivities.map((activity, i) => (
              <div key={activity.id} className={`p-4 flex items-center gap-4 hover:bg-white/5 transition-colors ${i !== recentActivities.length - 1 ? 'border-b border-white/5' : ''}`}>
                <div className={`p-2 rounded-lg ${
                  activity.type === 'scan' ? 'bg-blue-500/10 text-blue-400' : 
                  activity.type === 'report' ? 'bg-emerald-500/10 text-emerald-400' : 
                  'bg-red-500/10 text-red-400'
                }`}>
                  {activity.type === 'scan' ? <Activity className="size-4" /> : 
                   activity.type === 'report' ? <Award className="size-4" /> : 
                   <AlertCircle className="size-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h5 className="text-sm font-bold text-slate-200 truncate">{activity.target}</h5>
                    <span className="text-[10px] text-slate-500 whitespace-nowrap ml-2">{activity.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {activity.type === 'alert' ? activity.issue : `Ação ${activity.status} com sucesso.`}
                  </p>
                </div>
                {activity.score && (
                  <div className="text-right">
                    <span className={`text-xs font-bold ${activity.score > 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {activity.score}
                    </span>
                  </div>
                )}
              </div>
            ))}
            <button 
              onClick={() => onNavigate?.('reports')}
              className="w-full p-3 text-xs font-bold text-primary hover:bg-primary/5 transition-colors border-t border-white/5 flex items-center justify-center gap-2 cursor-pointer"
            >
              Ver Histórico Completo <ChevronRight className="size-3" />
            </button>
          </div>
        </div>

        {/* AI Insights */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <h3 className="text-lg font-bold text-white px-2 flex items-center gap-2">
            <BrainCircuit className="size-5 text-primary" /> Insights IA
          </h3>
          <div className="flex flex-col gap-4">
            {aiInsights.map((insight) => (
              <div key={insight.id} className="glassmorphism rounded-2xl p-5 bg-gradient-to-br from-primary/5 to-transparent border-primary/10">
                <div className="flex justify-between items-start mb-3">
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase ${
                    insight.impact === 'Alto' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>Impacto {insight.impact}</span>
                  <Clock className="size-3 text-slate-600" />
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{insight.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evolution Chart */}
      <section className="glassmorphism rounded-3xl p-8 mb-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h4 className="text-lg font-bold">Evolução da Segurança</h4>
            <p className="text-sm text-slate-500">Média de Security Score nos últimos 6 meses</p>
          </div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
            <TrendingUp className="size-4" /> +12.5%
          </div>
        </div>
        <div className="h-48 flex items-end justify-between gap-4 px-2">
          {[
            { label: 'Jan', h: 'h-24', activeH: 'h-16', opacity: 'opacity-40' },
            { label: 'Fev', h: 'h-32', activeH: 'h-20', opacity: 'opacity-50' },
            { label: 'Mar', h: 'h-28', activeH: 'h-18', opacity: 'opacity-60' },
            { label: 'Abr', h: 'h-36', activeH: 'h-28', opacity: 'opacity-70' },
            { label: 'Mai', h: 'h-40', activeH: 'h-32', opacity: 'opacity-80' },
            { label: 'Jun', h: 'h-44', activeH: 'h-36', opacity: 'opacity-100', isCurrent: true },
          ].map((item, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
              <div className={`w-full bg-slate-800/50 rounded-t-lg relative ${item.h} hover:bg-primary/20 transition-all ${item.isCurrent ? 'border-x border-t border-primary/30' : ''}`}>
                <div className={`absolute bottom-0 w-full bg-primary ${item.activeH} rounded-t-lg ${item.opacity} ${item.isCurrent ? 'neon-glow-primary' : ''}`} />
              </div>
              <span className={`text-[10px] font-bold uppercase ${item.isCurrent ? 'text-primary' : 'text-slate-500'}`}>{item.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
