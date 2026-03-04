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
  AlertTriangle,
  CreditCard,
  KeyRound,
  Menu,
  X as CloseIcon
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
  const [dbStats, setDbStats] = useState({
    profilesCount: 0,
    scansCount: 0,
    lastBackup: 'Nunca',
    dbSize: '12.4 MB'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // User Management Modal State
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  // Scan Details Modal State
  const [selectedScan, setSelectedScan] = useState<Scan | null>(null);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  
  // Mobile Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Stripe Modal States
  const [isStripeKeysModalOpen, setIsStripeKeysModalOpen] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [isTransactionsModalOpen, setIsTransactionsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  const [stripeKeys, setStripeKeys] = useState({
    publishableKey: 'pk_test_51Mz...',
    secretKey: 'sk_test_51Mz...',
    webhookSecret: 'whsec_...'
  });

  const [plans, setPlans] = useState([
    { name: 'Plano Gratuito', price: 'R$ 0', id: 'price_free', status: 'Ativo', features: '1 scan/mês, Relatório básico' },
    { name: 'Plano Profissional', price: 'R$ 97/mês', id: 'price_pro_123', status: 'Ativo', features: 'Scans ilimitados, API Access' },
    { name: 'Plano Enterprise', price: 'Sob consulta', id: 'price_ent_456', status: 'Ativo', features: 'Suporte 24/7, Custom Scans' },
  ]);

  const [transactions] = useState([
    { id: 'tx_1', user: 'João Silva', email: 'joao@exemplo.com', amount: 'R$ 97,00', status: 'Pago', date: '2024-03-04 10:30' },
    { id: 'tx_2', user: 'Maria Souza', email: 'maria@empresa.com', amount: 'R$ 97,00', status: 'Pago', date: '2024-03-04 08:15' },
    { id: 'tx_3', user: 'Tech Corp', email: 'admin@techcorp.io', amount: 'R$ 497,00', status: 'Pago', date: '2024-03-03 15:45' },
    { id: 'tx_4', user: 'Pedro Alvares', email: 'pedro@descobre.br', amount: 'R$ 97,00', status: 'Pendente', date: '2024-03-03 12:00' },
    { id: 'tx_5', user: 'Ana Costa', email: 'ana@costa.com', amount: 'R$ 97,00', status: 'Pago', date: '2024-03-02 19:20' },
  ]);

  const [isSaving, setIsSaving] = useState(false);
  const [editFormData, setEditFormData] = useState({
    full_name: '',
    company: '',
    role: '',
    phone: '',
    is_admin: false
  });

  const fetchAllData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Buscamos usuários e scans em paralelo para performance
      const [usersData, scansData] = await Promise.all([
        authService.getAllUsers(),
        scanService.getAllScans()
      ]);
      
      setUsers(usersData || []);
      setScans(scansData || []);
      
      // Atualizamos também os stats do banco
      setDbStats({
        profilesCount: usersData?.length || 0,
        scansCount: scansData?.length || 0,
        lastBackup: 'Hoje, 04:00 AM',
        dbSize: '14.8 MB'
      });
    } catch (err: any) {
      console.error("Erro ao carregar dados do dashboard:", err);
      setError(err.message || "Erro ao carregar dados do sistema.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Opcional: Recarregar dados específicos ao trocar de aba se necessário
  // Mas fetchAllData já cobre tudo inicialmente

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
      <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-4 lg:px-8 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
          >
            {isMobileMenuOpen ? <CloseIcon size={20} /> : <Menu size={20} />}
          </button>
          
          <button 
            onClick={onBack}
            className="hidden sm:block p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="hidden sm:block h-6 w-px bg-slate-800" />
          <div className="flex items-center gap-2">
            <div className="size-8 rounded bg-primary/20 border border-primary/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-xl">admin_panel_settings</span>
            </div>
            <h1 className="font-display font-bold text-sm sm:text-lg tracking-tight">Painel Administrativo</h1>
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

      <div className="flex-1 flex relative">
        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-bg-dark/60 backdrop-blur-sm lg:hidden"
            />
          )}
        </AnimatePresence>

        {/* Admin Sidebar (Responsive) */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-40 w-64 border-r border-slate-800 p-4 bg-slate-950 lg:bg-transparent
          transform transition-transform duration-300 ease-in-out lg:transform-none flex flex-col gap-2
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="flex items-center justify-between lg:hidden mb-6 px-4">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Menu Admin</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-500">
              <CloseIcon size={18} />
            </button>
          </div>
          
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] px-4 mb-2">Gerenciamento</p>
          {[
            { id: 'users', label: 'Usuários', icon: Users },
            { id: 'scans', label: 'Todos os Scans', icon: Activity },
            { id: 'database', label: 'Banco de Dados', icon: Database },
            { id: 'analytics', label: 'Métricas', icon: BarChart },
            { id: 'stripe', label: 'Pagamentos (Stripe)', icon: CreditCard },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileMenuOpen(false);
              }}
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

          <div className="mt-auto pt-6 border-t border-slate-800 lg:hidden">
            <button 
              onClick={onBack}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
            >
              <ArrowLeft size={18} />
              <span className="text-sm font-medium">Sair do Admin</span>
            </button>
          </div>
        </aside>

        {/* Admin Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
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
            <div className={`${(activeTab === 'users' || activeTab === 'scans') ? 'glass rounded-2xl border border-slate-800 overflow-hidden' : ''}`}>
              {(activeTab === 'users' || activeTab === 'scans') && (
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
              )}

              <div className={(activeTab === 'users' || activeTab === 'scans') ? 'overflow-x-auto' : ''}>
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
                        <th className="px-6 py-4 hidden md:table-cell">Empresa / Cargo</th>
                        <th className="px-6 py-4 hidden sm:table-cell">Contato</th>
                        <th className="px-6 py-4">Tipo</th>
                        <th className="px-6 py-4">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="size-10 rounded-full bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center shrink-0">
                                {user.avatar_url ? (
                                  <img src={user.avatar_url} alt={user.full_name} className="size-full object-cover" referrerPolicy="no-referrer" />
                                ) : (
                                  <UserIcon className="size-5 text-slate-500" />
                                )}
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-bold text-white truncate">{user.full_name || 'Sem nome'}</p>
                                <p className="text-[10px] text-slate-500 font-mono">{user.id.substring(0, 8)}...</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 hidden md:table-cell">
                            <div className="flex flex-col">
                              <span className="text-sm text-slate-300 font-medium">{user.company || 'N/A'}</span>
                              <span className="text-xs text-slate-500">{user.role || 'N/A'}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 hidden sm:table-cell">
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
                    {/* ... existing scans table ... */}
                    <thead className="bg-slate-900/50 text-slate-500 text-[10px] uppercase tracking-widest font-bold">
                      <tr>
                        <th className="px-6 py-4">Alvo / URL</th>
                        <th className="px-6 py-4 hidden sm:table-cell">Usuário / Empresa</th>
                        <th className="px-6 py-4">Score</th>
                        <th className="px-6 py-4 hidden md:table-cell">Data</th>
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
                            <div className="flex flex-col min-w-0">
                              <span className="text-sm font-bold text-white truncate max-w-[150px] sm:max-w-[250px] group-hover:text-primary transition-colors">{scan.target_url}</span>
                              <span className="text-[10px] text-slate-500 font-mono">ID: {scan.id.substring(0, 8)}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 hidden sm:table-cell">
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
                          <td className="px-6 py-4 hidden md:table-cell">
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
                ) : activeTab === 'database' ? (
                  <div className="p-8 space-y-8">
                    {/* DB Overview Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col gap-2">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Tamanho Total</span>
                        <div className="flex items-end gap-2">
                          <span className="text-3xl font-black text-white">{dbStats.dbSize}</span>
                          <span className="text-xs text-emerald-500 font-bold mb-1">Normal</span>
                        </div>
                      </div>
                      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col gap-2">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Último Backup</span>
                        <div className="flex items-end gap-2">
                          <span className="text-xl font-bold text-white">{dbStats.lastBackup}</span>
                        </div>
                      </div>
                      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col gap-2">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status Engine</span>
                        <div className="flex items-center gap-2">
                          <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-xl font-bold text-emerald-500">PostgreSQL 15.1</span>
                        </div>
                      </div>
                    </div>

                    {/* Tables Monitor */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                        <Database size={16} className="text-primary" />
                        Monitor de Tabelas (Public Schema)
                      </h3>
                      <div className="grid grid-cols-1 gap-3">
                        {[
                          { name: 'profiles', description: 'Perfis de usuários e metadados', count: dbStats.profilesCount, icon: UserIcon },
                          { name: 'scans', description: 'Histórico de varreduras de segurança', count: dbStats.scansCount, icon: Activity },
                          { name: 'webhooks', description: 'Configurações de integração externa', count: 0, icon: Settings },
                        ].map((table, i) => (
                          <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-primary/30 transition-all group gap-4">
                            <div className="flex items-center gap-4">
                              <div className="size-10 rounded-lg bg-slate-900 flex items-center justify-center text-slate-500 group-hover:text-primary transition-colors shrink-0">
                                <table.icon size={20} />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-bold text-white font-mono truncate">public.{table.name}</p>
                                <p className="text-xs text-slate-500 truncate">{table.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between sm:justify-end gap-6 border-t border-slate-800/50 sm:border-0 pt-3 sm:pt-0">
                              <div className="text-left sm:text-right">
                                <p className="text-lg font-black text-white leading-none">{table.count}</p>
                                <p className="text-[10px] font-bold text-slate-500 uppercase">Registros</p>
                              </div>
                              <button className="p-2 hover:bg-slate-900 rounded-lg text-slate-600 hover:text-white transition-all">
                                <Settings size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Maintenance Tools */}
                    <div className="pt-6 border-t border-slate-800">
                      <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Ferramentas de Manutenção</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <button className="flex items-center gap-3 p-4 rounded-xl border border-slate-800 hover:bg-primary/5 hover:border-primary/30 transition-all text-left group">
                          <div className="size-10 rounded-lg bg-slate-900 flex items-center justify-center text-slate-500 group-hover:text-primary transition-colors">
                            <Save size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">Gerar Backup Full</p>
                            <p className="text-[10px] text-slate-500">Exportar dump .sql do banco</p>
                          </div>
                        </button>
                        <button className="flex items-center gap-3 p-4 rounded-xl border border-slate-800 hover:bg-emerald-500/5 hover:border-emerald-500/30 transition-all text-left group">
                          <div className="size-10 rounded-lg bg-slate-900 flex items-center justify-center text-slate-500 group-hover:text-emerald-500 transition-colors">
                            <Activity size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">Otimizar Índices</p>
                            <p className="text-[10px] text-slate-500">Executar VACUUM ANALYZE</p>
                          </div>
                        </button>
                        <button className="flex items-center gap-3 p-4 rounded-xl border border-slate-800 hover:bg-red-500/5 hover:border-red-500/30 transition-all text-left group">
                          <div className="size-10 rounded-lg bg-slate-900 flex items-center justify-center text-slate-500 group-hover:text-red-500 transition-colors">
                            <Trash2 size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">Limpar Logs Antigos</p>
                            <p className="text-[10px] text-slate-500">Apagar registros {'>'} 90 dias</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : activeTab === 'stripe' ? (
                  <div className="p-8 space-y-8">
                    {/* Stripe Configuration */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2 space-y-6">
                        <div className="glass p-6 rounded-2xl border border-slate-800">
                          <div className="flex items-center gap-3 mb-6">
                            <div className="size-10 rounded-xl bg-[#635bff]/10 flex items-center justify-center text-[#635bff]">
                              <CreditCard size={24} />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-white">Configuração Stripe</h3>
                              <p className="text-xs text-slate-500">Gerencie suas chaves de API e webhooks</p>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Stripe Publishable Key</label>
                              <div className="relative">
                                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 size-4" />
                                <input 
                                  type="password" 
                                  value="pk_test_************************"
                                  readOnly
                                  className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-slate-400 font-mono"
                                />
                              </div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Stripe Secret Key</label>
                              <div className="relative">
                                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 size-4" />
                                <input 
                                  type="password" 
                                  value="sk_test_************************"
                                  readOnly
                                  className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-slate-400 font-mono"
                                />
                              </div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Webhook Secret</label>
                              <div className="relative">
                                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 size-4" />
                                <input 
                                  type="password" 
                                  value="whsec_************************"
                                  readOnly
                                  className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-slate-400 font-mono"
                                />
                              </div>
                            </div>
                            <div className="pt-4">
                              <button 
                                onClick={() => setIsStripeKeysModalOpen(true)}
                                className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold text-xs transition-all"
                              >
                                Atualizar Credenciais
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Subscription Plans Control */}
                        <div className="glass p-6 rounded-2xl border border-slate-800">
                          <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest">Planos de Assinatura</h3>
                          <div className="space-y-3">
                            {plans.map((plan, i) => (
                              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800 gap-4">
                                <div className="flex items-center gap-4">
                                  <div className="size-10 rounded-lg bg-slate-900 flex items-center justify-center text-primary shrink-0">
                                    <Shield size={20} />
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-sm font-bold text-white truncate">{plan.name}</p>
                                    <p className="text-[10px] text-slate-500 font-mono truncate">{plan.id}</p>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between sm:justify-end gap-6 border-t border-slate-800/50 sm:border-0 pt-3 sm:pt-0">
                                  <div className="text-left sm:text-right">
                                    <p className="text-sm font-bold text-white leading-none">{plan.price}</p>
                                    <p className="text-[10px] text-emerald-500 font-bold uppercase">{plan.status}</p>
                                  </div>
                                  <button 
                                    onClick={() => {
                                      setSelectedPlan(plan);
                                      setIsPlanModalOpen(true);
                                    }}
                                    className="text-slate-500 hover:text-white transition-colors"
                                  >
                                    <Settings size={16} />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        {/* Stripe Stats */}
                        <div className="glass p-6 rounded-2xl border border-slate-800">
                          <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest">Resumo Financeiro</h3>
                          <div className="space-y-6">
                            <div>
                              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">MRR (Receita Mensal)</p>
                              <p className="text-2xl font-black text-white">R$ 12.450,00</p>
                              <p className="text-[10px] text-emerald-500 font-bold mt-1">+12% em relação ao mês anterior</p>
                            </div>
                            <div className="h-px bg-slate-800" />
                            <div>
                              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Assinantes Ativos</p>
                              <p className="text-2xl font-black text-white">128</p>
                              <p className="text-[10px] text-blue-400 font-bold mt-1">85% Retenção</p>
                            </div>
                            <div className="h-px bg-slate-800" />
                            <div>
                              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Churn Rate</p>
                              <p className="text-2xl font-black text-white">2.4%</p>
                              <p className="text-[10px] text-emerald-500 font-bold mt-1">Dentro da meta</p>
                            </div>
                          </div>
                        </div>

                        {/* Recent Transactions */}
                        <div className="glass p-6 rounded-2xl border border-slate-800">
                          <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">Transações Recentes</h3>
                          <div className="space-y-3">
                            {transactions.slice(0, 3).map((tx, i) => (
                              <div key={i} className="flex items-center justify-between text-xs">
                                <div className="flex flex-col">
                                  <span className="text-slate-300 font-medium">{tx.user}</span>
                                  <span className="text-[10px] text-slate-500">{tx.date}</span>
                                </div>
                                <span className="text-emerald-400 font-bold">{tx.amount}</span>
                              </div>
                            ))}
                          </div>
                          <button 
                            onClick={() => setIsTransactionsModalOpen(true)}
                            className="w-full mt-4 py-2 text-[10px] font-bold text-slate-500 uppercase hover:text-white transition-colors"
                          >
                            Ver todas as transações
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 space-y-8">
                    {/* ... existing analytics content ... */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Growth Chart */}
                      <div className="glass p-6 rounded-2xl border border-slate-800 min-h-[350px]">
                        <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest">Crescimento (Últimos 7 dias)</h3>
                        <div className="h-64 w-full min-w-0">
                          <ResponsiveContainer width="100%" height="100%" debounce={100}>
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
                      <div className="glass p-6 rounded-2xl border border-slate-800 min-h-[350px]">
                        <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest">Distribuição de Riscos</h3>
                        <div className="flex flex-col sm:flex-row items-center gap-8 min-w-0">
                          <div className="h-64 w-full sm:w-1/2">
                            <ResponsiveContainer width="100%" height="100%" debounce={100}>
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
                          </div>
                          <div className="space-y-3 w-full sm:w-1/2">
                            {getVulnerabilityData().map((item, i) => (
                              <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-slate-950/50 border border-slate-800/50">
                                <div className="size-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.name}</span>
                                <span className="text-sm font-black text-white ml-auto">{item.value}</span>
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
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 gap-4">
                              <div className="flex items-center gap-3 min-w-0 flex-1">
                                <div className="size-8 rounded bg-primary/10 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                                  {i + 1}
                                </div>
                                <span className="text-sm text-slate-300 font-mono truncate">{target.url}</span>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
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
              <div className="p-6 bg-slate-950/50 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
                <button 
                  onClick={handleDeleteUser}
                  disabled={isSaving}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-all text-xs font-bold disabled:opacity-50"
                >
                  <Trash2 size={16} />
                  Excluir Perfil
                </button>
                
                <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
                  <button 
                    onClick={() => setIsEditModalOpen(false)}
                    className="w-full sm:w-auto px-4 py-2 text-slate-400 hover:text-white text-xs font-bold transition-colors"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={handleUpdateUser}
                    disabled={isSaving}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2 bg-primary hover:bg-blue-600 text-white rounded-lg transition-all text-xs font-bold shadow-lg shadow-primary/20 disabled:opacity-50"
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
      {/* Stripe Keys Modal */}
      <AnimatePresence>
        {isStripeKeysModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsStripeKeysModalOpen(false)}
              className="absolute inset-0 bg-bg-dark/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-800 bg-slate-900/50">
                <h3 className="text-lg font-bold text-white">Atualizar Credenciais Stripe</h3>
                <p className="text-xs text-slate-500">Estas chaves são usadas para processar pagamentos reais.</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Publishable Key</label>
                  <input 
                    type="text"
                    value={stripeKeys.publishableKey}
                    onChange={(e) => setStripeKeys({...stripeKeys, publishableKey: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-white focus:border-primary outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Secret Key</label>
                  <input 
                    type="password"
                    value={stripeKeys.secretKey}
                    onChange={(e) => setStripeKeys({...stripeKeys, secretKey: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-white focus:border-primary outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Webhook Secret</label>
                  <input 
                    type="password"
                    value={stripeKeys.webhookSecret}
                    onChange={(e) => setStripeKeys({...stripeKeys, webhookSecret: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-white focus:border-primary outline-none"
                  />
                </div>
              </div>
              <div className="p-6 bg-slate-950/50 border-t border-slate-800 flex justify-end gap-3">
                <button 
                  onClick={() => setIsStripeKeysModalOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white text-xs font-bold transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  onClick={() => {
                    setIsSaving(true);
                    setTimeout(() => {
                      setIsSaving(false);
                      setIsStripeKeysModalOpen(false);
                    }, 1000);
                  }}
                  className="px-6 py-2 bg-primary hover:bg-blue-600 text-white rounded-lg transition-all text-xs font-bold"
                >
                  {isSaving ? <Loader2 size={16} className="animate-spin" /> : 'Salvar Chaves'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Plan Edit Modal */}
      <AnimatePresence>
        {isPlanModalOpen && selectedPlan && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPlanModalOpen(false)}
              className="absolute inset-0 bg-bg-dark/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-800 bg-slate-900/50">
                <h3 className="text-lg font-bold text-white">Editar Plano: {selectedPlan.name}</h3>
                <p className="text-xs text-slate-500">Altere os detalhes do plano no Stripe.</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Nome do Plano</label>
                  <input 
                    type="text"
                    defaultValue={selectedPlan.name}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-white focus:border-primary outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Preço Exibido</label>
                  <input 
                    type="text"
                    defaultValue={selectedPlan.price}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-white focus:border-primary outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Stripe Price ID</label>
                  <input 
                    type="text"
                    defaultValue={selectedPlan.id}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-400 font-mono focus:border-primary outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Recursos (Separados por vírgula)</label>
                  <textarea 
                    defaultValue={selectedPlan.features}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-white focus:border-primary outline-none h-20 resize-none"
                  />
                </div>
              </div>
              <div className="p-6 bg-slate-950/50 border-t border-slate-800 flex justify-end gap-3">
                <button 
                  onClick={() => setIsPlanModalOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white text-xs font-bold transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  onClick={() => {
                    setIsSaving(true);
                    setTimeout(() => {
                      setIsSaving(false);
                      setIsPlanModalOpen(false);
                    }, 1000);
                  }}
                  className="px-6 py-2 bg-primary hover:bg-blue-600 text-white rounded-lg transition-all text-xs font-bold"
                >
                  {isSaving ? <Loader2 size={16} className="animate-spin" /> : 'Salvar Plano'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Transactions Modal */}
      <AnimatePresence>
        {isTransactionsModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTransactionsModalOpen(false)}
              className="absolute inset-0 bg-bg-dark/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-white">Todas as Transações</h3>
                  <p className="text-xs text-slate-500">Histórico completo de pagamentos processados.</p>
                </div>
                <button 
                  onClick={() => setIsTransactionsModalOpen(false)}
                  className="p-2 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800">
                      <th className="pb-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">ID Transação</th>
                      <th className="pb-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Cliente</th>
                      <th className="pb-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Valor</th>
                      <th className="pb-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                      <th className="pb-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx, i) => (
                      <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                        <td className="py-4 text-xs font-mono text-slate-400">{tx.id}</td>
                        <td className="py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-white">{tx.user}</span>
                            <span className="text-[10px] text-slate-500">{tx.email}</span>
                          </div>
                        </td>
                        <td className="py-4 text-sm font-bold text-white">{tx.amount}</td>
                        <td className="py-4">
                          <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                            tx.status === 'Pago' ? 'text-emerald-500 bg-emerald-500/10 border border-emerald-500/20' : 'text-amber-500 bg-amber-500/10 border border-amber-500/20'
                          }`}>
                            {tx.status}
                          </span>
                        </td>
                        <td className="py-4 text-xs text-slate-500">{tx.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-6 bg-slate-950/50 border-t border-slate-800 flex justify-end">
                <button 
                  onClick={() => setIsTransactionsModalOpen(true)}
                  className="flex items-center gap-2 px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all text-xs font-bold"
                >
                  Exportar CSV
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
