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
  ShieldCheck
} from 'lucide-react';
import { motion } from 'motion/react';
import { authService } from '../services/auth';

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
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

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => 
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: 'Total Usuários', value: users.length.toString(), icon: Users, color: 'text-blue-400' },
    { label: 'Admins', value: users.filter(u => u.is_admin).length.toString(), icon: ShieldCheck, color: 'text-emerald-400' },
    { label: 'Alertas Críticos', value: '12', icon: ShieldAlert, color: 'text-red-400' },
    { label: 'Uptime API', value: '99.98%', icon: Server, color: 'text-purple-400' },
  ];

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
                <h2 className="text-xl font-bold font-display">Lista de Usuários</h2>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 size-4" />
                  <input 
                    type="text" 
                    placeholder="Buscar usuário..."
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
                    <p className="text-slate-400">Carregando usuários do Supabase...</p>
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
                ) : (
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
                            <button className="text-primary hover:underline text-xs font-bold">Gerenciar</button>
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
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
