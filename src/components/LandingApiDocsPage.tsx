import React, { useState } from 'react';
import { 
  Shield, 
  ChevronRight, 
  Code2, 
  BookOpen, 
  Key, 
  Zap, 
  Terminal, 
  Globe, 
  Copy, 
  Check,
  Search,
  Menu,
  X,
  ArrowLeft,
  Lock,
  Server,
  Webhook,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LandingApiDocsPageProps {
  onBack: () => void;
  onStart: () => void;
  onLogin: () => void;
  onPricing: () => void;
  onHowItWorks: () => void;
  onAboutUs: () => void;
  onSampleReport: () => void;
  onContact: () => void;
}

type DocSection = 'intro' | 'auth' | 'scans' | 'reports' | 'vulns' | 'webhooks' | 'errors';

export default function LandingApiDocsPage({ 
  onBack, 
  onStart, 
  onLogin, 
  onPricing, 
  onHowItWorks, 
  onAboutUs,
  onSampleReport,
  onContact
}: LandingApiDocsPageProps) {
  const [activeSection, setActiveSection] = useState<DocSection>('intro');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const menuItems = [
    { id: 'intro', label: 'Introdução', icon: BookOpen },
    { id: 'auth', label: 'Autenticação', icon: Key },
    { id: 'scans', label: 'Varreduras (Scans)', icon: Zap },
    { id: 'reports', label: 'Relatórios', icon: Terminal },
    { id: 'vulns', label: 'Vulnerabilidades', icon: Shield },
    { id: 'webhooks', label: 'Webhooks', icon: Webhook },
    { id: 'errors', label: 'Códigos de Erro', icon: AlertCircle },
  ];

  const CodeBlock = ({ code, language = 'bash' }: { code: string, language?: string }) => (
    <div className="relative group mt-4">
      <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={() => copyToClipboard(code)}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          {copiedText === code ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
        </button>
      </div>
      <pre className="p-6 rounded-xl bg-slate-950 border border-white/5 overflow-x-auto font-mono text-sm text-slate-300 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );

  return (
    <div className="min-h-screen bg-bg-dark flex flex-col font-body selection:bg-primary selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/50 bg-bg-dark/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={onBack}>
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/30">
                <Shield className="size-5" />
              </div>
              <span className="text-xl font-display font-bold tracking-tight text-white">AuthBrasil<span className="text-primary">.io</span></span>
              <span className="ml-2 px-2 py-0.5 rounded bg-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-widest border border-slate-700">Docs</span>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 text-slate-400 hover:text-white cursor-pointer"
              >
                {isSidebarOpen ? <X className="size-6" /> : <Menu className="size-6" />}
              </button>
              <div className="hidden lg:flex items-center gap-3">
                <button onClick={onLogin} className="text-sm font-bold text-white hover:text-primary transition-colors cursor-pointer">Login</button>
                <button 
                  onClick={onStart}
                  className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-neon transition-all cursor-pointer"
                >
                  Criar Conta
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex max-w-7xl mx-auto w-full relative">
        {/* Sidebar Navigation */}
        <aside className={`
          fixed inset-y-16 left-0 z-40 w-64 bg-bg-dark border-r border-slate-800/50 transform transition-transform duration-300 ease-in-out lg:relative lg:inset-0 lg:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="h-full overflow-y-auto py-8 px-4">
            <div className="mb-8">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500 group-focus-within:text-primary" />
                <input 
                  type="text" 
                  placeholder="Buscar na documentação..." 
                  className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-800 rounded-lg text-sm text-slate-300 focus:outline-none focus:border-primary transition-all"
                />
              </div>
            </div>

            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id as DocSection);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-primary/10 text-primary border border-primary/20' 
                        : 'text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent'
                    }`}
                  >
                    <Icon className="size-4" />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div className="mt-12 pt-8 border-t border-slate-800/50">
              <h4 className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Recursos Úteis</h4>
              <div className="space-y-2">
                <button onClick={onSampleReport} className="w-full flex items-center justify-between px-4 py-2 text-xs text-slate-400 hover:text-primary transition-colors cursor-pointer group">
                  Relatório Exemplo <ChevronRight className="size-3 group-hover:translate-x-1 transition-transform" />
                </button>
                <a href="#" className="w-full flex items-center justify-between px-4 py-2 text-xs text-slate-400 hover:text-primary transition-colors group">
                  SDK Node.js <ChevronRight className="size-3 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#" className="w-full flex items-center justify-between px-4 py-2 text-xs text-slate-400 hover:text-primary transition-colors group">
                  Postman Collection <ChevronRight className="size-3 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 py-12 px-4 sm:px-8 lg:px-12 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-3xl"
            >
              {activeSection === 'intro' && (
                <section>
                  <h1 className="text-4xl font-display font-bold text-white mb-6">Introdução à API AuthBrasil</h1>
                  <p className="text-lg text-slate-400 leading-relaxed mb-8">
                    Bem-vindo à documentação da API AuthBrasil. Nossa API RESTful permite que você integre o poder do motor de segurança NeuralCore™ diretamente em seu fluxo de desenvolvimento, CI/CD ou painéis internos.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
                      <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <Globe className="size-5 text-primary" />
                      </div>
                      <h3 className="text-white font-bold mb-2">Endpoint Base</h3>
                      <code className="text-xs text-primary font-mono">https://api.authbrasil.io/v1</code>
                    </div>
                    <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
                      <div className="size-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                        <Zap className="size-5 text-emerald-500" />
                      </div>
                      <h3 className="text-white font-bold mb-2">Formato de Resposta</h3>
                      <p className="text-xs text-slate-400">Todas as respostas são retornadas em formato JSON padrão.</p>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-white mb-4">Primeiros Passos</h2>
                  <p className="text-slate-400 mb-6">
                    Para começar a usar a API, você precisará de uma chave de API válida, que pode ser gerada no seu painel de controle em <span className="text-primary">Configurações {'>'} API</span>.
                  </p>
                </section>
              )}

              {activeSection === 'auth' && (
                <section>
                  <h1 className="text-4xl font-display font-bold text-white mb-6">Autenticação</h1>
                  <p className="text-lg text-slate-400 leading-relaxed mb-8">
                    A API AuthBrasil utiliza chaves de API para autenticar solicitações. Você deve incluir sua chave de API em todas as solicitações de API no cabeçalho <code className="text-primary">X-API-Key</code>.
                  </p>

                  <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 mb-8 flex gap-4">
                    <AlertCircle className="size-6 text-orange-500 shrink-0" />
                    <p className="text-sm text-orange-200/80">
                      Mantenha sua chave de API em segredo! Não a compartilhe em repositórios públicos ou no código do lado do cliente.
                    </p>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-4">Exemplo de Requisição</h3>
                  <CodeBlock code={`curl -X GET "https://api.authbrasil.io/v1/me" \\
  -H "X-API-Key: sua_chave_aqui" \\
  -H "Content-Type: application/json"`} />
                </section>
              )}

              {activeSection === 'scans' && (
                <section>
                  <h1 className="text-4xl font-display font-bold text-white mb-6">Varreduras (Scans)</h1>
                  <p className="text-lg text-slate-400 leading-relaxed mb-8">
                    Inicie novas análises de segurança programaticamente. Você pode monitorar domínios, IPs ou repositórios Git.
                  </p>

                  <h3 className="text-lg font-bold text-white mb-2">Criar Novo Scan</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-500 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30">POST</span>
                    <code className="text-sm text-slate-300">/scans</code>
                  </div>

                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Corpo da Requisição</h4>
                  <CodeBlock code={`{
  "target": "authbrasil.io",
  "type": "domain",
  "depth": "full",
  "callback_url": "https://seu-webhook.com/endpoint"
}`} />

                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-8 mb-4">Resposta de Sucesso</h4>
                  <CodeBlock code={`{
  "id": "scan_882910",
  "status": "queued",
  "target": "authbrasil.io",
  "created_at": "2026-03-01T12:00:00Z"
}`} />
                </section>
              )}

              {activeSection === 'reports' && (
                <section>
                  <h1 className="text-4xl font-display font-bold text-white mb-6">Relatórios</h1>
                  <p className="text-lg text-slate-400 leading-relaxed mb-8">
                    Recupere os resultados detalhados de varreduras concluídas.
                  </p>

                  <h3 className="text-lg font-bold text-white mb-2">Obter Relatório por ID</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider border border-blue-500/30">GET</span>
                    <code className="text-sm text-slate-300">/reports/:id</code>
                  </div>

                  <CodeBlock code={`curl -X GET "https://api.authbrasil.io/v1/reports/scan_882910" \\
  -H "X-API-Key: sua_chave_aqui"`} />
                </section>
              )}

              {activeSection === 'vulns' && (
                <section>
                  <h1 className="text-4xl font-display font-bold text-white mb-6">Vulnerabilidades</h1>
                  <p className="text-lg text-slate-400 leading-relaxed mb-8">
                    Acesse a base de conhecimento de vulnerabilidades e critérios de pontuação.
                  </p>

                  <h3 className="text-lg font-bold text-white mb-2">Listar Tipos de Vulnerabilidades</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider border border-blue-500/30">GET</span>
                    <code className="text-sm text-slate-300">/vulnerabilities/types</code>
                  </div>

                  <CodeBlock code={`{
  "types": [
    {
      "code": "SSL_EXPIRED",
      "name": "Certificado SSL Expirado",
      "severity": "CRITICAL",
      "base_score_impact": 30
    },
    {
      "code": "HSTS_MISSING",
      "name": "HSTS Não Configurado",
      "severity": "MEDIUM",
      "base_score_impact": 15
    }
  ]
}`} />
                </section>
              )}

              {activeSection === 'webhooks' && (
                <section>
                  <h1 className="text-4xl font-display font-bold text-white mb-6">Webhooks</h1>
                  <p className="text-lg text-slate-400 leading-relaxed mb-8">
                    Receba notificações em tempo real quando um scan for concluído ou quando uma vulnerabilidade crítica for detectada.
                  </p>

                  <h3 className="text-lg font-bold text-white mb-4">Payload de Conclusão</h3>
                  <CodeBlock code={`{
  "event": "scan.completed",
  "scan_id": "scan_882910",
  "target": "authbrasil.io",
  "score": 98,
  "summary": {
    "critical": 0,
    "medium": 0,
    "low": 2
  },
  "report_url": "https://api.authbrasil.io/v1/reports/scan_882910"
}`} />
                </section>
              )}

              {activeSection === 'errors' && (
                <section>
                  <h1 className="text-4xl font-display font-bold text-white mb-6">Códigos de Erro</h1>
                  <p className="text-lg text-slate-400 leading-relaxed mb-8">
                    A API utiliza códigos de resposta HTTP padrão para indicar o sucesso ou a falha de uma solicitação.
                  </p>

                  <div className="space-y-4">
                    {[
                      { code: '200', label: 'OK', desc: 'A solicitação foi bem-sucedida.' },
                      { code: '400', label: 'Bad Request', desc: 'A solicitação estava malformada ou faltavam parâmetros.' },
                      { code: '401', label: 'Unauthorized', desc: 'Chave de API inválida ou ausente.' },
                      { code: '403', label: 'Forbidden', desc: 'Você não tem permissão para acessar este recurso.' },
                      { code: '404', label: 'Not Found', desc: 'O recurso solicitado não existe.' },
                      { code: '429', label: 'Too Many Requests', desc: 'Você atingiu o limite de taxa (Rate Limit).' },
                      { code: '500', label: 'Internal Server Error', desc: 'Ocorreu um erro inesperado no servidor.' },
                    ].map((err) => (
                      <div key={err.code} className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/30 border border-slate-800">
                        <span className="font-mono font-bold text-primary w-12">{err.code}</span>
                        <div>
                          <h4 className="text-white font-bold text-sm">{err.label}</h4>
                          <p className="text-xs text-slate-500">{err.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-lp-surface-dark border-t border-lp-border-neon/20 pt-16 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-6 w-6 items-center justify-center rounded text-lp-primary">
                  <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>shield_lock</span>
                </div>
                <span className="text-lg font-display font-bold text-white">AuthBrasil</span>
              </div>
              <p className="text-sm text-text-muted max-w-xs mb-6">Infraestrutura de segurança cibernética automatizada. Protegendo o ecossistema digital brasileiro.</p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Produto</h3>
              <ul className="space-y-3">
                <li><button onClick={onPricing} className="text-sm text-text-muted hover:text-lp-primary transition-colors cursor-pointer text-left">Preços</button></li>
                <li><button onClick={onBack} className="text-sm text-text-muted hover:text-lp-primary transition-colors cursor-pointer text-left">Recursos</button></li>
                <li><button onClick={onHowItWorks} className="text-sm text-text-muted hover:text-lp-primary transition-colors cursor-pointer text-left">Como Funciona</button></li>
                <li><button onClick={onSampleReport} className="text-sm text-text-muted hover:text-lp-primary transition-colors cursor-pointer text-left">Relatório Exemplo</button></li>
                <li><button onClick={() => {}} className="text-sm text-lp-primary font-bold transition-colors cursor-default text-left">API Docs</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Empresa</h3>
              <ul className="space-y-3">
                <li><button onClick={onAboutUs} className="text-sm text-text-muted hover:text-lp-primary transition-colors cursor-pointer text-left">Sobre Nós</button></li>
                <li><a className="text-sm text-text-muted hover:text-lp-primary transition-colors" href="#">Carreiras</a></li>
                <li><a className="text-sm text-text-muted hover:text-lp-primary transition-colors" href="#">Blog de Segurança</a></li>
                <li><button onClick={onContact} className="text-sm text-text-muted hover:text-lp-primary transition-colors cursor-pointer text-left">Contato</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Legal</h3>
              <ul className="space-y-3">
                <li><a className="text-sm text-text-muted hover:text-lp-primary transition-colors" href="#">Termos de Uso</a></li>
                <li><a className="text-sm text-text-muted hover:text-lp-primary transition-colors" href="#">Privacidade</a></li>
                <li><a className="text-sm text-text-muted hover:text-lp-primary transition-colors" href="#">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-text-muted text-center md:text-left">© 2026 AuthBrasil CyberSecurity Ltda.</p>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-900/20 border border-green-800/50">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs text-green-400 font-mono">ALL SYSTEMS OPERATIONAL</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
