import React from 'react';

interface LandingPageProps {
  onStart: () => void;
  onLogin: () => void;
  onPricing: () => void;
  onHowItWorks: () => void;
  onAboutUs: () => void;
}

export default function LandingPage({ onStart, onLogin, onPricing, onHowItWorks, onAboutUs }: LandingPageProps) {
  return (
    <div className="font-body antialiased overflow-x-hidden bg-cyber-mesh min-h-screen flex flex-col selection:bg-lp-primary selection:text-primary-content">
      <header className="sticky top-0 z-50 w-full border-b border-lp-border-neon bg-lp-surface-dark/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-lp-primary/10 text-lp-primary border border-lp-primary/30">
                <span className="absolute inset-0 rounded-lg bg-lp-primary/20 blur-sm"></span>
                <span className="relative material-symbols-outlined" style={{ fontSize: '24px' }}>shield_lock</span>
              </div>
              <span className="text-xl font-display font-bold tracking-tight text-text-main">AuthBrasil<span className="text-lp-primary">.io</span></span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a className="text-sm font-medium text-text-muted hover:text-lp-primary transition-colors hover:shadow-[0_0_10px_rgba(0,240,255,0.3)]" href="#">Recursos</a>
              <button onClick={onHowItWorks} className="text-sm font-medium text-text-muted hover:text-lp-primary transition-colors cursor-pointer">Como Funciona</button>
              <button onClick={onPricing} className="text-sm font-medium text-text-muted hover:text-lp-primary transition-colors cursor-pointer">Preços</button>
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
        
        <section className="relative pt-16 pb-12 sm:pt-24 sm:pb-20 lg:pb-28 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center rounded-full border border-lp-primary/30 bg-lp-primary/5 px-4 py-1.5 text-xs font-medium text-lp-primary mb-8 backdrop-blur-sm shadow-[0_0_10px_rgba(0,240,255,0.1)]">
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lp-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-lp-primary"></span>
                  </span>
                  <span className="tracking-wide uppercase">Engine V1.0 Online • Auditoria Instantânea</span>
                </div>
                <h1 className="font-display text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl mb-6 leading-tight">
                  <span className="text-gradient-metallic block mb-2">Segurança Ofensiva</span>
                  <span className="text-gradient-neon text-glow">Sob Demanda</span>
                </h1>
                <p className="mx-auto lg:mx-0 max-w-2xl text-lg text-text-muted mb-10 leading-relaxed font-light">
                  Identifique falhas críticas com scans DAST automatizados de alta precisão. Sem assinaturas ou contratos mensais: valide sua aplicação e pague apenas por cada auditoria realizada.
                </p>
                
                <div className="relative max-w-xl mx-auto lg:mx-0 mb-10 group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-lp-primary via-lp-secondary to-lp-primary rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative flex items-center bg-lp-surface-dark border border-white/10 rounded-xl p-2 shadow-2xl">
                    <div className="pl-4 text-text-muted">
                      <span className="material-symbols-outlined">link</span>
                    </div>
                    <input 
                      className="w-full bg-transparent border-none text-text-main placeholder-text-muted focus:ring-0 px-4 py-2 font-mono text-sm outline-none" 
                      placeholder="Cole sua URL ou Repositório Git..." 
                      type="text"
                    />
                    <button 
                      onClick={onStart}
                      className="flex-none bg-lp-primary hover:bg-lp-primary/90 text-primary-content font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      SCAN
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                  <div className="flex justify-between px-2 mt-2">
                    <span className="text-xs text-text-muted flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-green-500"></span> Engine Ativa</span>
                    <span className="text-xs text-text-muted font-mono">:: WAITING FOR INPUT_</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-text-muted">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5">
                    <span className="material-symbols-outlined text-lp-primary" style={{ fontSize: '18px' }}>verified</span>
                    <span>Padrão OWASP & CVSS</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5">
                    <span className="material-symbols-outlined text-lp-primary" style={{ fontSize: '18px' }}>bolt</span>
                    <span>Scan em &lt;5min</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 w-full max-md:mt-12 lg:max-w-full flex justify-center items-center perspective-1000">
                <div className="relative w-[380px] h-[480px] animate-float">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-lp-primary/20 rounded-full blur-[80px]"></div>
                  <div className="relative h-full w-full lp-glass-panel rounded-3xl p-8 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col justify-between overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lp-primary/5 to-transparent h-[20%] w-full animate-scan-vertical pointer-events-none opacity-50"></div>
                    
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-lp-primary/20 text-lp-primary border border-lp-primary/30">
                            <span className="material-symbols-outlined animate-pulse">psychology</span>
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-white font-display">NeuralCore™</h3>
                            <p className="text-xs text-lp-primary font-mono tracking-wider uppercase">Engine Ativa • V1.0</p>
                          </div>
                        </div>
                        <span className="inline-flex items-center rounded bg-lp-secondary/20 border border-lp-secondary/40 px-2 py-1 text-[10px] font-bold text-purple-200 uppercase">
                          Proprietary Tech
                        </span>
                      </div>

                      <div className="space-y-6 mb-8">
                        <div className="relative h-28 w-full bg-lp-surface-dark/50 rounded-xl border border-white/5 overflow-hidden flex items-center justify-center">
                          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:10px_10px]"></div>
                          <div className="relative z-10 flex flex-col items-center">
                            <div className="flex gap-1.5 mb-3">
                              {[...Array(8)].map((_, i) => (
                                <div key={i} className="w-1.5 h-6 bg-lp-primary/40 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
                              ))}
                            </div>
                            <span className="text-[10px] font-mono text-lp-primary/80 uppercase tracking-[0.2em] text-center">Analisando Vetores de Ataque...</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-lp-primary/30 transition-colors group/item">
                            <span className="material-symbols-outlined text-lp-primary text-sm mb-1 group-hover/item:scale-110 transition-transform">radar</span>
                            <p className="text-[10px] text-text-muted uppercase font-bold">Mapeamento</p>
                            <p className="text-xs text-white font-medium">Full Surface Scan</p>
                          </div>
                          <div className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-lp-secondary/30 transition-colors group/item">
                            <span className="material-symbols-outlined text-lp-secondary text-sm mb-1 group-hover/item:scale-110 transition-transform">security</span>
                            <p className="text-[10px] text-text-muted uppercase font-bold">Defesa</p>
                            <p className="text-xs text-white font-medium">OWASP Top 10</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={onHowItWorks}
                      className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-lp-primary to-lp-secondary p-[1px] group cursor-pointer"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-lp-primary to-lp-secondary opacity-50 blur-sm"></span>
                      <div className="relative bg-lp-surface-dark w-full h-full rounded-xl py-3 px-4 flex items-center justify-center gap-2 group-hover:bg-opacity-80 transition-all">
                        <span className="text-sm font-bold text-white">CONHECER TECNOLOGIA</span>
                        <span className="material-symbols-outlined text-white text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                      </div>
                    </button>

                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-lp-primary/10 rounded-full blur-3xl"></div>
                  </div>
                  
                  <div className="absolute -right-8 top-10 p-3 lp-glass-panel rounded-lg border-l-2 border-lp-primary animate-pulse shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                    <span className="material-symbols-outlined text-lp-primary">bug_report</span>
                  </div>
                  <div className="absolute -left-4 bottom-20 p-3 lp-glass-panel rounded-lg border-r-2 border-lp-secondary animate-pulse delay-700 shadow-[0_0_20px_rgba(112,0,255,0.2)]">
                    <span className="material-symbols-outlined text-lp-secondary">database</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="border-y border-white/5 bg-black/20 py-8 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 mb-4">
            <p className="text-center text-xs font-mono text-text-muted tracking-[0.2em] uppercase">Compatibilidade Total</p>
          </div>
          <div className="scroller w-full">
            <div className="scroller__inner text-text-muted font-display font-bold text-xl opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              <span className="flex items-center gap-2"><span className="material-symbols-outlined">code</span> NODE.JS</span>
              <span className="flex items-center gap-2"><span className="material-symbols-outlined">terminal</span> PYTHON</span>
              <span className="flex items-center gap-2"><span className="material-symbols-outlined">html</span> REACT</span>
              <span className="flex items-center gap-2"><span className="material-symbols-outlined">php</span> PHP</span>
              <span className="flex items-center gap-2"><span className="material-symbols-outlined">api</span> LARAVEL</span>
              <span className="flex items-center gap-2"><span className="material-symbols-outlined">deployed_code</span> DOCKER</span>
              <span className="flex items-center gap-2"><span className="material-symbols-outlined">cloud</span> AWS</span>
              <span className="flex items-center gap-2"><span className="material-symbols-outlined">storage</span> MONGODB</span>
              <span className="flex items-center gap-2"><span className="material-symbols-outlined">code</span> NODE.JS</span>
              <span className="flex items-center gap-2"><span className="material-symbols-outlined">terminal</span> PYTHON</span>
              <span className="flex items-center gap-2"><span className="material-symbols-outlined">html</span> REACT</span>
              <span className="flex items-center gap-2"><span className="material-symbols-outlined">php</span> PHP</span>
              <span className="flex items-center gap-2"><span className="material-symbols-outlined">api</span> LARAVEL</span>
            </div>
          </div>
        </div>

        <div className="border-b border-lp-border-neon/20 bg-lp-surface-dark/30 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="flex flex-col items-center justify-center text-center group">
                <dt className="order-2 mt-2 text-xs font-mono text-text-muted uppercase tracking-wider">Scans Realizados</dt>
                <dd className="order-1 text-3xl font-display font-bold text-white group-hover:text-lp-primary transition-colors tracking-tight shadow-lp-primary drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">+15.000</dd>
              </div>
              <div className="flex flex-col items-center justify-center text-center group">
                <dt className="order-2 mt-2 text-xs font-mono text-text-muted uppercase tracking-wider">Vulnerabilidades</dt>
                <dd className="order-1 text-3xl font-display font-bold text-white group-hover:text-lp-secondary transition-colors tracking-tight drop-shadow-[0_0_10px_rgba(112,0,255,0.5)]">+85k</dd>
              </div>
              <div className="flex flex-col items-center justify-center text-center group">
                <dt className="order-2 mt-2 text-xs font-mono text-text-muted uppercase tracking-wider">Empresas Seguras</dt>
                <dd className="order-1 text-3xl font-display font-bold text-white group-hover:text-lp-primary transition-colors tracking-tight drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">+1.200</dd>
              </div>
              <div className="flex flex-col items-center justify-center text-center group">
                <dt className="order-2 mt-2 text-xs font-mono text-text-muted uppercase tracking-wider">Score Médio</dt>
                <dd className="order-1 text-3xl font-display font-bold text-white group-hover:text-lp-secondary transition-colors tracking-tight drop-shadow-[0_0_10px_rgba(112,0,255,0.5)]">4.9/5</dd>
              </div>
            </div>
          </div>
        </div>

        <section className="py-24 relative bg-[#070e1a]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-3xl font-display font-bold tracking-tight text-white sm:text-4xl mb-4">
                Protocolo de <span className="text-lp-primary">Segurança</span>
              </h2>
              <p className="text-lg text-text-muted font-light">
                Inicialize a proteção do seu sistema em três passos de alta precisão.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              <div className="group relative p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-lp-primary/50 transition-all duration-500">
                <div className="absolute inset-0 bg-lp-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative h-full flex flex-col items-center text-center p-8 rounded-xl bg-lp-surface-dark border border-white/5 group-hover:border-lp-primary/50 transition-colors">
                  <div className="absolute -top-6 bg-lp-surface-dark border border-white/10 text-lp-primary font-mono text-sm py-1 px-3 rounded-full">STEP 01</div>
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-lp-surface-dark border border-lp-primary/20 text-lp-primary mb-6 shadow-[0_0_20px_rgba(0,240,255,0.15)] group-hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all">
                    <span className="material-symbols-outlined" style={{ fontSize: '36px' }}>dns</span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-lp-primary transition-colors">Target Configuration</h3>
                  <p className="text-text-muted text-sm leading-relaxed">Insira endpoint URL ou repositório. Validação de handshake automatizada via DNS verification.</p>
                  <div className="mt-6 w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div className="w-1/3 h-full bg-lp-primary/50"></div>
                  </div>
                </div>
              </div>
              <div className="group relative p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-lp-secondary/50 transition-all duration-500">
                <div className="absolute inset-0 bg-lp-secondary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative h-full flex flex-col items-center text-center p-8 rounded-xl bg-lp-surface-dark border border-white/5 group-hover:border-lp-secondary/50 transition-colors">
                  <div className="absolute -top-6 bg-lp-surface-dark border border-white/10 text-lp-secondary font-mono text-sm py-1 px-3 rounded-full">STEP 02</div>
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-lp-surface-dark border border-lp-secondary/20 text-lp-secondary mb-6 shadow-[0_0_20px_rgba(112,0,255,0.15)] group-hover:shadow-[0_0_30px_rgba(112,0,255,0.4)] transition-all">
                    <span className="material-symbols-outlined animate-pulse" style={{ fontSize: '36px' }}>smart_toy</span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-lp-secondary transition-colors">Neural Scanning</h3>
                  <p className="text-text-muted text-sm leading-relaxed">Bots autônomos executam penetration testing em +1000 vetores de ataque simultâneos.</p>
                  <div className="mt-6 w-full flex gap-1 justify-center">
                    <span className="w-1 h-1 bg-lp-secondary rounded-full animate-bounce"></span>
                    <span className="w-1 h-1 bg-lp-secondary rounded-full animate-bounce delay-75"></span>
                    <span className="w-1 h-1 bg-lp-secondary rounded-full animate-bounce delay-150"></span>
                  </div>
                </div>
              </div>
              <div className="group relative p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-lp-primary/50 transition-all duration-500">
                <div className="absolute inset-0 bg-lp-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative h-full flex flex-col items-center text-center p-8 rounded-xl bg-lp-surface-dark border border-white/5 group-hover:border-lp-primary/50 transition-colors">
                  <div className="absolute -top-6 bg-lp-surface-dark border border-white/10 text-lp-primary font-mono text-sm py-1 px-3 rounded-full">STEP 03</div>
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-lp-surface-dark border border-lp-primary/20 text-lp-primary mb-6 shadow-[0_0_20px_rgba(0,240,255,0.15)] group-hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all">
                    <span className="material-symbols-outlined" style={{ fontSize: '36px' }}>sim_card_download</span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-lp-primary transition-colors">Data Extraction</h3>
                  <p className="text-text-muted text-sm leading-relaxed">Geração de relatório criptografado com classificação de risco CVSS e patches sugeridos.</p>
                  <div className="mt-6 flex items-center justify-center gap-2">
                    <span className="text-[10px] font-mono text-green-400">DOWNLOAD_READY</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-lp-bg-dark relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
            <div className="absolute top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-lp-primary/20 blur-[100px]"></div>
            <div className="absolute bottom-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-lp-secondary/20 blur-[100px]"></div>
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-display font-bold tracking-tight text-white sm:text-4xl mb-4">Feedback da Rede</h2>
                <p className="text-lg text-text-muted">Operadores que validaram sua segurança conosco.</p>
              </div>
              <div className="flex gap-2">
                <button className="h-10 w-10 rounded-full border border-white/10 bg-lp-surface-dark flex items-center justify-center text-white hover:bg-white/10 transition-colors cursor-pointer">
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="h-10 w-10 rounded-full bg-lp-primary flex items-center justify-center text-primary-content hover:bg-lp-primary/90 transition-colors shadow-[0_0_15px_rgba(0,240,255,0.3)] cursor-pointer">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="lp-glass-panel p-6 rounded-2xl hover:border-lp-primary/30 transition-colors group">
                <div className="flex gap-1 mb-4 text-lp-primary">
                  <span className="material-symbols-outlined fill-current text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined fill-current text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined fill-current text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined fill-current text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined fill-current text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed font-light text-sm">"Execução impecável. O relatório apontou falhas críticas de SQLi que ferramentas open-source ignoraram. ROI imediato."</p>
                <div className="flex items-center gap-4 border-t border-white/5 pt-4">
                  <div className="h-10 w-10 rounded-full bg-slate-800 border border-white/10 bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/user1/100/100')" }}></div>
                  <div>
                    <p className="text-sm font-bold text-white group-hover:text-lp-primary transition-colors">Carlos Mendes</p>
                    <p className="text-xs text-text-muted font-mono">CTO @ FinTech_Sol</p>
                  </div>
                </div>
              </div>
              <div className="lp-glass-panel p-6 rounded-2xl hover:border-lp-secondary/30 transition-colors group">
                <div className="flex gap-1 mb-4 text-lp-secondary">
                  <span className="material-symbols-outlined fill-current text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined fill-current text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined fill-current text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined fill-current text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined fill-current text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed font-light text-sm">"Interface futurista mas com resultados sólidos. A correção das vulnerabilidades foi validada no re-teste gratuito."</p>
                <div className="flex items-center gap-4 border-t border-white/5 pt-4">
                  <div className="h-10 w-10 rounded-full bg-slate-800 border border-white/10 bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/user2/100/100')" }}></div>
                  <div>
                    <p className="text-sm font-bold text-white group-hover:text-lp-secondary transition-colors">Ana Souza</p>
                    <p className="text-xs text-text-muted font-mono">Lead @ E-commerce_BR</p>
                  </div>
                </div>
              </div>
              <div className="lp-glass-panel p-6 rounded-2xl hover:border-lp-primary/30 transition-colors hidden md:block group">
                <div className="flex gap-1 mb-4 text-lp-primary">
                  <span className="material-symbols-outlined fill-current text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined fill-current text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined fill-current text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined fill-current text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined fill-current text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>star</span>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed font-light text-sm">"Eficiência máxima. O modelo One-Time Fee é perfeito para startups validarem MVP com segurança corporativa."</p>
                <div className="flex items-center gap-4 border-t border-white/5 pt-4">
                  <div className="h-10 w-10 rounded-full bg-slate-800 border border-white/10 bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/user3/100/100')" }}></div>
                  <div>
                    <p className="text-sm font-bold text-white group-hover:text-lp-primary transition-colors">Roberto Lima</p>
                    <p className="text-xs text-text-muted font-mono">CEO @ TechStart</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#020617] border-t border-lp-border-neon/20 relative">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-[50%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-lp-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
          </div>
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-3xl font-display font-bold tracking-tight text-white sm:text-4xl mb-6">
              Status do Sistema: <span className="text-red-400 animate-pulse">Vulnerável?</span>
            </h2>
            <p className="text-lg text-text-muted mb-8 max-w-2xl mx-auto">
              Não deixe portas abertas. Execute o protocolo de segurança completo hoje.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={onStart}
                className="inline-flex items-center justify-center rounded-xl bg-lp-primary px-8 py-4 text-base font-bold text-primary-content shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] hover:bg-lp-primary/90 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined mr-2">rocket_launch</span>
                Inicializar Scan
              </button>
              <button className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-bold text-white border border-white/20 hover:bg-white/5 hover:border-lp-primary/50 transition-all cursor-pointer">
                <span className="material-symbols-outlined mr-2">code</span>
                Documentação API
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
                <li><a className="text-sm text-text-muted hover:text-lp-primary transition-colors" href="#">Recursos</a></li>
                <li><a className="text-sm text-text-muted hover:text-lp-primary transition-colors" href="#">Relatório Exemplo</a></li>
                <li><a className="text-sm text-text-muted hover:text-lp-primary transition-colors" href="#">API Docs</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Empresa</h3>
              <ul className="space-y-3">
                <li><button onClick={onAboutUs} className="text-sm text-text-muted hover:text-lp-primary transition-colors cursor-pointer">Sobre Nós</button></li>
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
