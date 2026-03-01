import React from 'react';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Download, 
  ArrowLeft,
  Lock,
  Globe,
  Search,
  Zap,
  FileText,
  ExternalLink,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { motion } from 'motion/react';

interface LandingSampleReportPageProps {
  onBack: () => void;
  onStart: () => void;
  onLogin: () => void;
  onPricing: () => void;
  onHowItWorks: () => void;
  onAboutUs: () => void;
  onApiDocs: () => void;
  onContact: () => void;
}

export default function LandingSampleReportPage({ 
  onBack, 
  onStart, 
  onLogin, 
  onPricing, 
  onHowItWorks, 
  onAboutUs,
  onApiDocs,
  onContact
}: LandingSampleReportPageProps) {
  
  const vulnerabilities = [
    {
      id: 'VULN-001',
      title: 'SQL Injection Detectada',
      severity: 'CRITICAL',
      category: 'Injeção de Dados',
      description: 'O parâmetro "id" no endpoint /api/users/profile é vulnerável a injeção de SQL baseada em tempo.',
      impact: 'Acesso total ao banco de dados, permitindo extração de credenciais e dados sensíveis de usuários.',
      recommendation: 'Utilize Prepared Statements ou um ORM seguro para parametrizar todas as consultas ao banco de dados.',
      status: 'danger'
    },
    {
      id: 'VULN-002',
      title: 'HSTS Não Configurado',
      severity: 'MEDIUM',
      category: 'Configuração de Infraestrutura',
      description: 'O cabeçalho Strict-Transport-Security (HSTS) não foi encontrado na resposta do servidor.',
      impact: 'Permite ataques de downgrade de protocolo (SSL Stripping) e interceptação de tráfego (MITM).',
      recommendation: 'Adicione o cabeçalho "Strict-Transport-Security: max-age=31536000; includeSubDomains" em todas as respostas HTTPS.',
      status: 'warning'
    },
    {
      id: 'VULN-003',
      title: 'Exposição de Versão do Servidor',
      severity: 'LOW',
      category: 'Divulgação de Informação',
      description: 'O cabeçalho "Server" revela a versão exata do Nginx (1.18.0).',
      impact: 'Facilita o mapeamento de vulnerabilidades conhecidas (CVEs) específicas para esta versão do software.',
      recommendation: 'Configure o servidor para omitir a versão nos cabeçalhos de resposta (server_tokens off no Nginx).',
      status: 'primary'
    }
  ];

  return (
    <div className="font-body antialiased overflow-x-hidden bg-bg-dark min-h-screen flex flex-col selection:bg-primary selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/50 bg-bg-dark/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={onBack}>
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/30">
                <Shield className="size-5" />
              </div>
              <span className="text-xl font-display font-bold tracking-tight text-white">AuthBrasil<span className="text-primary">.io</span></span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <button onClick={onBack} className="text-sm font-medium text-slate-400 hover:text-primary transition-colors cursor-pointer">Recursos</button>
              <button onClick={onHowItWorks} className="text-sm font-medium text-slate-400 hover:text-primary transition-colors cursor-pointer">Como Funciona</button>
              <button onClick={onPricing} className="text-sm font-medium text-slate-400 hover:text-primary transition-colors cursor-pointer">Preços</button>
              <button onClick={onAboutUs} className="text-sm font-medium text-slate-400 hover:text-primary transition-colors cursor-pointer">Sobre Nós</button>
            </nav>
            <div className="flex items-center gap-3">
              <button onClick={onLogin} className="hidden sm:flex text-sm font-bold text-white hover:text-primary transition-colors cursor-pointer">Login</button>
              <button 
                onClick={onStart}
                className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-neon transition-all cursor-pointer"
              >
                Iniciar Scan
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow pb-20">
        {/* Report Hero */}
        <section className="relative pt-12 pb-8 overflow-hidden border-b border-slate-800/50">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <button 
              onClick={onBack}
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors text-sm font-medium cursor-pointer"
            >
              <ArrowLeft className="size-4" /> Voltar para Home
            </button>
            
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-4">
                  <FileText className="size-3" /> Relatório de Exemplo
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                  Dossiê de Segurança: <span className="text-primary">target-app.io</span>
                </h1>
                <p className="text-slate-400 max-w-2xl">
                  Este é um exemplo real de como o NeuralCore™ identifica e documenta vulnerabilidades. 
                  O relatório abaixo simula uma análise completa de superfície de ataque.
                </p>
              </div>
              
              <div className="flex items-center gap-6 p-6 glass rounded-2xl border border-white/5 shadow-2xl">
                <div className="relative size-24 flex items-center justify-center">
                  <svg className="size-full -rotate-90" viewBox="0 0 100 100">
                    <circle className="text-slate-800 stroke-current" strokeWidth="8" fill="transparent" r="40" cx="50" cy="50" />
                    <circle className="text-primary stroke-current" strokeWidth="8" strokeLinecap="round" fill="transparent" r="40" cx="50" cy="50" strokeDasharray="251.2" strokeDashoffset="251.2" style={{ strokeDashoffset: '251.2' }} />
                    <motion.circle 
                      initial={{ strokeDashoffset: 251.2 }}
                      animate={{ strokeDashoffset: 251.2 - (251.2 * 68) / 100 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="text-primary stroke-current" 
                      strokeWidth="8" 
                      strokeLinecap="round" 
                      fill="transparent" 
                      r="40" 
                      cx="50" 
                      cy="50" 
                      strokeDasharray="251.2" 
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-white leading-none">68</span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Score</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-bold text-white mb-1">Status: <span className="text-orange-400">Risco Médio</span></div>
                  <div className="text-xs text-slate-500 mb-3">Gerado em: 27 Fev 2026</div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold text-white transition-all cursor-pointer">
                    <Download className="size-4" /> Baixar PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Report Content */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column: Summary Stats */}
              <div className="lg:col-span-1 space-y-6">
                <div className="glass rounded-2xl p-6 border border-white/5">
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Search className="size-4 text-primary" /> Resumo da Análise
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                      <div className="flex items-center gap-3">
                        <XCircle className="size-5 text-red-500" />
                        <span className="text-sm font-medium text-slate-200">Críticas</span>
                      </div>
                      <span className="text-lg font-bold text-red-500">01</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="size-5 text-orange-500" />
                        <span className="text-sm font-medium text-slate-200">Médias</span>
                      </div>
                      <span className="text-lg font-bold text-orange-500">01</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                      <div className="flex items-center gap-3">
                        <AlertCircle className="size-5 text-blue-500" />
                        <span className="text-sm font-medium text-slate-200">Baixas</span>
                      </div>
                      <span className="text-lg font-bold text-blue-500">01</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="size-5 text-emerald-500" />
                        <span className="text-sm font-medium text-slate-200">Seguras</span>
                      </div>
                      <span className="text-lg font-bold text-emerald-500">09</span>
                    </div>
                  </div>
                </div>

                <div className="glass rounded-2xl p-6 border border-white/5">
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Globe className="size-4 text-primary" /> Infraestrutura
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">IP do Servidor:</span>
                      <span className="text-slate-300 font-mono">187.45.12.99</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Localização:</span>
                      <span className="text-slate-300">São Paulo, BR</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Certificado SSL:</span>
                      <span className="text-emerald-400 font-bold">VÁLIDO</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Versão TLS:</span>
                      <span className="text-slate-300">1.3 (Seguro)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Vulnerability Details */}
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  <AlertTriangle className="size-6 text-primary" /> Detalhes das Vulnerabilidades
                </h2>
                
                {vulnerabilities.map((vuln, idx) => (
                  <motion.div 
                    key={vuln.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="glass rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all"
                  >
                    <div className={`px-6 py-4 flex items-center justify-between border-b border-white/5 ${
                      vuln.status === 'danger' ? 'bg-red-500/5' : 
                      vuln.status === 'warning' ? 'bg-orange-500/5' : 'bg-blue-500/5'
                    }`}>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          vuln.status === 'danger' ? 'bg-red-500/20 text-red-500 border border-red-500/30' : 
                          vuln.status === 'warning' ? 'bg-orange-500/20 text-orange-500 border border-orange-500/30' : 
                          'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        }`}>
                          {vuln.severity}
                        </span>
                        <h3 className="text-lg font-bold text-white">{vuln.title}</h3>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">{vuln.id}</span>
                    </div>
                    
                    <div className="p-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Descrição</h4>
                          <p className="text-sm text-slate-300 leading-relaxed">{vuln.description}</p>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Impacto</h4>
                          <p className="text-sm text-slate-300 leading-relaxed">{vuln.impact}</p>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                        <h4 className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                          <CheckCircle2 className="size-3" /> Recomendação de Correção
                        </h4>
                        <p className="text-sm text-slate-300 leading-relaxed">{vuln.recommendation}</p>
                      </div>

                      {vuln.status === 'danger' && (
                        <div className="p-4 rounded-xl bg-slate-950 border border-white/5 font-mono text-[11px] text-slate-400">
                          <div className="flex items-center justify-between mb-2 border-b border-white/5 pb-2">
                            <span className="text-primary">POC (Proof of Concept)</span>
                            <span className="text-[10px] text-slate-600 uppercase">NeuralCore™ Output</span>
                          </div>
                          <div className="space-y-1">
                            <p className="text-slate-500">// Payload enviado pelo NeuralCore</p>
                            <p>GET /api/users/profile?id=1' AND (SELECT 1 FROM (SELECT(SLEEP(5)))a)--</p>
                            <p className="text-red-400 mt-2">// Resultado: Resposta do servidor atrasada em 5.02s (Vulnerabilidade Confirmada)</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-12">
          <div className="mx-auto max-w-4xl px-4">
            <div className="p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-primary to-blue-700 relative overflow-hidden shadow-2xl text-center">
              <div className="absolute top-0 right-0 p-12 opacity-10">
                <Shield className="size-48 text-white" />
              </div>
              <div className="relative z-10">
                <h2 className="text-3xl font-display font-bold text-white mb-6">Sua aplicação está segura hoje?</h2>
                <p className="text-blue-100 mb-10 text-lg max-w-2xl mx-auto">
                  Não deixe a segurança da sua empresa ao acaso. Inicie um scan gratuito agora e receba um relatório detalhado como este em minutos.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={onStart}
                    className="px-8 py-4 bg-white text-primary rounded-xl font-bold text-lg shadow-xl hover:scale-105 transition-all cursor-pointer"
                  >
                    Começar Agora
                  </button>
                  <button 
                    onClick={onPricing}
                    className="px-8 py-4 bg-primary-dark/30 hover:bg-primary-dark/50 text-white border border-white/20 rounded-xl font-bold text-lg transition-all cursor-pointer"
                  >
                    Ver Planos
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

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
                <li><button onClick={() => {}} className="text-sm text-lp-primary font-bold transition-colors cursor-default text-left">Relatório Exemplo</button></li>
                <li><button onClick={onApiDocs} className="text-sm text-text-muted hover:text-lp-primary transition-colors cursor-pointer text-left">API Docs</button></li>
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
