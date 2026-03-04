import React, { useState, useEffect } from 'react';
import { 
  Users, 
  ShieldAlert, 
  Server, 
  Settings, 
  LogOut, 
  BarChart, 
  Search,
  ArrowLeft,
  Activity,
  Database,
  Loader2,
  User as UserIcon,
  Mail,
  Phone,
  ShieldCheck,
  X,
  Trash2,
  Save,
  Shield,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LineChart, 
  Line, 
  BarChart as ReBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { authService } from '../services/auth';
import { scanService, Scan } from '../services/scanService';

interface AdminPageProps {
  onBack: () => void;
}

interface UserProfile {
  id: string;
  full_name: string;
  company: string;
  role: string;
  phone: string;
  is_admin: boolean;
  avatar_url: string | null;
  updated_at: string;
}

export default function AdminPage({ onBack }: AdminPageProps) {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [scans, setScans] = useState<Scan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // User Management Modal State
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  // Scan Details Modal State
  const [selectedScan, setSelectedScan] = useState<Scan | null>(null);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  
  const [isSaving, setIsSaving] = useState(false);
  const [editFormData, setEditFormData] = useState({
    full_name: '',
    company: '',
    role: '',
    phone: '',
    is_admin: false
  });

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await authService.getAllUsers();
      setUsers(data || []);
    } catch (err: any) {
      console.error("Erro ao buscar usuários:", err);
      setError(err.message || "Erro ao carregar lista de usuários.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchScans = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await scanService.getAllScans();
      setScans(data || []);
    } catch (err: any) {
      console.error("Erro ao buscar scans:", err);
      setError(err.message || "Erro ao carregar lista de scans.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'users') {
      fetchUsers();
    } else if (activeTab === 'scans') {
      fetchScans();
    }
  }, [activeTab]);

  const handleManageUser = (user: UserProfile) => {
    setSelectedUser(user);
    setEditFormData({
      full_name: user.full_name || '',
      company: user.company || '',
      role: user.role || '',
      phone: user.phone || '',
      is_admin: user.is_admin || false
    });
    setIsEditModalOpen(true);
  };

  const handleViewScan = (scan: Scan) => {
    setSelectedScan(scan);
    setIsScanModalOpen(true);
  };

  const handleUpdateUser = async () => {
    if (!selectedUser) return;
    
    try {
      setIsSaving(true);
      await authService.updateProfile(selectedUser.id, editFormData);
      
      // Update local state
      setUsers(users.map(u => u.id === selectedUser.id ? { ...u, ...editFormData } : u));
      
      alert('Usuário atualizado com sucesso!');
      setIsEditModalOpen(false);
    } catch (err: any) {
      console.error("Erro ao atualizar usuário:", err);
      alert(`Erro ao atualizar: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    
    if (!confirm(`Tem certeza que deseja excluir o perfil de ${selectedUser.full_name}? Esta ação não pode ser desfeita.`)) {
      return;
    }

    try {
      setIsSaving(true);
      await authService.deleteUser(selectedUser.id);
      
      // Update local state
      setUsers(users.filter(u => u.id !== selectedUser.id));
      
      alert('Usuário excluído com sucesso!');
      setIsEditModalOpen(false);
    } catch (err: any) {
      console.error("Erro ao excluir usuário:", err);
      alert(`Erro ao excluir: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const filteredUsers = users.filter(user => 
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: 'Total Usuários', value: users.length.toString(), icon: Users, color: 'text-blue-400' },
    { label: 'Total Scans', value: scans.length.toString(), icon: Activity, color: 'text-emerald-400' },
    { label: 'Alertas Críticos', value: scans.reduce((acc, s) => acc + (s.vulnerabilities?.filter((v: any) => v.severity === 'ALTA').length || 0), 0).toString(), icon: ShieldAlert, color: 'text-red-400' },
    { label: 'Score Médio', value: scans.length > 0 ? Math.round(scans.reduce((acc, s) => acc + s.score, 0) / scans.length).toString() : '0', icon: Server, color: 'text-purple-400' },
  ];

  // Analytics Data Processing
  const getGrowthData = () => {
    const last7Days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    }).reverse();

    return last7Days.map(date => ({
      name: date,
      usuarios: Math.floor(Math.random() * 5) + 1, // Simulated for now
      scans: Math.floor(Math.random() * 10) + 2
    }));
  };

  const getVulnerabilityData = () => {
    const counts = { ALTA: 0, MÉDIA: 0, BAIXA: 0 };
    scans.forEach(s => {
      s.vulnerabilities?.forEach((v: any) => {
        if (counts[v.severity as keyof typeof counts] !== undefined) {
          counts[v.severity as keyof typeof counts]++;
        }
      });
    });
    return [
      { name: 'Crítica', value: counts.ALTA, color: '#ef4444' },
      { name: 'Média', value: counts.MÉDIA, color: '#f59e0b' },
      { name: 'Baixa', value: counts.BAIXA, color: '#10b981' },
    ];
  };

  const getTopTargets = () => {
    const targets: Record<string, number> = {};
    scans.forEach(s => {
      targets[s.target_url] = (targets[s.target_url] || 0) + 1;
    });
    return Object.entries(targets)
      .map(([url, count]) => ({ url, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };

  return (
    <div className="min-h-screen bg-bg-dark text-slate-100 flex flex-col">
      {/* Admin Header */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="h-6 w-px bg-slate-800" />
          <div className="flex items-center gap-2">
            <div className="size-8 rounded bg-primary/20 border border-primary/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-xl">admin_panel_settings</span>
            </div>
            <h1 className="font-display font-bold text-lg tracking-tight">Painel Administrativo</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Sistema Operacional</span>
          </div>
          <button className="text-slate-400 hover:text-white transition-colors">
            <Settings size={20} />
          </button>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Admin Sidebar */}
        <aside className="w-64 border-r border-slate-800 p-4 hidden lg:flex flex-col gap-2">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] px-4 mb-2">Gerenciamento</p>
          {[
            { id: 'users', label: 'Usuários', icon: Users },
            { id: 'scans', label: 'Todos os Scans', icon: Activity },
            { id: 'database', label: 'Banco de Dados', icon: Database },
            { id: 'analytics', label: 'Métricas', icon: BarChart },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id 
                  ? 'bg-primary/10 text-primary border border-primary/20' 
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100 border border-transparent'
              }`}
            >
              <item.icon size={18} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </aside>

        {/* Admin Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {stats.map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-2xl p-6 border border-slate-800"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-2 rounded-lg bg-slate-800 ${stat.color}`}>
                      <stat.icon size={20} />
                    </div>
                  </div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
                </motion.div>
              ))}
            </div>

            {/* Main Table Area */}
            <div className="glass rounded-2xl border border-slate-800 overflow-hidden">
              <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
                <h2 className="text-xl font-bold font-display">
                  {activeTab === 'users' ? 'Lista de Usuários' : 'Histórico Global de Scans'}
                </h2>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 size-4" />
                  <input 
                    type="text" 
                    placeholder={activeTab === 'users' ? "Buscar usuário..." : "Buscar URL ou empresa..."}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="size-10 text-primary animate-spin" />
                    <p className="text-slate-400">Carregando dados do Supabase...</p>
                  </div>
                ) : error ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <ShieldAlert className="size-10 text-red-500" />
                    <div className="text-center">
                      <p className="text-white font-bold">Erro de Permissão ou Banco</p>
                      <p className="text-slate-500 text-sm max-w-md mt-1">{error}</p>
                      <p className="text-primary text-[10px] mt-4 uppercase font-bold">Dica: Verifique se as políticas RLS no Supabase estão corretas.</p>
                    </div>
                  </div>
                ) : activeTab === 'users' ? (
                  <table className="w-full text-left">
                    <thead className="bg-slate-900/50 text-slate-500 text-[10px] uppercase tracking-widest font-bold">
                      <tr>
                        <th className="px-6 py-4">Usuário</th>
                        <th className="px-6 py-4">Empresa / Cargo</th>
                        <th className="px-6 py-4">Contato</th>
                        <th className="px-6 py-4">Tipo</th>
                        <th className="px-6 py-4">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="size-10 rounded-full bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center">
                                {user.avatar_url ? (
                                  <img src={user.avatar_url} alt={user.full_name} className="size-full object-cover" referrerPolicy="no-referrer" />
                                ) : (
                                  <UserIcon className="size-5 text-slate-500" />
                                )}
                              </div>
                              <div>
                                <p className="text-sm font-bold text-white">{user.full_name || 'Sem nome'}</p>
                                <p className="text-[10px] text-slate-500 font-mono">{user.id.substring(0, 8)}...</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="text-sm text-slate-300 font-medium">{user.company || 'N/A'}</span>
                              <span className="text-xs text-slate-500">{user.role || 'N/A'}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-1">
                              {user.phone && (
                                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                  <Phone size={12} className="text-primary" />
                                  <span>{user.phone}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                <Mail size={12} className="text-slate-500" />
                                <span className="truncate max-w-[150px]">ID: {user.id.substring(0, 12)}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {user.is_admin ? (
                              <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase border border-primary/20">Admin</span>
                            ) : (
                              <span className="px-2 py-1 rounded-full bg-slate-800 text-slate-400 text-[10px] font-bold uppercase border border-slate-700">Membro</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <button 
                              onClick={() => handleManageUser(user)}
                              className="text-primary hover:underline text-xs font-bold"
                            >
                              Gerenciar
                            </button>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={5} className="px-6 py-20 text-center text-slate-500">
                            Nenhum usuário encontrado.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                ) : activeTab === 'scans' ? (
                  <table className="w-full text-left">
                    <thead className="bg-slate-900/50 text-slate-500 text-[10px] uppercase tracking-widest font-bold">
                      <tr>
                        <th className="px-6 py-4">Alvo / URL</th>
                        <th className="px-6 py-4">Usuário / Empresa</th>
                        <th className="px-6 py-4">Score</th>
                        <th className="px-6 py-4">Data</th>
                        <th className="px-6 py-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {scans.filter(s => 
                        s.target_url.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        s.profiles?.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        s.profiles?.company.toLowerCase().includes(searchTerm.toLowerCase())
                      ).length > 0 ? scans.filter(s => 
                        s.target_url.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        s.profiles?.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        s.profiles?.company.toLowerCase().includes(searchTerm.toLowerCase())
                      ).map((scan) => (
                        <tr 
                          key={scan.id} 
                          onClick={() => handleViewScan(scan)}
                          className="hover:bg-white/5 transition-colors cursor-pointer group"
                        >
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-white truncate max-w-[200px] group-hover:text-primary transition-colors">{scan.target_url}</span>
                              <span className="text-[10px] text-slate-500 font-mono">ID: {scan.id.substring(0, 8)}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="text-sm text-slate-300 font-medium">{scan.profiles?.full_name || 'Desconhecido'}</span>
                              <span className="text-xs text-slate-500">{scan.profiles?.company || 'N/A'}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className={`size-8 rounded-lg flex items-center justify-center font-black text-xs ${
                                scan.score >= 80 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                scan.score >= 60 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                'bg-red-500/10 text-red-400 border border-red-500/20'
                              }`}>
                                {scan.score}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs text-slate-400">
                              {new Date(scan.created_at).toLocaleDateString('pt-BR')} {new Date(scan.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase border ${
                              scan.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                              scan.status === 'running' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                              'bg-red-500/10 text-red-400 border-red-500/20'
                            }`}>
                              {scan.status === 'completed' ? 'Concluído' : scan.status === 'running' ? 'Em curso' : 'Falhou'}
                            </span>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={5} className="px-6 py-20 text-center text-slate-500">
                            Nenhum scan encontrado.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-8 space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Growth Chart */}
                      <div className="glass p-6 rounded-2xl border border-slate-800">
                        <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest">Crescimento (Últimos 7 dias)</h3>
                        <div className="h-64 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={getGrowthData()}>
                              <defs>
                                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                              <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                              <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                              <Tooltip 
                                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                                itemStyle={{ fontSize: '12px' }}
                              />
                              <Area type="monotone" dataKey="usuarios" stroke="#3b82f6" fillOpacity={1} fill="url(#colorUsers)" strokeWidth={2} />
                              <Area type="monotone" dataKey="scans" stroke="#10b981" fillOpacity={0} strokeWidth={2} />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Vulnerability Distribution */}
                      <div className="glass p-6 rounded-2xl border border-slate-800">
                        <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest">Distribuição de Riscos</h3>
                        <div className="h-64 w-full flex items-center">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={getVulnerabilityData()}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                              >
                                {getVulnerabilityData().map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip 
                                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                          <div className="space-y-2 pr-8">
                            {getVulnerabilityData().map((item, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <div className="size-2 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-[10px] font-bold text-slate-400 uppercase">{item.name}</span>
                                <span className="text-xs font-bold text-white ml-auto">{item.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Top Targets */}
                      <div className="lg:col-span-2 glass p-6 rounded-2xl border border-slate-800">
                        <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest">Top 5 Alvos Escaneados</h3>
                        <div className="space-y-4">
                          {getTopTargets().map((target, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                              <div className="flex items-center gap-3">
                                <div className="size-8 rounded bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                  {i + 1}
                                </div>
                                <span className="text-sm text-slate-300 font-mono truncate max-w-[300px]">{target.url}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-white">{target.count}</span>
                                <span className="text-[10px] text-slate-500 uppercase">Scans</span>
                              </div>
                            </div>
                          ))}
                          {getTopTargets().length === 0 && (
                            <p className="text-center py-10 text-slate-500 text-sm italic">Nenhum dado de scan disponível ainda.</p>
                          )}
                        </div>
                      </div>

                      {/* System Health */}
                      <div className="glass p-6 rounded-2xl border border-slate-800">
                        <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest">Saúde do Sistema</h3>
                        <div className="space-y-6">
                          <div>
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter mb-2">
                              <span className="text-slate-500">Uptime API</span>
                              <span className="text-emerald-400">99.98%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 w-[99.98%]" />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter mb-2">
                              <span className="text-slate-500">Latência Média</span>
                              <span className="text-blue-400">124ms</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 w-[40%]" />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter mb-2">
                              <span className="text-slate-500">Uso de Storage</span>
                              <span className="text-purple-400">12.4 GB</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-purple-500 w-[65%]" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Edit User Modal */}
      <AnimatePresence>
        {isEditModalOpen && selectedUser && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
              className="absolute inset-0 bg-bg-dark/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <UserIcon className="text-primary size-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Gerenciar Usuário</h3>
                    <p className="text-xs text-slate-500 font-mono">ID: {selectedUser.id}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-500 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nome Completo</label>
                    <input 
                      type="text"
                      value={editFormData.full_name}
                      onChange={(e) => setEditFormData({...editFormData, full_name: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Telefone</label>
                    <input 
                      type="text"
                      value={editFormData.phone}
                      onChange={(e) => setEditFormData({...editFormData, phone: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Empresa</label>
                    <input 
                      type="text"
                      value={editFormData.company}
                      onChange={(e) => setEditFormData({...editFormData, company: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cargo</label>
                    <input 
                      type="text"
                      value={editFormData.role}
                      onChange={(e) => setEditFormData({...editFormData, role: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center gap-3">
                      <Shield className={`size-5 ${editFormData.is_admin ? 'text-primary' : 'text-slate-600'}`} />
                      <div>
                        <p className="text-sm font-bold text-white">Privilégios de Administrador</p>
                        <p className="text-[10px] text-slate-500">Permite acesso total ao painel administrativo</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={editFormData.is_admin}
                        onChange={(e) => setEditFormData({...editFormData, is_admin: e.target.checked})}
                      />
                      <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 bg-slate-950/50 border-t border-slate-800 flex justify-between items-center">
                <button 
                  onClick={handleDeleteUser}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-all text-xs font-bold disabled:opacity-50"
                >
                  <Trash2 size={16} />
                  Excluir Perfil
                </button>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 text-slate-400 hover:text-white text-xs font-bold transition-colors"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={handleUpdateUser}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-2 bg-primary hover:bg-blue-600 text-white rounded-lg transition-all text-xs font-bold shadow-lg shadow-primary/20 disabled:opacity-50"
                  >
                    {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    Salvar Alterações
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Scan Details Modal */}
      <AnimatePresence>
        {isScanModalOpen && selectedScan && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsScanModalOpen(false)}
              className="absolute inset-0 bg-bg-dark/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-800 flex justify-between items-start bg-slate-900/50 sticky top-0 z-10">
                <div className="flex items-center gap-4">
                  <div className={`size-12 rounded-xl flex items-center justify-center font-black text-xl ${
                    selectedScan.score >= 80 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    selectedScan.score >= 60 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                    'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}>
                    {selectedScan.score}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white truncate max-w-[300px]">{selectedScan.target_url}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-500">Usuário: <span className="text-slate-300">{selectedScan.profiles?.full_name || 'Desconhecido'}</span></span>
                      <span className="text-slate-800">•</span>
                      <span className="text-xs text-slate-500">{new Date(selectedScan.created_at).toLocaleString('pt-BR')}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsScanModalOpen(false)}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-500 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <AlertTriangle size={14} className="text-amber-500" />
                    Vulnerabilidades Detectadas ({selectedScan.vulnerabilities?.length || 0})
                  </h4>
                  
                  <div className="space-y-3">
                    {selectedScan.vulnerabilities && selectedScan.vulnerabilities.length > 0 ? (
                      selectedScan.vulnerabilities.map((vuln: any, idx: number) => (
                        <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-bold text-white text-sm">{vuln.title}</h5>
                            <span className={`px-2 py-0.5 rounded text-[8px] font-black border uppercase tracking-wider ${
                              vuln.severity === 'ALTA' ? 'text-red-500 bg-red-500/10 border-red-500/20' :
                              vuln.severity === 'MÉDIA' ? 'text-amber-500 bg-amber-500/10 border-amber-500/20' :
                              'text-green-500 bg-green-500/10 border-green-500/20'
                            }`}>
                              {vuln.severity}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed">{vuln.description}</p>
                          
                          {vuln.remediation && (
                            <div className="mt-3 pt-3 border-t border-slate-800/50">
                              <p className="text-[10px] font-bold text-primary uppercase tracking-tighter mb-1">Recomendação:</p>
                              <p className="text-[10px] text-slate-500 italic">{vuln.remediation}</p>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-10 bg-slate-950 rounded-xl border border-dashed border-slate-800">
                        <ShieldCheck className="mx-auto text-emerald-500 size-8 mb-2 opacity-20" />
                        <p className="text-sm text-slate-500">Nenhuma vulnerabilidade crítica encontrada.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 bg-slate-950/50 border-t border-slate-800 flex justify-end">
                <button 
                  onClick={() => setIsScanModalOpen(false)}
                  className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all text-xs font-bold"
                >
                  Fechar Detalhes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
