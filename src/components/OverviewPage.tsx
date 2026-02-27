import React from 'react';
import { 
  Link as LinkIcon, 
  Rocket, 
  TrendingUp, 
  DollarSign,
  Shield,
  Award
} from 'lucide-react';
import { motion } from 'motion/react';

export default function OverviewPage() {
  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 relative z-10">
      {/* Header & Quick Stats */}
      <header className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard de Segurança</h2>
          <p className="text-slate-400 mt-1 text-sm sm:text-base">Bem-vindo de volta. Seus sistemas estão seguros.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] sm:text-xs font-bold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            ÚLTIMO SCAN: OK
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-wider">
            <Award className="size-4" />
            Assinatura Ativa
          </div>
        </div>
      </header>

      {/* Action Bar */}
      <section className="mb-10">
        <div className="glassmorphism p-1.5 sm:p-1 rounded-2xl flex flex-col sm:flex-row items-center gap-2 neon-glow-primary">
          <div className="flex items-center w-full sm:flex-1">
            <div className="pl-5 text-slate-500">
              <LinkIcon className="size-5" />
            </div>
            <input 
              type="text" 
              placeholder="Insira URL ou Repositório"
              className="flex-1 bg-transparent border-none focus:ring-0 text-slate-100 placeholder:text-slate-500 text-base sm:text-lg py-3 sm:py-4 px-4 sm:px-0 outline-none min-w-0"
            />
          </div>
          <button className="w-full sm:w-auto bg-primary hover:bg-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all sm:mr-1 cursor-pointer">
            <Rocket className="size-5" />
            <span className="whitespace-nowrap">Iniciar Análise</span>
          </button>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Progress Card */}
        <motion.div 
          whileHover={{ borderColor: 'rgba(19, 91, 236, 0.5)' }}
          className="glassmorphism rounded-2xl p-6 flex items-center justify-between group transition-all"
        >
          <div>
            <p className="text-slate-400 text-sm font-medium">Análises no Mês</p>
            <h3 className="text-3xl font-bold mt-1">42<span className="text-slate-500 text-lg font-normal">/50</span></h3>
            <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold mt-2">
              <TrendingUp className="size-3" />
              +12.5% vs último mês
            </div>
          </div>
          <div className="relative size-20 flex items-center justify-center">
            <svg className="size-full -rotate-90" viewBox="0 0 36 36">
              <circle className="stroke-slate-800" cx="18" cy="18" fill="none" r="16" strokeWidth="3" />
              <circle className="stroke-primary" cx="18" cy="18" fill="none" r="16" strokeDasharray="84, 100" strokeLinecap="round" strokeWidth="3" />
            </svg>
            <span className="absolute text-xs font-bold">84%</span>
          </div>
        </motion.div>

        {/* Vulnerabilities Card */}
        <motion.div 
          whileHover={{ borderColor: 'rgba(139, 92, 246, 0.5)' }}
          className="glassmorphism rounded-2xl p-6 group transition-all"
        >
          <div className="flex justify-between">
            <p className="text-slate-400 text-sm font-medium">Vulnerabilidades Mitigadas</p>
            <Shield className="text-accent-purple size-5" />
          </div>
          <h3 className="text-3xl font-bold mt-1">128</h3>
          <p className="text-slate-500 text-xs mt-2 font-medium">Total de patches aplicados este ano</p>
          <div className="mt-4 h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-accent-purple to-primary w-3/4" />
          </div>
        </motion.div>

        {/* ROI Card */}
        <motion.div 
          whileHover={{ borderColor: 'rgba(16, 185, 129, 0.5)' }}
          className="glassmorphism rounded-2xl p-6 group transition-all"
        >
          <div className="flex justify-between">
            <p className="text-slate-400 text-sm font-medium">Economia Estimada</p>
            <DollarSign className="text-emerald-400 size-5" />
          </div>
          <h3 className="text-3xl font-bold mt-1">R$ 15.400,00</h3>
          <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold mt-2">
            <Shield className="size-3" />
            ROI em Riscos Evitados
          </div>
        </motion.div>
      </section>

      {/* Analytics Charts Area */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Security Evolution Chart (Main) */}
        <div className="lg:col-span-2 glassmorphism rounded-3xl p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h4 className="text-lg font-bold">Evolução da Segurança</h4>
              <p className="text-sm text-slate-500">Média de Security Score nos últimos 6 meses</p>
            </div>
            <select className="bg-slate-900 border-slate-700 rounded-lg text-xs font-bold text-slate-300 px-3 py-1.5 focus:ring-primary focus:border-primary outline-none">
              <option>Últimos 6 Meses</option>
              <option>Este Ano</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-between gap-4 px-2">
            {[
              { label: 'Jan', h: 'h-32', activeH: 'h-20', opacity: 'opacity-40' },
              { label: 'Fev', h: 'h-40', activeH: 'h-28', opacity: 'opacity-50' },
              { label: 'Mar', h: 'h-36', activeH: 'h-24', opacity: 'opacity-60' },
              { label: 'Abr', h: 'h-48', activeH: 'h-40', opacity: 'opacity-70' },
              { label: 'Mai', h: 'h-56', activeH: 'h-48', opacity: 'opacity-80' },
              { label: 'Jun', h: 'h-60', activeH: 'h-52', opacity: 'opacity-100', isCurrent: true },
            ].map((item, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div className={`w-full bg-slate-800/50 rounded-t-lg relative ${item.h} hover:bg-primary/20 transition-all ${item.isCurrent ? 'border-x border-t border-primary/30' : ''}`}>
                  <div className={`absolute bottom-0 w-full bg-primary ${item.activeH} rounded-t-lg ${item.opacity} ${item.isCurrent ? 'neon-glow-primary' : ''}`} />
                </div>
                <span className={`text-[10px] font-bold uppercase ${item.isCurrent ? 'text-primary' : 'text-slate-500'}`}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Severity Radar/Category Chart */}
        <div className="glassmorphism rounded-3xl p-8">
          <h4 className="text-lg font-bold mb-1">Severidade por Categoria</h4>
          <p className="text-sm text-slate-500 mb-8">Foco de risco atual</p>
          <div className="relative size-full flex items-center justify-center min-h-[220px]">
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <div className="size-48 border border-slate-500 rounded-full rotate-45" />
              <div className="size-32 border border-slate-500 rounded-full rotate-45" />
              <div className="size-16 border border-slate-500 rounded-full rotate-45" />
              <div className="absolute w-px h-52 bg-slate-500" />
              <div className="absolute h-px w-52 bg-slate-500" />
            </div>
            <div className="absolute top-0 text-[10px] font-bold text-slate-400">HTTP/S</div>
            <div className="absolute bottom-0 text-[10px] font-bold text-slate-400">CMS</div>
            <div className="absolute right-0 text-[10px] font-bold text-slate-400">SSL/TLS</div>
            <div className="absolute left-0 text-[10px] font-bold text-slate-400">PORTS</div>
            <svg className="size-40 relative z-10 fill-accent-purple/30 stroke-accent-purple stroke-2" viewBox="0 0 100 100">
              <polygon points="50,10 85,50 50,75 25,40" />
              <circle cx="50" cy="10" fill="#8b5cf6" r="3" />
              <circle cx="85" cy="50" fill="#8b5cf6" r="3" />
              <circle cx="50" cy="75" fill="#8b5cf6" r="3" />
              <circle cx="25" cy="40" fill="#8b5cf6" r="3" />
            </svg>
          </div>
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">SSL/TLS</span>
              <span className="text-xs font-bold text-emerald-400">Crítico (0)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">HTTP Configuration</span>
              <span className="text-xs font-bold text-amber-400">Médio (3)</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
