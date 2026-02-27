import React from 'react';

interface LandingAboutUsPageProps {
  onBack: () => void;
  onStart: () => void;
  onLogin: () => void;
  onPricing: () => void;
  onHowItWorks: () => void;
}

export default function LandingAboutUsPage({ onBack, onStart, onLogin, onPricing, onHowItWorks }: LandingAboutUsPageProps) {
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
              <button onClick={onPricing} className="text-sm font-medium text-text-muted hover:text-lp-primary transition-colors cursor-pointer">Preços</button>
              <span className="text-sm font-bold text-lp-primary transition-colors drop-shadow-[0_0_8px_rgba(0,240,255,0.4)] cursor-default">Sobre Nós</span>
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
        <section className="relative pt-20 pb-20 sm:pt-32 sm:pb-24 lg:pb-32 overflow-hidden">
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-lp-secondary/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-lp-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <div className="inline-flex items-center rounded-full border border-lp-primary/30 bg-lp-primary/5 px-4 py-1.5 text-xs font-medium text-lp-primary mb-8 backdrop-blur-sm">
                <span className="tracking-wide uppercase font-mono">EST. 2026 • Belo Horizonte, BR</span>
              </div>
              <h1 className="font-display text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl mb-8 leading-tight">
                A defesa do <span className="text-gradient-neon">Ecossistema Digital</span> Brasileiro.
              </h1>
              <p className="text-xl text-text-muted font-light leading-relaxed max-w-2xl mx-auto">
                Nascemos com um propósito singular: democratizar a segurança ofensiva para startups e corporações na América Latina. Acreditamos que a confiança é a moeda do futuro.
              </p>
            </div>
            
            <div className="relative w-full h-px bg-gradient-to-r from-transparent via-lp-primary/30 to-transparent my-12">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-1 bg-lp-primary shadow-[0_0_15px_rgba(0,240,255,0.8)] rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center md:text-left">
              <div className="p-6 border-l border-lp-primary/20">
                <h3 className="text-4xl font-display font-bold text-white mb-2">2.5M+</h3>
                <p className="text-sm font-mono text-lp-primary uppercase tracking-widest mb-4">Ataques Mitigados</p>
                <p className="text-text-muted text-sm leading-relaxed">Protegemos ativamente a infraestrutura de nossos parceiros contra ameaças persistentes.</p>
              </div>
              <div className="p-6 border-l border-lp-secondary/20">
                <h3 className="text-4xl font-display font-bold text-white mb-2">99.9%</h3>
                <p className="text-sm font-mono text-lp-secondary uppercase tracking-widest mb-4">Uptime Garantido</p>
                <p className="text-text-muted text-sm leading-relaxed">Nossa tecnologia de varredura não interfere na estabilidade dos seus serviços críticos.</p>
              </div>
              <div className="p-6 border-l border-white/10">
                <h3 className="text-4xl font-display font-bold text-white mb-2">100%</h3>
                <p className="text-sm font-mono text-gray-400 uppercase tracking-widest mb-4">Foco em Compliance</p>
                <p className="text-text-muted text-sm leading-relaxed">Alinhados com LGPD e padrões internacionais de proteção de dados.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-[#070e1a] relative border-y border-white/5">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] opacity-30"></div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-display font-bold tracking-tight text-white sm:text-4xl mb-6">
                  Tecnologia <span className="text-lp-primary">Autônoma</span> de Ponta
                </h2>
                <p className="text-lg text-text-muted mb-8 leading-relaxed font-light">
                  Não usamos apenas ferramentas de mercado. Desenvolvemos o <strong>NeuralCore™</strong>, uma engine proprietária de IA que simula o comportamento de hackers reais (Black Hat) para identificar falhas lógicas complexas antes que elas sejam exploradas.
                </p>
                <div className="space-y-6">
                  <div className="lp-glass-panel p-4 rounded-xl border-l-4 border-lp-primary hover:bg-lp-surface-glass transition-colors">
                    <h4 className="text-white font-bold flex items-center gap-2 mb-1">
                      <span className="material-symbols-outlined text-lp-primary text-xl">psychology</span>
                      Deep Learning Reconnaissance
                    </h4>
                    <p className="text-sm text-text-muted">Mapeamento inteligente da superfície de ataque que aprende com cada scan.</p>
                  </div>
                  <div className="lp-glass-panel p-4 rounded-xl border-l-4 border-lp-secondary hover:bg-lp-surface-glass transition-colors">
                    <h4 className="text-white font-bold flex items-center gap-2 mb-1">
                      <span className="material-symbols-outlined text-lp-secondary text-xl">terminal</span>
                      Automated Penetration Testing
                    </h4>
                    <p className="text-sm text-text-muted">Execução segura de exploits controlados para validar falsos positivos.</p>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 relative flex justify-center">
                <div className="relative w-[400px] h-[400px]">
                  <div className="absolute inset-0 border border-lp-primary/20 rounded-full animate-spin-slow"></div>
                  <div className="absolute inset-8 border border-lp-secondary/20 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }}></div>
                  <div className="absolute inset-16 border border-white/5 rounded-full animate-pulse"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-lp-surface-dark rounded-full flex items-center justify-center border border-white/10 shadow-[0_0_50px_rgba(0,240,255,0.2)] z-10">
                    <span className="material-symbols-outlined text-lp-primary text-5xl">smart_toy</span>
                  </div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-lp-surface-dark p-2 rounded-lg border border-lp-primary/30 text-lp-primary">
                    <span className="material-symbols-outlined text-xl">lock</span>
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-lp-surface-dark p-2 rounded-lg border border-lp-secondary/30 text-lp-secondary">
                    <span className="material-symbols-outlined text-xl">key</span>
                  </div>
                  <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-lp-surface-dark p-2 rounded-lg border border-white/10 text-white">
                    <span className="material-symbols-outlined text-xl">bug_report</span>
                  </div>
                  <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 bg-lp-surface-dark p-2 rounded-lg border border-white/10 text-white">
                    <span className="material-symbols-outlined text-xl">shield</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-display font-bold tracking-tight text-white sm:text-4xl">Nossos Pilares</h2>
              <p className="mt-4 text-text-muted max-w-2xl mx-auto">Fundamentos inegociáveis que constroem a base da AuthBrasil.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group relative p-8 lp-glass-panel rounded-2xl hover:border-lp-primary/50 transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-lp-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="h-14 w-14 rounded-lg bg-lp-primary/10 flex items-center justify-center mb-6 text-lp-primary group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-3xl">visibility</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-display">Transparência Radical</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  Não vendemos "caixas pretas". Explicamos cada vulnerabilidade encontrada com clareza técnica e impacto de negócio real. Sem medo da verdade.
                </p>
              </div>
              <div className="group relative p-8 lp-glass-panel rounded-2xl hover:border-lp-secondary/50 transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-lp-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="h-14 w-14 rounded-lg bg-lp-secondary/10 flex items-center justify-center mb-6 text-lp-secondary group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-3xl">bolt</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-display">Velocidade Ofensiva</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  O cibercrime não dorme e não espera aprovações. Nossa resposta e nossos scans são instantâneos para manter você sempre à frente.
                </p>
              </div>
              <div className="group relative p-8 lp-glass-panel rounded-2xl hover:border-white/50 transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="h-14 w-14 rounded-lg bg-white/5 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-3xl">verified_user</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-display">Autoridade Técnica</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  Somos obcecados por excelência. Nossa equipe é formada por especialistas certificados que vivem e respiram segurança da informação.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-lp-surface-dark border-t border-white/5 relative">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <div>
                <h2 className="text-3xl font-display font-bold tracking-tight text-white sm:text-4xl mb-4">Liderança</h2>
                <p className="text-text-muted max-w-xl">Mentes focadas em construir o futuro da segurança cibernética.</p>
              </div>
              <div className="hidden md:block">
                <a className="text-lp-primary hover:text-white transition-colors text-sm font-bold flex items-center gap-2" href="#">
                  VER TODA A EQUIPE <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Rafael Santos */}
              <div className="group">
                <div className="aspect-[4/5] overflow-hidden rounded-xl bg-gray-800 mb-4 relative">
                  <div className="absolute inset-0 bg-cover bg-center grayscale-hover duration-500" style={{ backgroundImage: "url('https://picsum.photos/seed/rafael/400/500')" }}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <div className="flex gap-3">
                      <a className="text-white hover:text-lp-primary" href="#"><span className="sr-only">LinkedIn</span><svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg></a>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white font-display">Rafael Santos</h3>
                <p className="text-sm text-lp-primary font-mono mt-1">CEO & Founder</p>
                <p className="text-xs text-text-muted mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Ex-Red Team Lead em Big Techs.</p>
              </div>
              {/* Lucas Andrade */}
              <div className="group">
                <div className="aspect-[4/5] overflow-hidden rounded-xl bg-gray-800 mb-4 relative">
                  <div className="absolute inset-0 bg-cover bg-center grayscale-hover duration-500" style={{ backgroundImage: "url('https://picsum.photos/seed/lucas/400/500')" }}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <div className="flex gap-3">
                      <a className="text-white hover:text-lp-primary" href="#"><span className="sr-only">LinkedIn</span><svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg></a>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white font-display">Lucas Andrade</h3>
                <p className="text-sm text-lp-secondary font-mono mt-1">CTO</p>
                <p className="text-xs text-text-muted mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Arquiteto de IA e Automação.</p>
              </div>
              {/* Mariana Costa */}
              <div className="group">
                <div className="aspect-[4/5] overflow-hidden rounded-xl bg-gray-800 mb-4 relative">
                  <div className="absolute inset-0 bg-cover bg-center grayscale-hover duration-500" style={{ backgroundImage: "url('https://picsum.photos/seed/mariana/400/500')" }}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <div className="flex gap-3">
                      <a className="text-white hover:text-lp-primary" href="#"><span className="sr-only">LinkedIn</span><svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg></a>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white font-display">Mariana Costa</h3>
                <p className="text-sm text-text-muted font-mono mt-1">Head of Security</p>
                <p className="text-xs text-text-muted mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Especialista em Criptografia.</p>
              </div>
              {/* Felipe Silva */}
              <div className="group">
                <div className="aspect-[4/5] overflow-hidden rounded-xl bg-gray-800 mb-4 relative">
                  <div className="absolute inset-0 bg-cover bg-center grayscale-hover duration-500" style={{ backgroundImage: "url('https://picsum.photos/seed/felipe/400/500')" }}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <div className="flex gap-3">
                      <a className="text-white hover:text-lp-primary" href="#"><span className="sr-only">LinkedIn</span><svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg></a>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white font-display">Felipe Silva</h3>
                <p className="text-sm text-text-muted font-mono mt-1">Lead Developer</p>
                <p className="text-xs text-text-muted mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Full-Stack Security Engineer.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-lp-background-dark to-lp-surface-dark"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-lp-primary/50 to-transparent"></div>
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-3xl font-display font-bold tracking-tight text-white sm:text-4xl mb-6">
              Pronto para elevar seu <span className="text-lp-primary">Nível de Segurança</span>?
            </h2>
            <p className="text-lg text-text-muted mb-10 max-w-2xl mx-auto">
              Junte-se a centenas de empresas que confiam na AuthBrasil. Proteção proativa começa hoje.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={onStart}
                className="inline-flex items-center justify-center rounded-xl bg-lp-primary px-8 py-4 text-base font-bold text-primary-content shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] hover:bg-lp-primary/90 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined mr-2">rocket_launch</span>
                Falar com Especialista
              </button>
              <button className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-bold text-white border border-white/20 hover:bg-white/5 hover:border-lp-primary/50 transition-all cursor-pointer">
                Ver Vagas Abertas
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
                <li><button onClick={onPricing} className="text-sm text-text-muted hover:text-lp-primary transition-colors cursor-pointer">Preços</button></li>
                <li><button onClick={onHowItWorks} className="text-sm text-text-muted hover:text-lp-primary transition-colors cursor-pointer">Como Funciona</button></li>
                <li><a className="text-sm text-text-muted hover:text-lp-primary transition-colors" href="#">Relatório Exemplo</a></li>
                <li><a className="text-sm text-text-muted hover:text-lp-primary transition-colors" href="#">API Docs</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Empresa</h3>
              <ul className="space-y-3">
                <li><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-sm text-lp-primary hover:text-white transition-colors cursor-pointer">Sobre Nós</button></li>
                <li><a className="text-sm text-text-muted hover:text-lp-primary transition-colors" href="#">Carreiras</a></li>
                <li><a className="text-sm text-text-muted hover:text-lp-primary transition-colors" href="#">Blog de Segurança</a></li>
                <li><a className="text-sm text-text-muted hover:text-lp-primary transition-colors" href="#">Contato</a></li>
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
