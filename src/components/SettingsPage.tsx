import React, { useState } from 'react';
import { 
  Bell, 
  Mail, 
  Smartphone, 
  Github, 
  Database, 
  Webhook, 
  Plus, 
  UserCircle, 
  Shield, 
  Link as LinkIcon,
  MoreVertical,
  Lock,
  User,
  Fingerprint,
  Copy,
  Camera,
  ShieldCheck,
  MonitorSmartphone,
  Laptop,
  QrCode,
  CheckCircle2,
  Circle,
  RefreshCw,
  Verified,
  Code2,
  Edit2,
  Trash2,
  Terminal,
  Slack,
  Eye,
  GitBranch,
  Globe,
  Rocket,
  X,
  ArrowLeft,
  Key
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WebhookData {
  id: string;
  url: string;
  name: string;
  status: 'Ativo' | 'Inativo';
  events: {
    scanCompleted: boolean;
    criticalVuln: boolean;
    scoreChange: boolean;
    suspiciousAccess?: boolean;
    dnsChange?: boolean;
  };
  lastDelivery?: string;
  apiVersion?: string;
  secretKey?: string;
}

interface ApiKeyData {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed: string;
  isVisible: boolean;
}

interface IntegrationData {
  id: string;
  name: string;
  status: string;
  icon: any;
  iconColor: string;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isWebhookModalOpen, setIsWebhookModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingWebhook, setEditingWebhook] = useState<WebhookData | null>(null);
  const [webhookToDelete, setWebhookToDelete] = useState<string | null>(null);
  const [apiKeyToDelete, setApiKeyToDelete] = useState<string | null>(null);
  const [isTestingWebhook, setIsTestingWebhook] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [newApiKeyName, setNewApiKeyName] = useState('');
  const [isIntegrationModalOpen, setIsIntegrationModalOpen] = useState(false);
  const [isEditIntegrationModalOpen, setIsEditIntegrationModalOpen] = useState(false);
  const [editingIntegration, setEditingIntegration] = useState<IntegrationData | null>(null);
  const [integrationToDelete, setIntegrationToDelete] = useState<string | null>(null);
  const [integrationForm, setIntegrationForm] = useState({
    name: '',
    status: 'Conectado',
    type: 'github'
  });

  const [apiKeys, setApiKeys] = useState<ApiKeyData[]>([
    {
      id: 'ak_1',
      name: 'Produção Principal',
      key: 'ab_live_51MvYI7L2p3n4m5k6j7h8g9f0e1d2c3b4a5z6x7c8v9b0n1m2',
      createdAt: '12 dias atrás',
      lastUsed: 'Há 2 horas',
      isVisible: false
    }
  ]);

  const [integrations, setIntegrations] = useState<IntegrationData[]>([
    { id: 'int_1', name: 'GitHub', status: 'Conectado', icon: Github, iconColor: 'text-white' },
    { id: 'int_2', name: 'Redis Cache', status: 'Online', icon: Database, iconColor: 'text-red-500' },
    { id: 'int_3', name: 'Webhooks', status: '2 Endpoints ativos', icon: Webhook, iconColor: 'text-yellow-500' }
  ]);
  const [webhooks, setWebhooks] = useState<WebhookData[]>([
    {
      id: 'wh_8472910',
      url: 'https://api.empresa.com.br/hooks/security',
      name: 'Produção API',
      status: 'Ativo',
      events: { scanCompleted: true, criticalVuln: true, scoreChange: false },
      lastDelivery: 'Hoje, 14:32',
      apiVersion: '2023-11-01',
      secretKey: 'whsec_28391048572910384756'
    },
    {
      id: 'wh_1038472',
      url: 'https://slack.com/services/B029...',
      name: 'Slack Alertas',
      status: 'Inativo',
      events: { scanCompleted: false, criticalVuln: false, scoreChange: true },
      lastDelivery: 'Ontem, 09:15',
      apiVersion: '2023-11-01',
      secretKey: 'whsec_99182736455463728190'
    }
  ]);

  const [webhookForm, setWebhookForm] = useState({
    url: 'https://api.empresa.com.br/v1/security-callback',
    name: '',
    events: {
      scanCompleted: true,
      criticalVuln: true,
      scoreChange: false,
      suspiciousAccess: false,
      dnsChange: false
    }
  });

  const handleTestWebhook = () => {
    setIsTestingWebhook(true);
    setTestResult(null);
    setTimeout(() => {
      setIsTestingWebhook(false);
      setTestResult('success');
    }, 2000);
  };

  const handleSaveWebhook = () => {
    const newWebhook: WebhookData = {
      id: `wh_${Math.floor(Math.random() * 10000000)}`,
      url: webhookForm.url,
      name: webhookForm.name || 'Novo Webhook',
      status: 'Ativo',
      events: { ...webhookForm.events },
      lastDelivery: 'Nunca',
      apiVersion: '2023-11-01',
      secretKey: `whsec_${Math.random().toString(36).substring(2, 15)}`
    };
    setWebhooks([newWebhook, ...webhooks]);
    alert('Webhook configurado com sucesso!');
    setIsWebhookModalOpen(false);
    setWebhookForm({
      url: 'https://api.empresa.com.br/v1/security-callback',
      name: '',
      events: { 
        scanCompleted: true, 
        criticalVuln: true, 
        scoreChange: false,
        suspiciousAccess: false,
        dnsChange: false
      }
    });
  };

  const handleEditWebhook = (webhook: WebhookData) => {
    setEditingWebhook({ ...webhook });
    setIsEditModalOpen(true);
  };

  const handleUpdateWebhook = () => {
    if (!editingWebhook) return;
    setWebhooks(webhooks.map(w => w.id === editingWebhook.id ? editingWebhook : w));
    alert('Webhook atualizado com sucesso!');
    setIsEditModalOpen(false);
  };

  const handleDeleteWebhook = (id: string) => {
    setWebhookToDelete(id);
  };

  const confirmDelete = () => {
    if (webhookToDelete) {
      setWebhooks(webhooks.filter(w => w.id !== webhookToDelete));
      setWebhookToDelete(null);
      setIsEditModalOpen(false);
      alert('Webhook excluído com sucesso!');
    }
  };

  const handleCreateApiKey = () => {
    if (apiKeys.length >= 3) {
      alert('Limite de chaves atingido para o seu plano (Máx: 3).');
      return;
    }
    const newKey: ApiKeyData = {
      id: `ak_${Date.now()}`,
      name: newApiKeyName || 'Nova Chave API',
      key: `ab_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      createdAt: 'Agora',
      lastUsed: 'Nunca',
      isVisible: false
    };
    setApiKeys([...apiKeys, newKey]);
    setIsApiKeyModalOpen(false);
    setNewApiKeyName('');
    alert('Chave API gerada com sucesso!');
  };

  const toggleApiKeyVisibility = (id: string) => {
    setApiKeys(apiKeys.map(k => k.id === id ? { ...k, isVisible: !k.isVisible } : k));
  };

  const handleDeleteApiKey = (id: string) => {
    setApiKeyToDelete(id);
  };

  const confirmDeleteApiKey = () => {
    if (apiKeyToDelete) {
      setApiKeys(apiKeys.filter(k => k.id !== apiKeyToDelete));
      setApiKeyToDelete(null);
      alert('Chave API excluída com sucesso!');
    }
  };

  const handleRotateApiKey = (id: string) => {
    if (confirm('Deseja rotacionar esta chave? A chave antiga deixará de funcionar imediatamente.')) {
      setApiKeys(apiKeys.map(k => k.id === id ? {
        ...k,
        key: `ab_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
        createdAt: 'Agora'
      } : k));
      alert('Chave rotacionada com sucesso!');
    }
  };

  const handleSaveIntegration = () => {
    const iconMap: any = {
      github: Github,
      database: Database,
      webhook: Webhook,
      slack: Slack,
      terminal: Terminal
    };
    const colorMap: any = {
      github: 'text-white',
      database: 'text-red-500',
      webhook: 'text-yellow-500',
      slack: 'text-purple-400',
      terminal: 'text-primary'
    };

    const newIntegration: IntegrationData = {
      id: `int_${Date.now()}`,
      name: integrationForm.name || 'Nova Integração',
      status: integrationForm.status,
      icon: iconMap[integrationForm.type] || Github,
      iconColor: colorMap[integrationForm.type] || 'text-white'
    };

    setIntegrations([...integrations, newIntegration]);
    setIsIntegrationModalOpen(false);
    setIntegrationForm({ name: '', status: 'Conectado', type: 'github' });
    alert('Integração adicionada com sucesso!');
  };

  const handleEditIntegration = (integration: IntegrationData) => {
    setEditingIntegration({ ...integration });
    setIsEditIntegrationModalOpen(true);
  };

  const handleUpdateIntegration = () => {
    if (!editingIntegration) return;
    setIntegrations(integrations.map(i => i.id === editingIntegration.id ? editingIntegration : i));
    setIsEditIntegrationModalOpen(false);
    alert('Integração atualizada!');
  };

  const handleDeleteIntegration = (id: string) => {
    setIntegrationToDelete(id);
  };

  const confirmDeleteIntegration = () => {
    if (integrationToDelete) {
      setIntegrations(integrations.filter(i => i.id !== integrationToDelete));
      setIntegrationToDelete(null);
      setIsEditIntegrationModalOpen(false);
      alert('Integração removida!');
    }
  };

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: UserCircle },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'security', label: 'Segurança', icon: Shield },
    { id: 'integrations', label: 'Integrações', icon: LinkIcon },
  ];

  return (
    <div className={`flex-1 flex flex-col h-full overflow-y-auto relative font-space ${activeTab === 'integrations' ? 'digital-grid' : ''}`}>
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="mx-auto w-full max-w-[1024px] px-8 py-10 flex flex-col gap-8 z-10">
        {/* Header Section */}
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-black text-white tracking-tight">Configurações do Sistema</h1>
          <p className="text-slate-400 text-lg font-light">Gerencie suas preferências de conta, perfil e configurações de segurança.</p>
        </div>

        {/* Tabs */}
        <div className="w-full border-b border-border-dark">
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 text-sm font-bold transition-colors border-b-2 cursor-pointer relative ${
                  activeTab === tab.id 
                    ? 'text-white border-primary' 
                    : 'text-slate-400 border-transparent hover:text-slate-200 hover:border-slate-600'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-primary shadow-[0_0_8px_rgba(19,91,236,0.8)]"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Settings */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {activeTab === 'profile' && (
              <>
                {/* Personal Info Section */}
                <section className="rounded-2xl border border-border-dark bg-surface-dark-alt/40 backdrop-blur-md p-8 shadow-xl">
                  <div className="flex items-center gap-3 mb-8">
                    <User className="text-primary size-6" />
                    <h2 className="text-xl font-bold text-white">Informações Pessoais</h2>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-12">
                    <div className="flex flex-col items-center gap-4 shrink-0">
                      <div className="relative group">
                        <div className="h-32 w-32 rounded-full border-2 border-dashed border-primary/30 p-1">
                          <div className="h-full w-full rounded-full overflow-hidden bg-slate-800">
                            <img 
                              alt="Foto de Perfil" 
                              className="h-full w-full object-cover" 
                              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7kCkveSbGXPSQBtyFqjcZK8rSoy2rd610ur-hzNaR3gibnnl0ILaKi0GrMnZhtfZfAZaIU69WDWLiOIzD8vuiDQ7M3KwLv4tsytlSM6BQuDzc698-ZirX9xKjoDQc4f6qZRhcF2xQybWuO52t_jH7mFFKKDabEvdVD29_6KWCXVTCxqffvK3kvtURU1ojP20oBNKY2L0zft35Lj82ZhwHwEa1-SoTqydlyaqLC-U3SAAkNJsi2ORgkGl-ojyyz757IN0dIA86bOg"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                          <Camera className="text-white size-8" />
                        </div>
                      </div>
                      <button className="text-xs font-bold text-primary uppercase tracking-widest hover:text-blue-400 transition-colors cursor-pointer">
                        Mudar Foto
                      </button>
                    </div>

                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider" htmlFor="full_name">Nome Completo</label>
                        <input 
                          className="w-full p-3 bg-bg-dark/50 border border-border-dark rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all" 
                          id="full_name" 
                          type="text" 
                          defaultValue="Carlos Silva"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider" htmlFor="work_email">E-mail Profissional</label>
                        <input 
                          className="w-full p-3 bg-bg-dark/50 border border-border-dark rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all" 
                          id="work_email" 
                          type="email" 
                          defaultValue="carlos@authbrasil.com"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider" htmlFor="company">Empresa</label>
                        <input 
                          className="w-full p-3 bg-bg-dark/50 border border-border-dark rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all" 
                          id="company" 
                          type="text" 
                          defaultValue="AuthBrasil Security"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider" htmlFor="role">Cargo</label>
                        <input 
                          className="w-full p-3 bg-bg-dark/50 border border-border-dark rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all" 
                          id="role" 
                          type="text" 
                          defaultValue="Security Engineer"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Account Data Section */}
                <section className="rounded-2xl border border-border-dark bg-surface-dark-alt/40 backdrop-blur-md p-8 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Fingerprint className="text-primary size-6" />
                      <div className="flex flex-col">
                        <h2 className="text-lg font-bold text-white">Dados da Conta</h2>
                        <p className="text-sm text-slate-400">Informações de identificação única do seu perfil.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 bg-bg-dark border border-border-dark rounded-xl px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Account ID</span>
                        <span className="text-sm font-mono text-slate-200">AB-8829-••••-4921</span>
                      </div>
                      <div className="h-8 w-px bg-border-dark mx-2"></div>
                      <button className="flex items-center gap-2 text-primary hover:text-blue-400 transition-colors text-sm font-bold cursor-pointer">
                        <Copy className="size-4" />
                        Copiar ID
                      </button>
                    </div>
                  </div>
                </section>

                <div className="flex justify-end pt-4">
                  <button className="bg-primary hover:bg-blue-600 text-white font-bold py-3 px-10 rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(19,91,236,0.6)] hover:shadow-[0_0_25px_-3px_rgba(19,91,236,0.8)] active:scale-95 cursor-pointer">
                    Salvar Alterações
                  </button>
                </div>
              </>
            )}

            {activeTab === 'notifications' && (
              <>
                {/* Email Alerts Section */}
                <section className="rounded-2xl border border-border-dark bg-surface-dark-alt/50 backdrop-blur-sm p-6 shadow-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <Bell className="text-primary size-6" />
                    <h2 className="text-xl font-bold text-white">Alertas por E-mail</h2>
                  </div>
                  
                  <div className="space-y-1">
                    {/* Toggle Item 1 */}
                    <div className="flex items-center justify-between py-4 border-b border-border-dark last:border-0">
                      <div className="flex flex-col pr-4">
                        <p className="text-base font-medium text-slate-200">Scan de Vulnerabilidade Concluído</p>
                        <p className="text-sm text-slate-400 mt-1">Receba um relatório resumido assim que a análise terminar.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input defaultChecked className="sr-only peer" type="checkbox" />
                        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-[0_0_10px_rgba(19,91,236,0.5)_inset]"></div>
                      </label>
                    </div>

                    {/* Toggle Item 2 */}
                    <div className="flex items-center justify-between py-4 border-b border-border-dark last:border-0">
                      <div className="flex flex-col pr-4">
                        <p className="text-base font-medium text-slate-200">Queda de Score de Segurança</p>
                        <p className="text-sm text-slate-400 mt-1">Alerta imediato se o score do projeto cair abaixo de 70.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input defaultChecked className="sr-only peer" type="checkbox" />
                        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-[0_0_10px_rgba(19,91,236,0.5)_inset]"></div>
                      </label>
                    </div>

                    {/* Toggle Item 3 */}
                    <div className="flex items-center justify-between py-4 border-b border-border-dark last:border-0">
                      <div className="flex flex-col pr-4">
                        <p className="text-base font-medium text-slate-200">Novas vulnerabilidades críticas</p>
                        <p className="text-sm text-slate-400 mt-1">Notificação push para CVEs de alta prioridade.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input className="sr-only peer" type="checkbox" />
                        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-[0_0_10px_rgba(19,91,236,0.5)_inset]"></div>
                      </label>
                    </div>
                  </div>
                </section>

                {/* Contact Info Section */}
                <section className="rounded-2xl border border-border-dark bg-surface-dark-alt/50 backdrop-blur-sm p-6 shadow-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <Mail className="text-primary size-6" />
                    <h2 className="text-xl font-bold text-white">Canais de Notificação</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-slate-300" htmlFor="email_alert">E-mail Principal</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500 group-focus-within:text-primary transition-colors">
                          <Mail className="size-5" />
                        </div>
                        <input 
                          className="block w-full pl-10 p-3 bg-bg-dark border border-border-dark rounded-lg text-slate-100 focus:ring-2 focus:ring-primary focus:border-primary placeholder-slate-600 transition-all outline-none" 
                          id="email_alert" 
                          placeholder="seu@email.com" 
                          type="email" 
                          defaultValue="carlos@authbrasil.com"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-slate-300" htmlFor="phone_alert">SMS / WhatsApp</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500 group-focus-within:text-primary transition-colors">
                          <Smartphone className="size-5" />
                        </div>
                        <input 
                          className="block w-full pl-10 p-3 bg-bg-dark border border-border-dark rounded-lg text-slate-100 focus:ring-2 focus:ring-primary focus:border-primary placeholder-slate-600 transition-all outline-none" 
                          id="phone_alert" 
                          placeholder="+55 (11) 99999-9999" 
                          type="tel"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <button className="bg-primary hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors shadow-[0_0_15px_-3px_rgba(19,91,236,0.6)] cursor-pointer">
                      Salvar Alterações
                    </button>
                  </div>
                </section>
              </>
            )}

            {activeTab === 'security' && (
              <div className="flex flex-col gap-8">
                {/* Change Password Section */}
                <section className="rounded-2xl border border-border-dark bg-surface-dark-alt/40 backdrop-blur-md p-8 shadow-xl">
                  <div className="flex items-center gap-3 mb-8">
                    <RefreshCw className="text-primary size-6" />
                    <h2 className="text-xl font-bold text-white">Alterar Senha</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]" htmlFor="current_password">Senha Atual</label>
                        <input className="w-full p-3 bg-bg-dark/50 border border-border-dark rounded-lg text-slate-100 placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-primary transition-all" id="current_password" placeholder="••••••••••••" type="password"/>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]" htmlFor="new_password">Nova Senha</label>
                        <input className="w-full p-3 bg-bg-dark/50 border border-border-dark rounded-lg text-slate-100 placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-primary transition-all" id="new_password" placeholder="••••••••••••" type="password"/>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]" htmlFor="confirm_password">Confirmar Nova Senha</label>
                        <input className="w-full p-3 bg-bg-dark/50 border border-border-dark rounded-lg text-slate-100 placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-primary transition-all" id="confirm_password" placeholder="••••••••••••" type="password"/>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center gap-6 p-6 rounded-xl bg-bg-dark/30 border border-white/5">
                      <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-slate-400">Força da Senha</span>
                          <span className="text-xs font-bold text-success-neon">Forte</span>
                        </div>
                        <div className="neon-bar">
                          <div className="neon-bar-inner w-3/4"></div>
                        </div>
                      </div>
                      <ul className="flex flex-col gap-3">
                        <li className="flex items-center gap-2 text-xs text-success-neon">
                          <CheckCircle2 className="size-4" />
                          Mínimo de 12 caracteres
                        </li>
                        <li className="flex items-center gap-2 text-xs text-success-neon">
                          <CheckCircle2 className="size-4" />
                          Símbolos e números inclusos
                        </li>
                        <li className="flex items-center gap-2 text-xs text-slate-500">
                          <Circle className="size-4" />
                          Mistura de maiúsculas/minúsculas
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* 2FA Section */}
                <section className="rounded-2xl border border-border-dark bg-surface-dark-alt/40 backdrop-blur-md p-8 shadow-xl">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="text-primary size-6" />
                      <div className="flex flex-col">
                        <h2 className="text-xl font-bold text-white">Autenticação em Duas Etapas (2FA)</h2>
                        <p className="text-sm text-slate-400">Adicione uma camada extra de segurança à sua conta.</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input defaultChecked className="sr-only peer" type="checkbox" />
                      <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-lg shadow-primary/20"></div>
                    </label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-bg-dark/40 rounded-xl p-6 border border-white/5">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-40 h-40 bg-white p-3 rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                        <div className="w-full h-full bg-slate-100 flex items-center justify-center border-2 border-dashed border-slate-300">
                          <QrCode className="size-10 text-slate-400" />
                        </div>
                      </div>
                      <p className="text-xs text-center text-slate-400 px-4">Escaneie o código acima com seu aplicativo autenticador (Google Authenticator, Authy, etc).</p>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest" htmlFor="2fa_code">Código de Verificação</label>
                        <input className="w-full p-4 bg-bg-dark/80 border border-border-dark rounded-lg text-slate-100 text-center text-2xl font-mono tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-primary transition-all" id="2fa_code" maxLength={6} placeholder="000000" type="text"/>
                      </div>
                      <p className="text-xs text-slate-500 italic">Insira o código de 6 dígitos gerado pelo seu aplicativo para confirmar a ativação.</p>
                    </div>
                  </div>
                </section>

                {/* Active Sessions Section */}
                <section className="rounded-2xl border border-border-dark bg-surface-dark-alt/40 backdrop-blur-md p-8 shadow-xl">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <MonitorSmartphone className="text-primary size-6" />
                      <div className="flex flex-col">
                        <h2 className="text-xl font-bold text-white">Sessões Ativas</h2>
                        <p className="text-sm text-slate-400">Monitore os dispositivos que acessaram sua conta recentemente.</p>
                      </div>
                    </div>
                    <button className="text-xs font-bold text-status-danger hover:text-red-400 transition-colors uppercase tracking-widest border border-status-danger/20 px-4 py-2 rounded-lg hover:bg-status-danger/5 cursor-pointer">
                      Encerrar todas as sessões
                    </button>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-bg-dark/30 border border-white/5 hover:border-primary/30 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <Laptop className="size-5" />
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white">MacBook Pro - Chrome (v121.0)</span>
                            <span className="px-2 py-0.5 rounded-full bg-success-neon/10 text-[10px] font-bold text-success-neon uppercase tracking-tighter">Sessão Atual</span>
                          </div>
                          <span className="text-xs text-slate-500">São Paulo, Brasil • IP: 187.32.12.94</span>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-slate-500 italic">Ativo agora</span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-bg-dark/30 border border-white/5 hover:border-primary/30 transition-all group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
                          <Smartphone className="size-5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-white">iPhone 15 Pro - Safari Mobile</span>
                          <span className="text-xs text-slate-500">São Paulo, Brasil • IP: 187.32.12.94</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-medium text-slate-500">Há 2 horas</span>
                        <button className="p-2 text-slate-500 hover:text-status-danger opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
                          <MoreVertical className="size-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                <div className="flex justify-end pt-4 gap-4">
                  <button className="bg-primary hover:bg-blue-600 text-white font-bold py-3 px-12 rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(19,91,236,0.6)] hover:shadow-[0_0_25px_-3px_rgba(19,91,236,0.8)] active:scale-95 flex items-center gap-2 cursor-pointer">
                    <Verified className="size-5" />
                    Atualizar Segurança
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'integrations' && (
              <div className="flex flex-col gap-8 lg:col-span-3">
                {/* Repositories Section */}
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <Code2 className="text-primary size-6" />
                    <h2 className="text-xl font-bold text-white">Repositórios e Código</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 glass-panel neon-border rounded-2xl p-6 flex flex-col justify-between group hover:bg-surface-dark/60 transition-all">
                      <div className="flex justify-between items-start mb-8">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center">
                            <Github className="w-10 h-10 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white">GitHub</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="w-2 h-2 rounded-full bg-slate-600"></span>
                              <span className="text-sm text-slate-400">Desconectado</span>
                            </div>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full border border-primary/20 uppercase">Recomendado</span>
                      </div>
                      <div className="flex flex-col gap-4">
                        <p className="text-sm text-slate-400 leading-relaxed">Sincronize seus repositórios para análise automática de vulnerabilidades em cada commit e Pull Request.</p>
                        <button className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer">
                          <LinkIcon className="size-5" />
                          Conectar GitHub
                        </button>
                      </div>
                    </div>
                    <div className="glass-panel border-dashed border-slate-700 rounded-2xl p-6 flex flex-col opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all group">
                      <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                        <GitBranch className="size-8 text-orange-500" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">GitLab</h3>
                      <p className="text-xs text-slate-500 mb-6">Em breve: Integração nativa com GitLab CI/CD e repositórios self-hosted.</p>
                      <span className="mt-auto text-[10px] font-bold text-slate-600 uppercase tracking-widest text-center border border-slate-800 py-2 rounded-lg">Indisponível</span>
                    </div>
                  </div>
                </section>

                {/* Webhooks Section */}
                <section className="glass-panel rounded-2xl p-8 shadow-2xl">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div className="flex items-center gap-3">
                      <Webhook className="text-primary size-6" />
                      <div className="flex flex-col">
                        <h2 className="text-xl font-bold text-white">Notificações e Webhooks</h2>
                        <p className="text-sm text-slate-400">Receba alertas em tempo real em seus sistemas externos.</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsWebhookModalOpen(true)}
                      className="bg-primary/20 hover:bg-primary/30 text-primary font-bold py-2.5 px-6 rounded-xl border border-primary/30 transition-all flex items-center gap-2 text-sm cursor-pointer"
                    >
                      <Plus className="size-5" />
                      Adicionar Webhook
                    </button>
                  </div>
                  <div className="overflow-x-auto border border-white/5 rounded-xl bg-bg-dark/30">
                    <table className="w-full text-left min-w-[600px]">
                      <thead className="bg-surface-dark/60 text-slate-500 text-[10px] uppercase tracking-[0.2em] font-bold">
                        <tr>
                          <th className="px-6 py-4">URL do Endpoint</th>
                          <th className="px-6 py-4">Eventos</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4 text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {webhooks.map((webhook) => (
                          <tr key={webhook.id} className="hover:bg-white/5 transition-colors group">
                            <td className="px-6 py-4">
                              <div className="flex flex-col">
                                <span className="text-sm font-medium text-slate-200 truncate max-w-[200px]">{webhook.url}</span>
                                <span className="text-[10px] text-slate-500">ID: {webhook.id}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-wrap gap-2">
                                {webhook.events.scanCompleted && (
                                  <span className="px-2 py-0.5 bg-success-neon/10 text-success-neon text-[10px] font-bold rounded border border-success-neon/20">Scan Concluído</span>
                                )}
                                {webhook.events.criticalVuln && (
                                  <span className="px-2 py-0.5 bg-status-danger/10 text-status-danger text-[10px] font-bold rounded border border-status-danger/20">Vulnerabilidade Crítica</span>
                                )}
                                {webhook.events.scoreChange && (
                                  <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded border border-primary/20">Mudança no Score</span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`flex items-center gap-1.5 text-xs ${webhook.status === 'Ativo' ? 'text-success-neon' : 'text-slate-500'}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${webhook.status === 'Ativo' ? 'bg-success-neon' : 'bg-slate-500'}`}></span> {webhook.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                  onClick={() => handleEditWebhook(webhook)}
                                  className="p-1.5 text-slate-400 hover:text-white cursor-pointer"
                                >
                                  <Edit2 className="size-4" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteWebhook(webhook.id)}
                                  className="p-1.5 text-slate-400 hover:text-red-500 cursor-pointer"
                                >
                                  <Trash2 className="size-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Developer Tools Section */}
                <section className="glass-panel rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                  <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/10 blur-[50px] rounded-full"></div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div className="flex items-center gap-3">
                      <Terminal className="text-primary size-6" />
                      <div className="flex flex-col">
                        <h2 className="text-xl font-bold text-white">Ferramentas de Desenvolvedor</h2>
                        <p className="text-sm text-slate-400">Gerencie suas chaves de API para integrações customizadas.</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsApiKeyModalOpen(true)}
                      className="bg-primary/20 hover:bg-primary/30 text-primary font-bold py-2.5 px-6 rounded-xl border border-primary/30 transition-all flex items-center gap-2 text-sm cursor-pointer"
                    >
                      <Plus className="size-5" />
                      Criar Nova Chave
                    </button>
                  </div>

                  <div className="flex flex-col gap-6">
                    {apiKeys.map((apiKey) => (
                      <div key={apiKey.id} className="bg-bg-dark/60 border border-white/5 rounded-xl p-6 group hover:border-primary/30 transition-all">
                        <div className="flex flex-col gap-6">
                          <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{apiKey.name}</label>
                              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                  onClick={() => handleDeleteApiKey(apiKey.id)}
                                  className="p-1 text-slate-500 hover:text-red-500 transition-colors cursor-pointer"
                                  title="Excluir Chave"
                                >
                                  <Trash2 className="size-4" />
                                </button>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <div className="relative flex-1">
                                <input 
                                  className="w-full p-3 bg-black/40 border border-border-dark rounded-lg text-slate-300 font-mono text-sm tracking-widest pr-12 focus:outline-none" 
                                  readOnly 
                                  type={apiKey.isVisible ? "text" : "password"} 
                                  value={apiKey.key}
                                />
                                <button 
                                  onClick={() => toggleApiKeyVisibility(apiKey.id)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white cursor-pointer"
                                >
                                  {apiKey.isVisible ? <X className="size-5" /> : <Eye className="size-5" />}
                                </button>
                              </div>
                              <button 
                                onClick={() => {
                                  navigator.clipboard.writeText(apiKey.key);
                                  alert('Chave API copiada!');
                                }}
                                className="bg-surface-dark border border-border-dark hover:border-primary/50 text-white px-4 rounded-lg flex items-center justify-center transition-all group cursor-pointer"
                              >
                                <Copy className="size-5 group-active:scale-90 transition-transform" />
                              </button>
                            </div>
                          </div>
                          <div className="flex justify-between items-center pt-4 border-t border-white/5">
                            <div className="flex flex-col">
                              <span className="text-xs text-slate-400">Criada: <strong className="text-slate-300">{apiKey.createdAt}</strong></span>
                              <span className="text-xs text-slate-400">Último uso: <strong className="text-slate-300">{apiKey.lastUsed}</strong></span>
                            </div>
                            <button 
                              onClick={() => handleRotateApiKey(apiKey.id)}
                              className="text-xs font-bold text-primary hover:text-blue-400 transition-colors uppercase tracking-widest flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/5 border border-primary/20 cursor-pointer"
                            >
                              <RefreshCw className="size-4" />
                              Rotacionar
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {apiKeys.length === 0 && (
                      <div className="text-center py-12 border-2 border-dashed border-white/5 rounded-xl">
                        <p className="text-slate-500 text-sm">Nenhuma chave API gerada ainda.</p>
                      </div>
                    )}

                    <div className="flex items-center gap-2 p-4 bg-primary/5 rounded-xl border border-primary/10">
                      <Shield className="size-4 text-primary shrink-0" />
                      <p className="text-[10px] text-slate-400 italic">
                        Aviso: Suas chaves de API concedem acesso total à sua conta. Nunca as compartilhe ou as inclua em código client-side.
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activeTab !== 'profile' && activeTab !== 'notifications' && activeTab !== 'security' && activeTab !== 'integrations' && (
              <div className="flex items-center justify-center h-64 glass-card rounded-2xl border border-border-dark text-slate-500">
                Configurações de {tabs.find(t => t.id === activeTab)?.label} em desenvolvimento.
              </div>
            )}
          </div>

          {/* Right Column: Integrations & Status */}
          <div className="lg:col-span-1 flex flex-col gap-8">
            {/* Integrations Card - Only visible in Integrations Tab */}
            {activeTab === 'integrations' && (
              <div className={`rounded-2xl border border-border-dark bg-surface-dark-alt/50 p-6 flex flex-col gap-4 transition-all duration-300 ${activeTab === 'integrations' ? 'lg:mt-14' : ''}`}>
                <h3 className="text-lg font-bold text-white mb-2">Integrações Ativas</h3>
                
                {integrations.map((integration) => (
                  <div key={integration.id} className="flex items-center justify-between p-3 rounded-xl bg-bg-dark border border-border-dark hover:border-slate-600 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white/5">
                        <integration.icon className={`size-6 ${integration.iconColor}`} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{integration.name}</p>
                        <p className="text-xs text-green-400 flex items-center gap-1">
                          <span className={`w-1.5 h-1.5 rounded-full ${integration.status.toLowerCase().includes('conectado') || integration.status.toLowerCase().includes('online') ? 'bg-green-400' : 'bg-slate-500'}`}></span> {integration.status}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEditIntegration(integration)}
                        className="p-1.5 text-slate-500 hover:text-white transition-colors cursor-pointer"
                      >
                        <Edit2 className="size-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteIntegration(integration.id)}
                        className="p-1.5 text-slate-500 hover:text-red-500 transition-colors cursor-pointer"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {integrations.length === 0 && (
                  <div className="text-center py-6 border border-dashed border-white/5 rounded-xl">
                    <p className="text-slate-500 text-xs">Nenhuma integração ativa.</p>
                  </div>
                )}

                <button 
                  onClick={() => setIsIntegrationModalOpen(true)}
                  className="w-full mt-2 py-2 border border-dashed border-slate-600 text-slate-400 hover:text-white hover:border-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus className="size-4" /> Adicionar Integração
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Webhook Modal */}
      <AnimatePresence>
        {isWebhookModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background-dark/80 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0f172a]/80 border border-white/10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full max-w-2xl rounded-3xl overflow-hidden flex flex-col"
            >
              <div className="px-8 py-6 border-b border-white/10 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <LinkIcon className="size-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Configurar Novo Webhook</h2>
                    <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">Automação Externa</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsWebhookModalOpen(false)}
                  className="text-slate-500 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="size-6" />
                </button>
              </div>

              <div className="p-8 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">URL do Endpoint</label>
                  <div className="relative group">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors size-5" />
                    <input 
                      className="w-full bg-black/40 border border-border-dark rounded-xl py-4 pl-12 pr-4 text-slate-200 placeholder:text-slate-600 transition-all focus:border-primary/60 focus:ring-primary/20 outline-none" 
                      placeholder="https://seu-sistema.com.br/webhook" 
                      type="text" 
                      value={webhookForm.url}
                      onChange={(e) => setWebhookForm({...webhookForm, url: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Nome do Webhook</label>
                  <input 
                    className="w-full bg-black/40 border border-border-dark rounded-xl py-3 px-4 text-slate-200 placeholder:text-slate-600 transition-all focus:border-primary/60 outline-none" 
                    placeholder="Ex: Produção Slack Alertas" 
                    type="text"
                    value={webhookForm.name}
                    onChange={(e) => setWebhookForm({...webhookForm, name: e.target.value})}
                  />
                </div>

                  <div className="flex flex-col gap-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Eventos para Disparar</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        { id: 'scanCompleted', label: 'Scan Concluído' },
                        { id: 'criticalVuln', label: 'Vulnerabilidade Crítica' },
                        { id: 'scoreChange', label: 'Mudança no Score' },
                        { id: 'suspiciousAccess', label: 'Acesso Suspeito' },
                        { id: 'dnsChange', label: 'Alteração de DNS' }
                      ].map((event) => (
                        <label key={event.id} className="flex items-center gap-3 p-4 bg-white/5 border border-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-colors group">
                          <input 
                            checked={!!(webhookForm.events as any)[event.id]}
                            onChange={(e) => setWebhookForm({
                              ...webhookForm, 
                              events: {...webhookForm.events, [event.id]: e.target.checked}
                            })}
                            className="w-5 h-5 rounded border-white/20 bg-black/50 text-primary focus:ring-primary/50 focus:ring-offset-0 transition-all" 
                            type="checkbox"
                          />
                          <span className="text-sm font-medium text-slate-300 group-hover:text-white">{event.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                <div className="mt-2 p-5 bg-primary/5 rounded-2xl border border-primary/20">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex flex-col">
                      <p className="text-sm font-bold text-white">Validar Integração</p>
                      <p className="text-xs text-slate-400">Envia um JSON fictício para o URL acima.</p>
                    </div>
                    <button 
                      onClick={handleTestWebhook}
                      disabled={isTestingWebhook || !webhookForm.url}
                      className="bg-surface-dark border border-border-dark hover:border-primary/40 text-slate-200 font-bold py-2 px-5 rounded-lg text-sm transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isTestingWebhook ? (
                        <RefreshCw className="size-4 animate-spin" />
                      ) : (
                        <Rocket className="size-4" />
                      )}
                      {isTestingWebhook ? 'Enviando...' : 'Enviar Webhook de Teste'}
                    </button>
                  </div>
                  
                  {testResult && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 pt-4 border-t border-primary/10 flex items-center gap-2"
                    >
                      <span className="w-2 h-2 rounded-full bg-success-neon shadow-[0_0_8px_rgba(0,242,254,0.6)] animate-pulse"></span>
                      <p className="text-xs font-mono text-success-neon tracking-tighter uppercase">Sucesso (200 OK)</p>
                      <span className="text-[10px] text-slate-500 ml-auto">Resposta: 42ms</span>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="px-8 py-6 bg-black/40 border-t border-white/10 flex justify-end gap-4">
                <button 
                  onClick={() => setIsWebhookModalOpen(false)}
                  className="px-6 py-3 rounded-xl text-slate-400 font-bold hover:text-white hover:bg-white/5 transition-all text-sm uppercase tracking-widest cursor-pointer"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleSaveWebhook}
                  className="px-8 py-3 rounded-xl bg-primary text-white font-bold shadow-[0_0_20px_rgba(19,91,236,0.4)] hover:bg-blue-600 transition-all text-sm uppercase tracking-widest flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="size-5" />
                  Ativar Webhook
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Webhook Modal */}
      <AnimatePresence>
        {isEditModalOpen && editingWebhook && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background-dark/80 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0f172a]/80 border border-white/10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full max-w-2xl rounded-3xl overflow-hidden flex flex-col"
            >
              <div className="px-8 py-6 border-b border-white/10 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setIsEditModalOpen(false)}
                    className="flex items-center justify-center w-10 h-10 rounded-xl bg-surface-dark border border-border-dark text-slate-400 hover:text-white hover:border-primary/50 transition-all cursor-pointer"
                  >
                    <ArrowLeft className="size-5" />
                  </button>
                  <div className="flex flex-col">
                    <h2 className="text-xl font-bold text-white">Editar Webhook: <span className="text-primary">{editingWebhook.id}</span></h2>
                    <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">Gerenciar Integração</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-slate-500 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="size-6" />
                </button>
              </div>

              <div className="p-8 flex flex-col gap-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Nome do Webhook</label>
                    <input 
                      className="w-full p-4 bg-black/40 border border-border-dark rounded-xl text-slate-200 text-sm focus:outline-none placeholder:text-slate-600 focus:border-primary/50 transition-all" 
                      placeholder="Ex: Slack Principal" 
                      type="text" 
                      value={editingWebhook.name}
                      onChange={(e) => setEditingWebhook({...editingWebhook, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">URL do Endpoint</label>
                    <input 
                      className="w-full p-4 bg-black/40 border border-border-dark rounded-xl text-slate-200 text-sm font-mono focus:outline-none placeholder:text-slate-600 focus:border-primary/50 transition-all" 
                      placeholder="https://api.exemplo.com/webhook" 
                      type="url" 
                      value={editingWebhook.url}
                      onChange={(e) => setEditingWebhook({...editingWebhook, url: e.target.value})}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-white">Status do Webhook</span>
                      <span className="text-xs text-slate-400">Ative ou desative temporariamente os disparos</span>
                    </div>
                    <button 
                      onClick={() => setEditingWebhook({
                        ...editingWebhook, 
                        status: editingWebhook.status === 'Ativo' ? 'Inativo' : 'Ativo'
                      })}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${editingWebhook.status === 'Ativo' ? 'bg-primary' : 'bg-slate-700'}`}
                    >
                      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${editingWebhook.status === 'Ativo' ? 'translate-x-5' : 'translate-x-0'}`}></span>
                    </button>
                  </div>

                  <div className="flex flex-col gap-4">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Eventos para Disparar</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { id: 'scanCompleted', label: 'Scan Concluído' },
                        { id: 'criticalVuln', label: 'Vulnerabilidade Crítica' },
                        { id: 'scoreChange', label: 'Mudança no Score' },
                        { id: 'suspiciousAccess', label: 'Acesso Suspeito' },
                        { id: 'dnsChange', label: 'Alteração de DNS' }
                      ].map((event) => (
                        <label key={event.id} className="flex items-center gap-3 p-3 bg-black/20 rounded-lg border border-white/5 hover:border-primary/20 cursor-pointer transition-colors group">
                          <input 
                            checked={!!(editingWebhook.events as any)[event.id]}
                            onChange={(e) => setEditingWebhook({
                              ...editingWebhook,
                              events: { ...editingWebhook.events, [event.id]: e.target.checked }
                            })}
                            className="h-5 w-5 rounded border-border-dark bg-black/40 text-primary focus:ring-primary/50 transition-all cursor-pointer" 
                            type="checkbox"
                          />
                          <span className="text-sm text-slate-300 group-hover:text-white">{event.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-6 border-t border-white/5 flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <Key className="text-primary size-4" />
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Chave Secreta de Assinatura</label>
                    </div>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input 
                          className="w-full p-3 bg-black/60 border border-white/5 rounded-lg text-slate-400 font-mono text-xs tracking-widest focus:ring-0 focus:border-white/5 cursor-default outline-none" 
                          readOnly 
                          type="password" 
                          value={editingWebhook.secretKey || ''}
                        />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors cursor-pointer">
                          <Eye className="size-4" />
                        </button>
                      </div>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(editingWebhook.secretKey || '');
                          alert('Chave copiada!');
                        }}
                        className="flex items-center justify-center px-4 bg-surface-dark border border-white/10 rounded-lg text-slate-400 hover:text-white hover:border-primary/50 transition-all active:scale-95 cursor-pointer"
                      >
                        <Copy className="size-4" />
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-500 italic">Use esta chave para verificar a assinatura 'X-AuthBrasil-Signature' no cabeçalho dos payloads.</p>
                  </div>
                </div>
              </div>

              <div className="px-8 py-6 bg-black/40 border-t border-white/10 flex flex-col gap-4">
                <button 
                  onClick={handleUpdateWebhook}
                  className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(19,91,236,0.4)] transition-all transform active:scale-[0.98] cursor-pointer"
                >
                  Salvar Alterações
                </button>
                <button 
                  onClick={() => handleDeleteWebhook(editingWebhook.id)}
                  className="w-full py-3 text-red-500/60 hover:text-red-500 hover:bg-red-500/5 font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Trash2 className="size-4" />
                  Excluir Webhook
                </button>
              </div>
              
              <div className="px-8 py-4 bg-black/60 flex justify-between items-center text-slate-600 text-[10px] uppercase tracking-widest font-bold border-t border-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  Última entrega bem-sucedida: {editingWebhook.lastDelivery}
                </div>
                <span>Versão da API: {editingWebhook.apiVersion}</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {webhookToDelete && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-background-dark/90 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0f172a] border border-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.2)] w-full max-w-md rounded-3xl overflow-hidden p-8 flex flex-col items-center text-center gap-6"
            >
              <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-2">
                <Trash2 className="size-10" />
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-white">Excluir Webhook?</h2>
                <p className="text-slate-400 text-sm">Esta ação não pode ser desfeita. O endpoint deixará de receber notificações imediatamente.</p>
              </div>
              <div className="flex flex-col w-full gap-3 mt-4">
                <button 
                  onClick={confirmDelete}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(239,68,68,0.4)] cursor-pointer"
                >
                  Sim, Excluir Agora
                </button>
                <button 
                  onClick={() => setWebhookToDelete(null)}
                  className="w-full py-3 text-slate-400 font-bold hover:text-white transition-all cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Create API Key Modal */}
      <AnimatePresence>
        {isApiKeyModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-background-dark/90 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0f172a] border border-white/10 shadow-[0_0_50px_rgba(19,91,236,0.2)] w-full max-w-md rounded-3xl overflow-hidden p-8 flex flex-col gap-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <Key className="size-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Nova Chave API</h2>
                  <p className="text-xs text-slate-400 uppercase tracking-widest">Acesso Programático</p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Nome da Chave</label>
                <input 
                  className="w-full bg-black/40 border border-border-dark rounded-xl py-4 px-4 text-slate-200 placeholder:text-slate-600 transition-all focus:border-primary/60 outline-none" 
                  placeholder="Ex: Integração CI/CD" 
                  type="text" 
                  value={newApiKeyName}
                  onChange={(e) => setNewApiKeyName(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                <p className="text-xs text-slate-400 leading-relaxed">
                  Ao criar uma nova chave, você poderá usá-la para autenticar requisições na nossa API REST. Lembre-se de tratá-la como uma senha.
                </p>
              </div>

              <div className="flex flex-col w-full gap-3 mt-2">
                <button 
                  onClick={handleCreateApiKey}
                  className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(19,91,236,0.4)] cursor-pointer"
                >
                  Gerar Chave
                </button>
                <button 
                  onClick={() => {
                    setIsApiKeyModalOpen(false);
                    setNewApiKeyName('');
                  }}
                  className="w-full py-3 text-slate-400 font-bold hover:text-white transition-all cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Integration Modal */}
      <AnimatePresence>
        {isIntegrationModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-background-dark/90 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0f172a] border border-white/10 shadow-[0_0_50px_rgba(19,91,236,0.2)] w-full max-w-md rounded-3xl overflow-hidden p-8 flex flex-col gap-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <Plus className="size-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Nova Integração</h2>
                  <p className="text-xs text-slate-400 uppercase tracking-widest">Conectar Serviço</p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Nome da Integração</label>
                  <input 
                    className="w-full bg-black/40 border border-border-dark rounded-xl py-4 px-4 text-slate-200 placeholder:text-slate-600 transition-all focus:border-primary/60 outline-none" 
                    placeholder="Ex: Slack Security" 
                    type="text" 
                    value={integrationForm.name}
                    onChange={(e) => setIntegrationForm({ ...integrationForm, name: e.target.value })}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Tipo de Serviço</label>
                  <select 
                    className="w-full bg-black/40 border border-border-dark rounded-xl py-4 px-4 text-slate-200 transition-all focus:border-primary/60 outline-none appearance-none"
                    value={integrationForm.type}
                    onChange={(e) => setIntegrationForm({ ...integrationForm, type: e.target.value })}
                  >
                    <option value="github">GitHub</option>
                    <option value="database">Redis / Database</option>
                    <option value="webhook">Webhook</option>
                    <option value="slack">Slack</option>
                    <option value="terminal">Custom API</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Status Inicial</label>
                  <input 
                    className="w-full bg-black/40 border border-border-dark rounded-xl py-4 px-4 text-slate-200 placeholder:text-slate-600 transition-all focus:border-primary/60 outline-none" 
                    placeholder="Ex: Conectado" 
                    type="text" 
                    value={integrationForm.status}
                    onChange={(e) => setIntegrationForm({ ...integrationForm, status: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex flex-col w-full gap-3 mt-2">
                <button 
                  onClick={handleSaveIntegration}
                  className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(19,91,236,0.4)] cursor-pointer"
                >
                  Adicionar Integração
                </button>
                <button 
                  onClick={() => setIsIntegrationModalOpen(false)}
                  className="w-full py-3 text-slate-400 font-bold hover:text-white transition-all cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Integration Modal */}
      <AnimatePresence>
        {isEditIntegrationModalOpen && editingIntegration && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-background-dark/90 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0f172a] border border-white/10 shadow-[0_0_50px_rgba(19,91,236,0.2)] w-full max-w-md rounded-3xl overflow-hidden p-8 flex flex-col gap-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <Edit2 className="size-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Editar Integração</h2>
                  <p className="text-xs text-slate-400 uppercase tracking-widest">Configurações</p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Nome da Integração</label>
                  <input 
                    className="w-full bg-black/40 border border-border-dark rounded-xl py-4 px-4 text-slate-200 placeholder:text-slate-600 transition-all focus:border-primary/60 outline-none" 
                    type="text" 
                    value={editingIntegration.name}
                    onChange={(e) => setEditingIntegration({ ...editingIntegration, name: e.target.value })}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Status</label>
                  <input 
                    className="w-full bg-black/40 border border-border-dark rounded-xl py-4 px-4 text-slate-200 placeholder:text-slate-600 transition-all focus:border-primary/60 outline-none" 
                    type="text" 
                    value={editingIntegration.status}
                    onChange={(e) => setEditingIntegration({ ...editingIntegration, status: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex flex-col w-full gap-3 mt-2">
                <button 
                  onClick={handleUpdateIntegration}
                  className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(19,91,236,0.4)] cursor-pointer"
                >
                  Salvar Alterações
                </button>
                <button 
                  onClick={() => setIsEditIntegrationModalOpen(false)}
                  className="w-full py-3 text-slate-400 font-bold hover:text-white transition-all cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Integration Delete Confirmation Modal */}
      <AnimatePresence>
        {integrationToDelete && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-background-dark/95 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0f172a] border border-red-500/30 shadow-[0_0_60px_rgba(239,68,68,0.25)] w-full max-w-md rounded-3xl overflow-hidden p-8 flex flex-col items-center text-center gap-6"
            >
              <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-2">
                <Trash2 className="size-10" />
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-white">Remover Integração?</h2>
                <p className="text-slate-400 text-sm">
                  A conexão com este serviço será interrompida imediatamente. Você poderá reconectar no futuro se desejar.
                </p>
              </div>
              <div className="flex flex-col w-full gap-3 mt-4">
                <button 
                  onClick={confirmDeleteIntegration}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(239,68,68,0.4)] cursor-pointer"
                >
                  Confirmar Remoção
                </button>
                <button 
                  onClick={() => setIntegrationToDelete(null)}
                  className="w-full py-3 text-slate-400 font-bold hover:text-white transition-all cursor-pointer"
                >
                  Manter Integração
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* API Key Delete Confirmation Modal */}
      <AnimatePresence>
        {apiKeyToDelete && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-background-dark/95 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0f172a] border border-red-500/30 shadow-[0_0_60px_rgba(239,68,68,0.25)] w-full max-w-md rounded-3xl overflow-hidden p-8 flex flex-col items-center text-center gap-6"
            >
              <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-2">
                <Trash2 className="size-10" />
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-white">Excluir Chave API?</h2>
                <p className="text-slate-400 text-sm">
                  Esta ação é irreversível. Qualquer aplicação ou script usando esta chave perderá o acesso imediatamente.
                </p>
              </div>
              <div className="flex flex-col w-full gap-3 mt-4">
                <button 
                  onClick={confirmDeleteApiKey}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(239,68,68,0.4)] cursor-pointer"
                >
                  Confirmar Exclusão
                </button>
                <button 
                  onClick={() => setApiKeyToDelete(null)}
                  className="w-full py-3 text-slate-400 font-bold hover:text-white transition-all cursor-pointer"
                >
                  Manter Chave
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
