import React from 'react';

interface LandingHowItWorksPageProps {
  onBack: () => void;
  onStart: () => void;
  onLogin: () => void;
  onPricing: () => void;
  onAboutUs: () => void;
  onSampleReport: () => void;
  onApiDocs: () => void;
  onContact: () => void;
  onTerms: () => void;
  onPrivacy: () => void;
  onCookies: () => void;
}

export default function LandingHowItWorksPage({ onBack, onStart, onLogin, onPricing, onAboutUs, onSampleReport, onApiDocs, onContact, onTerms, onPrivacy, onCookies }: LandingHowItWorksPageProps) {
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
              <span className="text-sm font-medium text-lp-primary transition-colors cursor-default">Como Funciona</span>
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
        <section className="relative pt-20 pb-16 overflow-hidden">
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-lp-secondary/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-lp-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center rounded-full border border-lp-primary/30 bg-lp-primary/5 px-4 py-1.5 text-xs font-medium text-lp-primary mb-6 backdrop-blur-sm">
              <span className="material-symbols-outlined text-[16px] mr-2 animate-pulse">radar</span>
              DAST ENGINE V1.0 • MONITORAMENTO ATIVO
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
              <span className="text-white">Pipeline de</span> <span className="text-gradient-neon text-glow">Análise Dinâmica</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-text-muted font-light leading-relaxed">
              Nossa engine DAST (Dynamic Application Security Testing) simula ataques reais em tempo de execução para identificar vulnerabilidades críticas antes dos hackers.
            </p>
          </div>
        </section>

        {/* NeuralCore Intelligence Section */}
        <section className="py-12 relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="lp-glass-panel rounded-3xl p-8 lg:p-12 border border-lp-border-neon/30 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-9xl text-lp-primary">psychology</span>
              </div>
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                <div className="lg:col-span-1">
                  <h2 className="text-3xl font-display font-bold text-white mb-6">O Cérebro do Scan: <span className="text-lp-primary">NeuralCore™</span></h2>
                  <p className="text-text-muted mb-8 leading-relaxed">
                    Diferente de scanners tradicionais que apenas "atiram para todos os lados", o NeuralCore™ utiliza uma camada de inteligência heurística para entender o contexto da sua aplicação.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-lp-primary/20 flex items-center justify-center border border-lp-primary/30">
                        <span className="material-symbols-outlined text-lp-primary text-sm">auto_awesome</span>
                      </div>
                      <span className="text-sm font-bold text-white uppercase tracking-wider">Análise Adaptativa</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-lp-secondary/20 flex items-center justify-center border border-lp-secondary/30">
                        <span className="material-symbols-outlined text-lp-secondary text-sm">model_training</span>
                      </div>
                      <span className="text-sm font-bold text-white uppercase tracking-wider">Payloads Contextuais</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-lp-surface-dark/40 border border-white/5 p-6 rounded-2xl hover:border-lp-primary/40 transition-colors">
                    <h4 className="text-lp-primary font-bold mb-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">query_stats</span>
                      Heurística de Descoberta
                    </h4>
                    <p className="text-xs text-text-muted leading-relaxed">
                      Mapeamos não apenas URLs, mas o comportamento esperado de cada endpoint. Isso permite identificar falhas de lógica que ferramentas comuns ignoram.
                    </p>
                  </div>
                  <div className="bg-lp-surface-dark/40 border border-white/5 p-6 rounded-2xl hover:border-lp-secondary/40 transition-colors">
                    <h4 className="text-lp-secondary font-bold mb-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">terminal</span>
                      Injeção Polimórfica
                    </h4>
                    <p className="text-xs text-text-muted leading-relaxed">
                      Nossos payloads se adaptam em tempo real. Se o NeuralCore™ detecta um WAF, ele altera a codificação do ataque para validar se a proteção é contornável.
                    </p>
                  </div>
                  <div className="bg-lp-surface-dark/40 border border-white/5 p-6 rounded-2xl hover:border-lp-primary/40 transition-colors">
                    <h4 className="text-lp-primary font-bold mb-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">visibility</span>
                      Validação Comportamental
                    </h4>
                    <p className="text-xs text-text-muted leading-relaxed">
                      Zero Falso-Positivo. Confirmamos a vulnerabilidade observando efeitos colaterais reais (como tempo de resposta ou vazamento de dados controlados).
                    </p>
                  </div>
                  <div className="bg-lp-surface-dark/40 border border-white/5 p-6 rounded-2xl hover:border-lp-secondary/40 transition-colors">
                    <h4 className="text-lp-secondary font-bold mb-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">history_edu</span>
                      Dossiê de Exploração
                    </h4>
                    <p className="text-xs text-text-muted leading-relaxed">
                      Cada falha encontrada acompanha um "Proof of Concept" (PoC) detalhado, provando exatamente como o ataque foi bem-sucedido.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative pb-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-20 w-0.5 bg-gradient-to-b from-lp-primary via-lp-secondary to-transparent -translate-x-1/2 z-0 opacity-50"></div>
            
            {/* Step 01 */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-24 lg:mb-32">
              <div className="order-2 lg:order-1 relative group">
                <div className="hidden lg:block absolute top-1/2 -right-[50px] w-4 h-4 rounded-full bg-lp-primary border-4 border-lp-surface-dark z-20 shadow-[0_0_15px_rgba(0,240,255,0.8)] translate-x-1/2"></div>
                <div className="lp-glass-panel rounded-2xl p-8 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="absolute -top-6 -left-6 bg-lp-surface-dark border border-lp-primary/30 text-lp-primary font-mono text-xl w-12 h-12 flex items-center justify-center rounded-lg shadow-[0_0_15px_rgba(0,240,255,0.2)]">01</div>
                  <h3 className="text-2xl font-display font-bold text-white mb-4">Target & Handshake</h3>
                  <p className="text-text-muted mb-6">
                    Insira a URL da sua aplicação. Nossa engine realiza um mapeamento completo da superfície de ataque, identificando rotas, parâmetros e tecnologias expostas.
                  </p>
                  <div className="bg-[#0b1221] rounded-lg p-4 border border-white/5 font-mono text-xs text-gray-400 shadow-inner">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-2">
                      <span className="text-green-400">user@authbrasil:~$</span>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p>&gt; scan_init --url="https://api.target-app.com"</p>
                      <p className="text-blue-400">&gt; Crawling endpoints... [FOUND 42]</p>
                      <p className="text-blue-400">&gt; Fingerprinting server... [NGINX/V1.18]</p>
                      <p className="text-yellow-400 animate-pulse">&gt; STARTING DYNAMIC ATTACK VECTORS...</p>
                    </div>
                  </div>
                  <div className="mt-6 flex gap-3">
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono flex items-center gap-1 text-gray-300">
                      GitHub
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono flex items-center gap-1 text-gray-300">
                      GitLab
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono flex items-center gap-1 text-gray-300">
                      <span className="material-symbols-outlined text-[14px]">link</span> Public URL
                    </span>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2 flex justify-center lg:justify-start">
                <div className="relative w-full max-w-sm aspect-square">
                  <div className="absolute inset-0 bg-lp-primary/20 blur-[60px] rounded-full"></div>
                  <div className="relative h-full w-full border border-lp-primary/20 rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite]">
                    <div className="absolute top-0 left-1/2 w-2 h-2 bg-lp-primary rounded-full shadow-[0_0_10px_#00f0ff]"></div>
                    <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-lp-primary rounded-full shadow-[0_0_10px_#00f0ff]"></div>
                  </div>
                  <div className="absolute inset-[15%] border border-dashed border-lp-primary/40 rounded-full flex items-center justify-center animate-[spin_15s_linear_infinite_reverse]"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="material-symbols-outlined text-6xl text-white drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]">webhook</span>
                  </div>
                  <div className="absolute top-[20%] right-[10%] bg-lp-surface-dark border border-white/10 p-2 rounded text-xs font-mono text-green-400 shadow-lg animate-float">
                    200 OK
                  </div>
                  <div className="absolute bottom-[20%] left-[10%] bg-lp-surface-dark border border-white/10 p-2 rounded text-xs font-mono text-lp-primary shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                    SECURE
                  </div>
                </div>
              </div>
            </div>

            {/* Step 02 */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-24 lg:mb-32">
              <div className="order-1 flex justify-center lg:justify-end">
                <div className="relative w-full max-w-sm aspect-square">
                  <div className="absolute inset-0 bg-lp-secondary/20 blur-[60px] rounded-full"></div>
                  <div className="relative h-full w-full bg-lp-surface-dark/50 border border-lp-secondary/30 rounded-xl overflow-hidden backdrop-blur-sm">
                    <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-1 opacity-20">
                      <div className="bg-lp-secondary/20 animate-pulse"></div><div className="bg-transparent"></div><div className="bg-lp-secondary/10"></div><div className="bg-transparent"></div>
                      <div className="bg-transparent"></div><div className="bg-lp-secondary/30 animate-pulse" style={{ animationDelay: '0.5s' }}></div><div className="bg-transparent"></div><div className="bg-lp-secondary/10"></div>
                      <div className="bg-lp-secondary/10"></div><div className="bg-transparent"></div><div className="bg-lp-secondary/40 animate-pulse" style={{ animationDelay: '1s' }}></div><div className="bg-transparent"></div>
                      <div className="bg-transparent"></div><div className="bg-lp-secondary/10"></div><div className="bg-transparent"></div><div className="bg-lp-secondary/20"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-lp-secondary text-sm animate-pulse">psychology</span>
                        <span className="text-lp-secondary font-mono text-xs tracking-widest">NEURALCORE_ENGINE</span>
                      </div>
                      <div className="w-32 h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-lp-secondary to-lp-primary w-2/3 animate-scan-line"></div>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-2 text-[10px] font-mono text-text-muted">
                        <span className="flex items-center gap-1"><span className="w-1 h-1 bg-red-500 rounded-full"></span>SQLi</span>
                        <span className="flex items-center gap-1"><span className="w-1 h-1 bg-red-500 rounded-full"></span>XSS</span>
                        <span className="flex items-center gap-1"><span className="w-1 h-1 bg-orange-500 rounded-full"></span>Auth</span>
                        <span className="flex items-center gap-1"><span className="w-1 h-1 bg-yellow-500 rounded-full"></span>Config</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-2 relative group">
                <div className="hidden lg:block absolute top-1/2 -left-[50px] w-4 h-4 rounded-full bg-lp-secondary border-4 border-lp-surface-dark z-20 shadow-[0_0_15px_rgba(112,0,255,0.8)] -translate-x-1/2"></div>
                <div className="lp-glass-panel rounded-2xl p-8 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="absolute -top-6 -right-6 lg:-left-6 bg-lp-surface-dark border border-lp-secondary/30 text-lp-secondary font-mono text-xl w-12 h-12 flex items-center justify-center rounded-lg shadow-[0_0_15px_rgba(112,0,255,0.2)]">02</div>
                  <h3 className="text-2xl font-display font-bold text-white mb-4">Deep DAST Scanning</h3>
                  <p className="text-text-muted mb-6">
                    Alimentado pelo <span className="text-lp-primary font-bold">NeuralCore™</span>, nossos bots executam milhares de payloads inteligentes em tempo real contra sua aplicação, testando vulnerabilidades de injeção e falhas de lógica complexas.
                  </p>
                  <ul className="space-y-3 font-mono text-xs">
                    <li className="flex items-center gap-3 text-gray-300">
                      <span className="material-symbols-outlined text-lp-secondary text-sm">check_circle</span>
                      Fuzzing de Parâmetros e Headers HTTP
                    </li>
                    <li className="flex items-center gap-3 text-gray-300">
                      <span className="material-symbols-outlined text-lp-secondary text-sm">check_circle</span>
                      Detecção de SQLi, XSS e SSRF em Runtime
                    </li>
                    <li className="flex items-center gap-3 text-gray-300">
                      <span className="material-symbols-outlined text-lp-secondary text-sm">check_circle</span>
                      Análise de Segurança de Cookies e JWT
                    </li>
                    <li className="flex items-center gap-3 text-lp-primary/50 italic">
                      <span className="material-symbols-outlined text-sm">hourglass_empty</span>
                      Análise de Código (SAST) - Disponível na V2.0
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 03 */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <div className="order-2 lg:order-1 relative group">
                <div className="hidden lg:block absolute top-1/2 -right-[50px] w-4 h-4 rounded-full bg-white border-4 border-lp-surface-dark z-20 shadow-[0_0_15px_rgba(255,255,255,0.5)] translate-x-1/2"></div>
                <div className="lp-glass-panel rounded-2xl p-8 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="absolute -top-6 -left-6 bg-lp-surface-dark border border-white/20 text-white font-mono text-xl w-12 h-12 flex items-center justify-center rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.1)]">03</div>
                  <h3 className="text-2xl font-display font-bold text-white mb-4">Relatório & Auto-Fix</h3>
                  <p className="text-text-muted mb-6">
                    Receba um dossiê técnico detalhado. Mais do que apontar o erro, fornecemos o snippet de código corrigido pronto para commit.
                  </p>
                  <div className="rounded-lg overflow-hidden border border-white/10 bg-[#0f172a] shadow-2xl">
                    <div className="flex items-center justify-between px-4 py-2 bg-[#1e293b] border-b border-white/5">
                      <span className="text-xs font-mono text-gray-400">vulnerability_fix.js</span>
                      <span className="text-[10px] font-bold bg-green-900/50 text-green-400 px-2 py-0.5 rounded">PATCH READY</span>
                    </div>
                    <div className="p-4 font-mono text-xs overflow-x-auto">
                      <div className="text-red-400 opacity-50 mb-2">
                        - const query = "SELECT * FROM users WHERE id = " + req.body.id;
                      </div>
                      <div className="text-green-400">
                        + const query = "SELECT * FROM users WHERE id = $1";<br/>
                        + const values = [req.body.id];<br/>
                        + await db.query(query, values);
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-between items-center">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-[10px] text-white font-bold border-2 border-lp-surface-dark">PDF</div>
                      <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-[10px] text-white font-bold border-2 border-lp-surface-dark">JSON</div>
                      <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-[10px] text-white font-bold border-2 border-lp-surface-dark">CSV</div>
                    </div>
                    <button className="text-sm text-lp-primary hover:text-white transition-colors flex items-center gap-1 font-bold">
                      Ver Exemplo <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2 flex justify-center lg:justify-start">
                <div className="relative w-full max-w-sm aspect-[4/3] lp-glass-panel rounded-xl border-t-4 border-t-lp-primary flex flex-col items-center justify-center p-6 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] transition-shadow">
                  <div className="absolute inset-0 bg-gradient-to-b from-lp-primary/5 to-transparent pointer-events-none"></div>
                  <span className="material-symbols-outlined text-6xl text-lp-primary mb-4 animate-pulse">verified_user</span>
                  <h4 className="text-xl font-bold text-white mb-2">Security Score: A+</h4>
                  <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
                    <div className="bg-gradient-to-r from-green-400 to-lp-primary h-2 rounded-full w-[95%]"></div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 w-full text-center">
                    <div>
                      <div className="text-2xl font-bold text-white">0</div>
                      <div className="text-[10px] text-text-muted uppercase">Critical</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">2</div>
                      <div className="text-[10px] text-text-muted uppercase">High</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">5</div>
                      <div className="text-[10px] text-text-muted uppercase">Low</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-transparent to-lp-surface-dark relative border-t border-white/5">
          <div className="mx-auto max-w-5xl px-4 text-center">
            <h2 className="text-3xl font-display font-bold text-white mb-6">Pronto para blindar sua aplicação?</h2>
            <p className="text-text-muted mb-10 max-w-2xl mx-auto">
              Não espere o incidente acontecer. Nossa tecnologia está pronta para rodar no seu ambiente em minutos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={onStart}
                className="inline-flex items-center justify-center rounded-xl bg-lp-primary px-8 py-4 text-base font-bold text-primary-content shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] hover:bg-lp-primary/90 transition-all group cursor-pointer"
              >
                <span className="material-symbols-outlined mr-2 group-hover:animate-bounce">rocket_launch</span>
                Começar Scan Agora
              </button>
              <button className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-bold text-white border border-white/20 hover:bg-white/5 hover:border-lp-primary/50 transition-all cursor-pointer">
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
                <li><button onClick={onPricing} className="text-sm text-text-muted hover:text-lp-primary transition-colors cursor-pointer text-left">Preços</button></li>
                <li><button onClick={onBack} className="text-sm text-text-muted hover:text-lp-primary transition-colors cursor-pointer text-left">Recursos</button></li>
                <li><button onClick={() => {}} className="text-sm text-lp-primary font-bold transition-colors cursor-default text-left">Como Funciona</button></li>
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
