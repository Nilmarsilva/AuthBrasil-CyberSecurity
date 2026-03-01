import React from 'react';

interface LandingPricingPageProps {
  onBack: () => void;
  onStart: () => void;
  onLogin: () => void;
  onHowItWorks: () => void;
  onAboutUs: () => void;
  onSampleReport: () => void;
  onApiDocs: () => void;
  onContact: () => void;
  onTerms: () => void;
  onPrivacy: () => void;
  onCookies: () => void;
}

export default function LandingPricingPage({ onBack, onStart, onLogin, onHowItWorks, onAboutUs, onSampleReport, onApiDocs, onContact, onTerms, onPrivacy, onCookies }: LandingPricingPageProps) {
  return (
    <div className="font-body antialiased overflow-x-hidden bg-cyber-mesh min-h-screen flex flex-col selection:bg-lp-primary selection:text-primary-content">
      <header className="sticky top-0 z-50 w-full border-b border-lp-border-neon bg-lp-surface-dark/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={onBack}>
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-lp-primary/10 text-lp-primary border border-lp-primary/30">
                <span className="absolute inset-0 rounded-lg bg-lp-primary/20 blur-sm"></span>
                <span className="relative material-symbols-outlined" style={{ fontSize: '24px' }}>shield_lock</span>
              </div>
              <span className="text-xl font-display font-bold tracking-tight text-text-main">AuthBrasil<span className="text-lp-primary">.io</span></span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <button onClick={onBack} className="text-sm font-medium text-text-muted hover:text-lp-primary transition-colors cursor-pointer">Recursos</button>
              <button onClick={onHowItWorks} className="text-sm font-medium text-text-muted hover:text-lp-primary transition-colors cursor-pointer">Como Funciona</button>
              <span className="text-sm font-medium text-lp-primary shadow-[0_0_10px_rgba(0,240,255,0.3)] transition-colors cursor-default">Preços</span>
              <button onClick={onAboutUs} className="text-sm font-medium text-text-muted hover:text-lp-primary transition-colors cursor-pointer">Sobre Nós</button>
            </nav>
            <div className="flex items-center gap-3">
              <button 
                onClick={onLogin}
                className="hidden sm:flex items-center justify-center rounded-lg px-4 py-2 text-sm font-bold text-text-main hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 cursor-pointer"
              >
                Login
              </button>
              <button 
                onClick={onStart}
                className="relative group flex items-center justify-center rounded-lg bg-lp-primary px-4 py-2 text-sm font-bold text-primary-content shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] transition-all overflow-hidden cursor-pointer"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-scan-line"></span>
                <span className="relative flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">radar</span>
                  Iniciar Scan
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow relative">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-lp-secondary/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-lp-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <section className="relative pt-16 pb-12 sm:pt-24 sm:pb-20 lg:pb-16 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center rounded-full border border-lp-primary/30 bg-lp-primary/5 px-4 py-1.5 text-xs font-medium text-lp-primary mb-8 backdrop-blur-sm shadow-[0_0_10px_rgba(0,240,255,0.1)] mx-auto">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lp-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-lp-primary"></span>
              </span>
              <span className="tracking-wide uppercase">Sem mensalidades • Pague uma vez</span>
            </div>
            
            <h1 className="font-display text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl mb-6 leading-tight max-w-4xl mx-auto">
              <span className="text-gradient-metallic block mb-2">Segurança Ofensiva</span>
              <span className="text-gradient-neon text-glow">Simples e Transparente</span>
            </h1>
            
            <p className="mx-auto max-w-2xl text-lg text-text-muted mb-16 leading-relaxed font-light">
              Escolha o nível de profundidade do seu teste de intrusão. Relatórios detalhados, suporte técnico especializado e re-teste gratuito incluídos.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto relative">
              {/* Scan Único */}
              <div className="lp-glass-panel rounded-3xl p-8 border border-white/5 flex flex-col hover:bg-white/5 transition-all duration-300 relative group pricing-card-glow">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white font-display mb-2">Scan Único</h3>
                  <p className="text-sm text-text-muted">Para validação rápida de MVPs e sites institucionais.</p>
                </div>
                <div className="mb-8">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold tracking-tight text-white font-display">R$ 199</span>
                    <span className="ml-2 text-sm font-medium text-text-muted">/ único</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-lp-primary text-sm pt-1">check_circle</span>
                    <span className="text-sm text-gray-300 text-left">Scan automatizado básico</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-lp-primary text-sm pt-1">check_circle</span>
                    <span className="text-sm text-gray-300 text-left">Relatório PDF Técnico</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-lp-primary text-sm pt-1">check_circle</span>
                    <span className="text-sm text-gray-300 text-left">Suporte via email (48h)</span>
                  </li>
                  <li className="flex items-start gap-3 opacity-50">
                    <span className="material-symbols-outlined text-gray-600 text-sm pt-1">cancel</span>
                    <span className="text-sm text-gray-500 text-left">Sem re-teste gratuito</span>
                  </li>
                </ul>
                <button 
                  onClick={onStart}
                  className="w-full rounded-xl border border-white/20 bg-transparent py-3 px-4 text-sm font-bold text-white hover:bg-white/10 hover:border-lp-primary/50 transition-all flex items-center justify-center gap-2 group-hover:text-lp-primary cursor-pointer"
                >
                  ADQUIRIR SCAN
                </button>
              </div>

              {/* Deep Scan Pro */}
              <div className="relative rounded-3xl p-1 bg-gradient-to-b from-lp-primary via-lp-secondary to-lp-primary shadow-[0_0_40px_rgba(112,0,255,0.3)] transform md:-translate-y-4 md:hover:-translate-y-6 transition-transform duration-300 z-10">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-lp-primary to-lp-secondary px-4 py-1 rounded-full text-xs font-bold text-white tracking-widest uppercase shadow-lg">
                  Mais Popular
                </div>
                <div className="bg-lp-surface-dark h-full w-full rounded-[20px] p-8 flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-20">
                    <span className="material-symbols-outlined text-6xl text-lp-primary">security</span>
                  </div>
                  <div className="mb-6 relative z-10">
                    <h3 className="text-2xl font-bold text-white font-display mb-2 flex items-center gap-2">
                      Deep Scan Pro
                      <span className="animate-pulse w-2 h-2 rounded-full bg-lp-primary"></span>
                    </h3>
                    <p className="text-sm text-lp-primary/80">Varredura profunda com análise de lógica de negócio.</p>
                  </div>
                  <div className="mb-8 relative z-10">
                    <div className="flex items-baseline">
                      <span className="text-5xl font-bold tracking-tight text-white font-display text-glow">R$ 499</span>
                      <span className="ml-2 text-sm font-medium text-text-muted">/ único</span>
                    </div>
                    <p className="text-xs text-lp-secondary mt-2 font-mono">:: HIGH DEMAND ::</p>
                  </div>
                  <ul className="space-y-4 mb-8 flex-grow relative z-10">
                    <li className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-lp-secondary text-sm pt-1">verified</span>
                      <span className="text-sm text-white font-medium text-left">Scan OWASP Top 10 Completo</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-lp-secondary text-sm pt-1">verified</span>
                      <span className="text-sm text-white font-medium text-left">Relatório PDF Técnico + Executivo</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-lp-secondary text-sm pt-1">verified</span>
                      <span className="text-sm text-white font-medium text-left">Acesso à API para CI/CD (30 dias)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-lp-secondary text-sm pt-1">verified</span>
                      <span className="text-sm text-white font-medium text-left">Suporte Prioritário (7 dias)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-lp-secondary text-sm pt-1">verified</span>
                      <span className="text-sm text-white font-medium text-left">1x Re-teste de Validação Gratuito</span>
                    </li>
                  </ul>
                  <button 
                    onClick={onStart}
                    className="w-full rounded-xl bg-gradient-to-r from-lp-primary to-lp-secondary py-4 px-4 text-sm font-bold text-primary-content hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-all flex items-center justify-center gap-2 relative overflow-hidden group cursor-pointer"
                  >
                    <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                    <span className="material-symbols-outlined text-lg">rocket_launch</span>
                    <span className="relative">ADQUIRIR SCAN PRO</span>
                  </button>
                </div>
              </div>

              {/* Enterprise */}
              <div className="lp-glass-panel rounded-3xl p-8 border border-white/5 flex flex-col hover:bg-white/5 transition-all duration-300 relative group pricing-card-glow">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white font-display mb-2">Enterprise</h3>
                  <p className="text-sm text-text-muted">Para grandes organizações e compliance contínuo.</p>
                </div>
                <div className="mb-8">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold tracking-tight text-white font-display">Custom</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-lp-primary text-sm pt-1">check_circle</span>
                    <span className="text-sm text-gray-300 text-left">Pentest Manual por Especialistas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-lp-primary text-sm pt-1">check_circle</span>
                    <span className="text-sm text-gray-300 text-left">Gestor de conta dedicado</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-lp-primary text-sm pt-1">check_circle</span>
                    <span className="text-sm text-gray-300 text-left">API Ilimitada</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-lp-primary text-sm pt-1">check_circle</span>
                    <span className="text-sm text-gray-300 text-left">Treinamento de equipe</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-lp-primary text-sm pt-1">check_circle</span>
                    <span className="text-sm text-gray-300 text-left">SLA Personalizado</span>
                  </li>
                </ul>
                <button 
                  onClick={onStart}
                  className="w-full rounded-xl border border-white/20 bg-transparent py-3 px-4 text-sm font-bold text-white hover:bg-white/10 hover:border-lp-primary/50 transition-all flex items-center justify-center gap-2 group-hover:text-lp-primary cursor-pointer"
                >
                  FALAR COM VENDAS
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-[#070e1a] border-t border-white/5 relative">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-lp-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-3xl font-display font-bold tracking-tight text-white text-center mb-12">Perguntas <span className="text-lp-primary">Frequentes</span></h2>
            <div className="space-y-4">
              <details className="group lp-glass-panel rounded-xl overflow-hidden border border-white/5 open:border-lp-primary/30 transition-all duration-300">
                <summary className="flex cursor-pointer items-center justify-between p-6 text-lg font-medium text-white hover:bg-white/5 transition-colors select-none">
                  <span>Como funciona o "Pague uma vez"?</span>
                  <span className="transition-transform group-open:rotate-180">
                    <span className="material-symbols-outlined text-lp-primary">expand_more</span>
                  </span>
                </summary>
                <div className="px-6 pb-6 pt-0 text-text-muted leading-relaxed">
                  <p>Diferente de SaaS tradicionais com mensalidades recorrentes, nosso modelo One-Time Fee permite que você pague apenas quando precisa realizar um scan. Você compra o crédito, executa o scan e recebe o relatório. Sem amarras.</p>
                </div>
              </details>
              <details className="group lp-glass-panel rounded-xl overflow-hidden border border-white/5 open:border-lp-primary/30 transition-all duration-300">
                <summary className="flex cursor-pointer items-center justify-between p-6 text-lg font-medium text-white hover:bg-white/5 transition-colors select-none">
                  <span>O que está incluído no re-teste gratuito?</span>
                  <span className="transition-transform group-open:rotate-180">
                    <span className="material-symbols-outlined text-lp-primary">expand_more</span>
                  </span>
                </summary>
                <div className="px-6 pb-6 pt-0 text-text-muted leading-relaxed">
                  <p>No plano Deep Scan Pro, após receber o relatório inicial e aplicar as correções sugeridas, você tem direito a executar um novo scan completo dentro de 30 dias para validar se as vulnerabilidades foram mitigadas corretamente.</p>
                </div>
              </details>
              <details className="group lp-glass-panel rounded-xl overflow-hidden border border-white/5 open:border-lp-primary/30 transition-all duration-300">
                <summary className="flex cursor-pointer items-center justify-between p-6 text-lg font-medium text-white hover:bg-white/5 transition-colors select-none">
                  <span>O scan afeta a performance do meu site?</span>
                  <span className="transition-transform group-open:rotate-180">
                    <span className="material-symbols-outlined text-lp-primary">expand_more</span>
                  </span>
                </summary>
                <div className="px-6 pb-6 pt-0 text-text-muted leading-relaxed">
                  <p>Nossos scanners são configurados para não causar DoS (Denial of Service). Ajustamos a taxa de requisições automaticamente para garantir que seu site permaneça online e funcional durante todo o processo de varredura.</p>
                </div>
              </details>
              <details className="group lp-glass-panel rounded-xl overflow-hidden border border-white/5 open:border-lp-primary/30 transition-all duration-300">
                <summary className="flex cursor-pointer items-center justify-between p-6 text-lg font-medium text-white hover:bg-white/5 transition-colors select-none">
                  <span>Quais tipos de vulnerabilidades são detectadas?</span>
                  <span className="transition-transform group-open:rotate-180">
                    <span className="material-symbols-outlined text-lp-primary">expand_more</span>
                  </span>
                </summary>
                <div className="px-6 pb-6 pt-0 text-text-muted leading-relaxed">
                  <p>Cobrimos todo o espectro do OWASP Top 10, incluindo SQL Injection (SQLi), Cross-Site Scripting (XSS), configurações incorretas de segurança, componentes vulneráveis, exposição de dados sensíveis e muito mais.</p>
                </div>
              </details>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#020617] border-t border-lp-border-neon/20 relative">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-[50%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-lp-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
          </div>
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-3xl font-display font-bold tracking-tight text-white sm:text-4xl mb-6">
              Pronto para blindar sua aplicação?
            </h2>
            <p className="text-lg text-text-muted mb-8 max-w-2xl mx-auto">
              Não espere o incidente acontecer. Segurança proativa é mais barata que a recuperação de dados.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={onStart}
                className="inline-flex items-center justify-center rounded-xl bg-lp-primary px-8 py-4 text-base font-bold text-primary-content shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] hover:bg-lp-primary/90 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined mr-2">rocket_launch</span>
                Começar Agora
              </button>
              <button className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-bold text-white border border-white/20 hover:bg-white/5 hover:border-lp-primary/50 transition-all cursor-pointer">
                <span className="material-symbols-outlined mr-2">support_agent</span>
                Falar com Especialista
              </button>
            </div>
          </div>
        </section>
      </main>

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
              <div className="flex gap-4">
                <a className="text-text-muted hover:text-lp-primary transition-colors" href="#">
                  <span className="sr-only">LinkedIn</span>
                  <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path clipRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" fillRule="evenodd"></path></svg>
                </a>
                <a className="text-text-muted hover:text-lp-primary transition-colors" href="#">
                  <span className="sr-only">Twitter</span>
                  <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Produto</h3>
              <ul className="space-y-3">
                <li><button onClick={() => {}} className="text-sm text-lp-primary font-bold transition-colors cursor-default text-left">Preços</button></li>
                <li><button onClick={onBack} className="text-sm text-text-muted hover:text-lp-primary transition-colors cursor-pointer text-left">Recursos</button></li>
                <li><button onClick={onHowItWorks} className="text-sm text-text-muted hover:text-lp-primary transition-colors cursor-pointer text-left">Como Funciona</button></li>
                <li><button onClick={onSampleReport} className="text-sm text-text-muted hover:text-lp-primary transition-colors cursor-pointer text-left">Relatório Exemplo</button></li>
                <li><button onClick={onApiDocs} className="text-sm text-text-muted hover:text-lp-primary transition-colors cursor-pointer text-left">API Docs</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Empresa</h3>
              <ul className="space-y-3">
                <li><button onClick={onAboutUs} className="text-sm text-text-muted hover:text-lp-primary transition-colors cursor-pointer text-left">Sobre Nós</button></li>
                <li><a className="text-sm text-text-muted hover:text-lp-primary transition-colors" href="#">Blog de Segurança</a></li>
                <li><button onClick={onContact} className="text-sm text-text-muted hover:text-lp-primary transition-colors cursor-pointer text-left">Contato</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Legal</h3>
              <ul className="space-y-3">
                <li><button onClick={onTerms} className="text-sm text-text-muted hover:text-lp-primary transition-colors cursor-pointer text-left">Termos de Uso</button></li>
                <li><button onClick={onPrivacy} className="text-sm text-text-muted hover:text-lp-primary transition-colors cursor-pointer text-left">Privacidade</button></li>
                <li><button onClick={onCookies} className="text-sm text-text-muted hover:text-lp-primary transition-colors cursor-pointer text-left">Cookies</button></li>
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
