import React, { useEffect, useState } from 'react';
import { 
  Shield, 
  Users, 
  Activity, 
  Server, 
  Database, 
  Clock,
  ChevronRight,
  Search,
  AlertTriangle,
  LayoutDashboard,
  Settings,
  ArrowLeft,
  MoreVertical,
  UserPlus,
  Trash2,
  Edit2,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Terminal,
  ShieldCheck,
  Loader2
} from 'lucide-react';
import api from '../services/api';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';

interface SystemStats {
  active_scans: number;
  total_scans: number;
  total_users: number;
  db_status: string;
  memory_usage: string;
  os_uptime: string;
}

interface AdminUser {
  id: string;
  full_name: string;
  email: string;
  company: string;
  role: string;
  is_admin: boolean;
  created_at?: string;
}

type AdminView = 'dashboard' | 'users' | 'scans' | 'settings';

interface AdminPageProps {
  onBack?: () => void;
}

export default function AdminPage({ onBack }: AdminPageProps) {
  const [activeView, setActiveView] = useState<AdminView>('dashboard');
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [allScans, setAllScans] = useState<any[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [statsRes, scansRes] = await Promise.all([
        api.get('/admin/system-stats'),
        api.get('/admin/all-scans')
      ]);
      setStats(statsRes.data);
      setAllScans(scansRes.data);

      // Buscar usuários do Supabase
      if (supabase) {
        const { data: profiles, error } = await supabase
          .from('profiles')
          .select('*')
          .order('full_name');
        
        if (!error && profiles) {
          setUsers(profiles);
        }
      }
    } catch (error) {
      console.error("Erro ao carregar dados administrativos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const adminMenuItems = [
    { id: 'dashboard', label: 'Visão Geral', icon: LayoutDashboard },
    { id: 'users', label: 'Gerenciar Usuários', icon: Users },
    { id: 'scans', label: 'Scans Globais', icon: Activity },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  if (isLoading && !stats) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <Loader2 className="size-12 text-primary animate-spin" />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Carregando Painel Admin...</p>
      </div>
    );
  }

  return (
    <div className="flex h-full bg-bg-deep overflow-hidden">
      {/* Secondary Admin Sidebar */}
      <aside className="w-64 bg-slate-950/50 border-r border-slate-800 flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <Shield className="text-amber-500 size-5" />
          </div>
          <h2 className="font-black text-white tracking-tight">ADMIN CORE</h2>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {adminMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id as AdminView)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' 
                    : 'text-slate-500 hover:bg-white/5 hover:text-slate-300 border border-transparent'
                }`}
              >
                <Icon className="size-5" />
                <span className="font-bold text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={onBack}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-all text-xs font-bold uppercase tracking-widest cursor-pointer"
          >
            <ArrowLeft className="size-4" />
            Voltar ao App
          </button>
        </div>
      </aside>

      {/* Admin Content Area */}
      <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <AnimatePresence mode="wait">
          {activeView === 'dashboard' && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <header>
                <h1 className="text-3xl font-black text-white">Dashboard do Sistema</h1>
                <p className="text-slate-500 mt-1">Monitoramento de infraestrutura e métricas globais.</p>
              </header>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="glass-card p-6 rounded-2xl border-slate-800 bg-blue-500/5">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total de Usuários</p>
                      <h3 className="text-3xl font-black text-white mt-1">{stats?.total_users}</h3>
                    </div>
                    <Users className="text-blue-500 size-6 opacity-50" />
                  </div>
                </div>
                <div className="glass-card p-6 rounded-2xl border-slate-800 bg-emerald-500/5">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Scans Realizados</p>
                      <h3 className="text-3xl font-black text-white mt-1">{stats?.total_scans}</h3>
                    </div>
                    <Activity className="text-emerald-500 size-6 opacity-50" />
                  </div>
                </div>
                <div className="glass-card p-6 rounded-2xl border-slate-800 bg-amber-500/5">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Scans Ativos</p>
                      <h3 className="text-3xl font-black text-white mt-1">{stats?.active_scans}</h3>
                    </div>
                    <Server className="text-amber-500 size-6 opacity-50" />
                  </div>
                </div>
                <div className="glass-card p-6 rounded-2xl border-slate-800 bg-purple-500/5">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Uso de Memória</p>
                      <h3 className="text-3xl font-black text-white mt-1">{stats?.memory_usage}</h3>
                    </div>
                    <Database className="text-purple-500 size-6 opacity-50" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                  <h3 className="text-xl font-bold text-white px-2">Saúde do Sistema</h3>
                  <div className="glass-card p-6 rounded-2xl border-slate-800 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">Banco de Dados</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase">Saudável</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">Uptime do Processo</span>
                      <span className="text-sm font-bold text-white">{stats?.os_uptime}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">Versão do Motor</span>
                      <span className="text-sm font-bold text-white">Nuclei v3.1.0</span>
                    </div>
                    <div className="pt-4 border-t border-slate-800">
                      <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer">
                        Reiniciar Motor de Scan
                      </button>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                  <h3 className="text-xl font-bold text-white px-2">Atividade Recente</h3>
                  <div className="glass-card rounded-2xl overflow-hidden border-slate-800">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-900/50 text-slate-400 font-bold uppercase text-[10px] tracking-widest border-b border-slate-800">
                        <tr>
                          <th className="px-6 py-4">Usuário</th>
                          <th className="px-6 py-4">Domínio</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4 text-right">Score</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {allScans.slice(0, 5).map((scan) => (
                          <tr key={scan.id} className="hover:bg-slate-800/30 transition-colors">
                            <td className="px-6 py-4 font-mono text-[10px] text-slate-500">{scan.user_id.substring(0, 8)}...</td>
                            <td className="px-6 py-4 font-medium text-slate-300">{scan.url}</td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter ${
                                scan.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500' : 
                                scan.status === 'running' ? 'bg-blue-500/10 text-blue-500 animate-pulse' : 
                                'bg-red-500/10 text-red-500'
                              }`}>
                                {scan.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right font-bold text-white">{scan.score || '--'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeView === 'users' && (
            <motion.div 
              key="users"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <header className="flex justify-between items-end">
                <div>
                  <h1 className="text-3xl font-black text-white">Gerenciamento de Usuários</h1>
                  <p className="text-slate-500 mt-1">Visualize e gerencie todos os perfis cadastrados no sistema.</p>
                </div>
                <button className="flex items-center gap-2 bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer">
                  <UserPlus className="size-4" />
                  Novo Usuário
                </button>
              </header>

              <div className="glass-card rounded-2xl overflow-hidden border-slate-800">
                <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/30">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
                    <input 
                      type="text" 
                      placeholder="Buscar por nome ou e-mail..." 
                      className="bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-primary w-80"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-slate-500 hover:text-white transition-colors cursor-pointer">
                      <RefreshCw className="size-4" />
                    </button>
                  </div>
                </div>
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-900/50 text-slate-400 font-bold uppercase text-[10px] tracking-widest border-b border-slate-800">
                    <tr>
                      <th className="px-6 py-4">Nome / Empresa</th>
                      <th className="px-6 py-4">E-mail</th>
                      <th className="px-6 py-4">Cargo</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-200">{user.full_name}</span>
                            <span className="text-[10px] text-slate-500 uppercase">{user.company || 'N/A'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-400">{user.email || 'N/A'}</td>
                        <td className="px-6 py-4 text-slate-400">{user.role || 'Membro'}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter ${
                            user.is_admin ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-500'
                          }`}>
                            {user.is_admin ? 'ADMIN' : 'USUÁRIO'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button className="p-1.5 text-slate-500 hover:text-white transition-colors cursor-pointer">
                              <Edit2 className="size-4" />
                            </button>
                            <button className="p-1.5 text-slate-500 hover:text-red-500 transition-colors cursor-pointer">
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeView === 'scans' && (
            <motion.div 
              key="scans"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <header>
                <h1 className="text-3xl font-black text-white">Scans Globais</h1>
                <p className="text-slate-500 mt-1">Histórico completo de todas as varreduras realizadas na plataforma.</p>
              </header>

              <div className="glass-card rounded-2xl overflow-hidden border-slate-800">
                <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/30">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
                    <input 
                      type="text" 
                      placeholder="Filtrar por URL..." 
                      className="bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-primary w-80"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-900/50 text-slate-400 font-bold uppercase text-[10px] tracking-widest border-b border-slate-800">
                    <tr>
                      <th className="px-6 py-4">ID / Data</th>
                      <th className="px-6 py-4">Usuário</th>
                      <th className="px-6 py-4">Domínio Analisado</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {allScans
                      .filter(s => s.url.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((scan) => (
                      <tr key={scan.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-mono text-[10px] text-slate-300">#{scan.id}</span>
                            <span className="text-[10px] text-slate-500">{new Date(scan.created_at).toLocaleDateString()}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-mono text-[10px] text-slate-500">{scan.user_id.substring(0, 8)}...</td>
                        <td className="px-6 py-4 font-medium text-slate-300">{scan.url}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter ${
                            scan.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500' : 
                            scan.status === 'running' ? 'bg-blue-500/10 text-blue-500 animate-pulse' : 
                            'bg-red-500/10 text-red-500'
                          }`}>
                            {scan.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className={`font-bold ${
                            (scan.score || 0) >= 80 ? 'text-emerald-400' : 
                            (scan.score || 0) >= 50 ? 'text-amber-400' : 
                            'text-red-400'
                          }`}>
                            {scan.score || '--'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeView === 'settings' && (
            <motion.div 
              key="settings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <header>
                <h1 className="text-3xl font-black text-white">Configurações do Sistema</h1>
                <p className="text-slate-500 mt-1">Gerencie parâmetros globais, chaves de API e logs do servidor.</p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <section className="glass-card p-8 rounded-2xl border-slate-800 space-y-6">
                  <div className="flex items-center gap-3">
                    <Terminal className="text-primary size-6" />
                    <h3 className="text-xl font-bold text-white">Parâmetros do Motor</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Threads de Scan Simultâneas</label>
                      <input type="number" defaultValue={10} className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-primary" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Timeout Padrão (ms)</label>
                      <input type="number" defaultValue={5000} className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-primary" />
                    </div>
                    <div className="flex items-center justify-between pt-4">
                      <span className="text-sm text-slate-400">Modo Debug Ativo</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input className="sr-only peer" type="checkbox" />
                        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                </section>

                <section className="glass-card p-8 rounded-2xl border-slate-800 space-y-6">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="text-amber-500 size-6" />
                    <h3 className="text-xl font-bold text-white">Segurança Global</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-sm text-slate-200">Forçar 2FA para Admins</span>
                        <span className="text-xs text-slate-500">Exige autenticação em duas etapas para acesso ao painel.</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input defaultChecked className="sr-only peer" type="checkbox" />
                        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-sm text-slate-200">Auto-bloqueio de IPs</span>
                        <span className="text-xs text-slate-500">Bloqueia IPs após 5 tentativas falhas de login.</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input defaultChecked className="sr-only peer" type="checkbox" />
                        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                </section>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
