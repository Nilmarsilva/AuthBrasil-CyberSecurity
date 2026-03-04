import React, { useState } from 'react';
import { 
  Shield, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  Clock, 
  Globe,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LandingContactPageProps {
  onBack: () => void;
  onStart: () => void;
  onLogin: () => void;
  onPricing: () => void;
  onHowItWorks: () => void;
  onAboutUs: () => void;
  onSampleReport: () => void;
  onApiDocs: () => void;
  onTerms: () => void;
  onPrivacy: () => void;
  onCookies: () => void;
}

export default function LandingContactPage({ 
  onBack, 
  onStart, 
  onLogin, 
  onPricing, 
  onHowItWorks, 
  onAboutUs,
  onSampleReport,
  onApiDocs,
  onTerms,
  onPrivacy,
  onCookies
}: LandingContactPageProps) {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => setFormState('success'), 1500);
  };

  return (
    <div className="min-h-screen bg-bg-dark flex flex-col font-body selection:bg-primary selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/50 bg-bg-dark/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={onBack}>
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-lp-primary/10 text-lp-primary border border-lp-primary/30">
                <span className="absolute inset-0 rounded-lg bg-lp-primary/20 blur-sm"></span>
                <span className="relative material-symbols-outlined" style={{ fontSize: '24px' }}>shield_lock</span>
              </div>
              <span className="text-xl font-display font-bold tracking-tight text-text-main">AuthBrasil</span>
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

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-20 pb-12 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                Estamos aqui para <span className="text-primary">proteger</span> você.
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Dúvidas técnicas, parcerias comerciais ou suporte especializado. 
                Nossa equipe de segurança está pronta para atender sua demanda.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Grid */}
        <section className="py-12 pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Contact Info */}
              <div className="lg:col-span-1 space-y-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    Informações de Contato
                  </h3>
                  
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
                    <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="size-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">E-mail</h4>
                      <p className="text-sm text-slate-400">contato@authbrasil.io</p>
                      <p className="text-sm text-slate-400">suporte@authbrasil.io</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
                    <div className="size-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                      <Phone className="size-5 text-emerald-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">Telefone</h4>
                      <p className="text-sm text-slate-400">+55 (11) 4003-0000</p>
                      <p className="text-sm text-slate-400">Seg - Sex, 9h às 18h</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
                    <div className="size-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                      <MapPin className="size-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">Escritório</h4>
                      <p className="text-sm text-slate-400">Av. Paulista, 1000 - 15º Andar</p>
                      <p className="text-sm text-slate-400">Bela Vista, São Paulo - SP</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-blue-600/10 border border-primary/20">
                  <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                    <Clock className="size-4 text-primary" /> Suporte 24/7
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Clientes do plano <span className="text-primary font-bold">Enterprise</span> possuem acesso direto a um canal de emergência via Slack e telefone 24 horas por dia.
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="glass rounded-3xl p-8 border border-white/5 shadow-2xl relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    {formState === 'success' ? (
                      <motion.div 
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-12 text-center"
                      >
                        <div className="size-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                          <CheckCircle2 className="size-10 text-emerald-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Mensagem Enviada!</h3>
                        <p className="text-slate-400 mb-8">Obrigado pelo contato. Nossa equipe retornará em até 24 horas úteis.</p>
                        <button 
                          onClick={() => setFormState('idle')}
                          className="text-primary font-bold hover:underline cursor-pointer"
                        >
                          Enviar outra mensagem
                        </button>
                      </motion.div>
                    ) : (
                      <motion.form 
                        key="form"
                        onSubmit={handleSubmit}
                        className="space-y-6"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Nome Completo</label>
                            <input 
                              required
                              type="text" 
                              placeholder="Seu nome"
                              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-primary transition-all"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">E-mail Corporativo</label>
                            <input 
                              required
                              type="email" 
                              placeholder="seu@email.com"
                              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-primary transition-all"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Assunto</label>
                          <select className="w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-primary transition-all appearance-none">
                            <option>Dúvida Técnica</option>
                            <option>Comercial / Vendas</option>
                            <option>Parcerias</option>
                            <option>Suporte ao Cliente</option>
                            <option>Outros</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Mensagem</label>
                          <textarea 
                            required
                            rows={5}
                            placeholder="Como podemos ajudar?"
                            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-primary transition-all resize-none"
                          ></textarea>
                        </div>

                        <button 
                          disabled={formState === 'submitting'}
                          type="submit"
                          className="w-full py-4 bg-primary hover:bg-blue-600 disabled:bg-slate-700 text-white rounded-xl font-bold shadow-neon transition-all flex items-center justify-center gap-2 cursor-pointer group"
                        >
                          {formState === 'submitting' ? (
                            <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          ) : (
                            <>
                              Enviar Mensagem
                              <Send className="size-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </>
                          )}
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>
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
                <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-lp-primary/10 text-lp-primary border border-lp-primary/30">
                  <span className="absolute inset-0 rounded-lg bg-lp-primary/20 blur-sm"></span>
                  <span className="relative material-symbols-outlined" style={{ fontSize: '24px' }}>shield_lock</span>
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
                <li><button onClick={onApiDocs} className="text-sm text-text-muted hover:text-lp-primary transition-colors cursor-pointer text-left">API Docs</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Empresa</h3>
              <ul className="space-y-3">
                <li><button onClick={onAboutUs} className="text-sm text-text-muted hover:text-lp-primary transition-colors cursor-pointer text-left">Sobre Nós</button></li>
                <li><a className="text-sm text-text-muted hover:text-lp-primary transition-colors" href="#">Blog de Segurança</a></li>
                <li><button onClick={() => {}} className="text-sm text-lp-primary font-bold transition-colors cursor-default text-left">Contato</button></li>
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
            <p className="text-xs text-text-muted text-center md:text-left">© 2026 AuthBrasil.</p>
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
