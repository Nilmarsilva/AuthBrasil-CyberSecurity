import React, { useState } from 'react';
import { Shield, User, Mail, Lock, Eye, ArrowRight, CheckCircle2, LockKeyhole, AlertCircle, Github, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { authService } from '../services/auth';

interface RegisterPageProps {
  onSwitchToLogin: () => void;
  onRegister: () => void;
  onHome: () => void;
  onHowItWorks: () => void;
  onAboutUs: () => void;
  onPricing: () => void;
  onTerms: () => void;
  onPrivacy: () => void;
}

export default function RegisterPage({ onSwitchToLogin, onRegister, onHome, onHowItWorks, onAboutUs, onPricing, onTerms, onPrivacy }: RegisterPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    try {
      setIsLoading(true);
      setError(null);
      await authService.signInWithOAuth(provider);
      if (!authService.isConfigured()) {
        onRegister();
      }
    } catch (err: any) {
      setError(err.message || `Erro ao entrar com ${provider}.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(null);
      if (!authService.isConfigured()) {
        console.warn("Supabase não configurado. Simulando registro...");
        setTimeout(onRegister, 1000);
        return;
      }
      await authService.signUp(email, password, fullName, company, role, phone);
      onRegister();
    } catch (err: any) {
      console.error("Erro detalhado no Cadastro:", err);
      if (err.message === 'Failed to fetch') {
        setError('Erro de conexão: Verifique se a URL e a Chave do Supabase estão corretas e se o projeto está ativo.');
      } else {
        setError(err.message || 'Erro ao criar conta.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Digital Grid Background */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none grid-bg" />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-transparent via-bg-dark/80 to-bg-dark pointer-events-none" />

      <header className="relative z-10 flex items-center justify-between px-4 sm:px-6 lg:px-20 py-4 sm:py-6 border-b border-slate-800/50 backdrop-blur-md sticky top-0">
        <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={onHome}>
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-lp-primary/10 text-lp-primary border border-lp-primary/30">
            <span className="absolute inset-0 rounded-lg bg-lp-primary/20 blur-sm"></span>
            <span className="relative material-symbols-outlined" style={{ fontSize: '24px' }}>shield_lock</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-100 font-display">
            AuthBrasil
          </h2>
        </div>
        <div className="flex items-center gap-4 sm:gap-8">
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={onHome} className="text-sm font-medium text-slate-400 hover:text-white transition-colors cursor-pointer">Recursos</button>
            <button onClick={onHowItWorks} className="text-sm font-medium text-slate-400 hover:text-white transition-colors cursor-pointer">Como Funciona</button>
            <button onClick={onPricing} className="text-sm font-medium text-slate-400 hover:text-white transition-colors cursor-pointer">Preços</button>
            <button onClick={onAboutUs} className="text-sm font-medium text-slate-400 hover:text-white transition-colors cursor-pointer">Sobre Nós</button>
          </nav>
          <div className="hidden sm:block h-6 w-px bg-slate-800" />
          <button 
            onClick={onSwitchToLogin}
            className="text-sm font-bold text-primary hover:text-primary/80 transition-colors cursor-pointer"
          >
            Entrar
          </button>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-xl"
        >
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3 font-display">
              Crie sua Identidade Segura
            </h1>
            <p className="text-slate-400 text-base sm:text-lg">Inicie sua jornada na segurança de elite digital.</p>
          </div>

          <div className="glass rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 size-48 bg-primary/20 blur-[100px]" />
            <div className="absolute -bottom-24 -left-24 size-48 bg-primary/10 blur-[100px]" />

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-xs"
              >
                <AlertCircle className="size-4 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleRegister} className="space-y-6 relative z-10">
              {/* Social Login */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-2">
                <button 
                  type="button"
                  onClick={() => handleSocialLogin('github')}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-3 h-12 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-slate-200 text-sm font-medium transition-all cursor-pointer disabled:opacity-50"
                >
                  <Github className="size-5" />
                  GitHub
                </button>
                <button 
                  type="button"
                  onClick={() => handleSocialLogin('google')}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-3 h-12 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-slate-200 text-sm font-medium transition-all cursor-pointer disabled:opacity-50"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                  </svg>
                  Google
                </button>
              </div>

              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-slate-700/50"></div>
                <span className="flex-shrink mx-4 text-slate-500 text-[10px] uppercase tracking-widest">Ou cadastre-se com e-mail</span>
                <div className="flex-grow border-t border-slate-700/50"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-300 ml-1">Nome Completo</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                    <input 
                      required
                      type="text" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Seu nome"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-950/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-600 focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-300 ml-1">E-mail Corporativo</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                    <input 
                      required
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@empresa.com.br"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-950/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-600 focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-300 ml-1">Empresa</label>
                  <div className="relative group">
                    <Shield className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                    <input 
                      type="text" 
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Nome da sua empresa"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-950/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-600 focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-300 ml-1">Cargo / Função</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                    <input 
                      type="text" 
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="Ex: CTO, Security Manager"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-950/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-600 focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-300 ml-1">Telefone / WhatsApp</label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+55 (11) 99999-9999"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-950/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-600 focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-300 ml-1">Senha</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                  <input 
                    required
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3.5 bg-slate-950/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-600 focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="group relative w-full py-4 bg-gradient-to-r from-primary to-[#00a2ff] text-white font-bold rounded-xl shadow-[0_10px_20px_-10px_rgba(19,109,236,0.5)] hover:shadow-[0_15px_30px_-10px_rgba(19,109,236,0.6)] hover:-translate-y-0.5 transition-all active:scale-[0.98] overflow-hidden cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLoading ? 'Criando Conta...' : 'Criar Conta'} 
                  <ArrowRight className="size-5" />
                </span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </form>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3 text-slate-500">
            <Lock className="size-4" />
            <p className="text-sm">Sua privacidade é nossa prioridade. Dados criptografados.</p>
          </div>
        </motion.div>
      </main>

      <footer className="relative z-10 py-6 sm:py-8 px-4 sm:px-6 lg:px-20 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] sm:text-xs text-slate-600">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-left">
          <span>© 2026 AuthBrasil.</span>
          <div className="flex gap-4">
            <button onClick={onAboutUs} className="hover:text-slate-400 cursor-pointer">Sobre Nós</button>
            <button onClick={onTerms} className="hover:text-slate-400 cursor-pointer">Termos</button>
            <button onClick={onPrivacy} className="hover:text-slate-400 cursor-pointer">Privacidade</button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="size-2 bg-emerald-500 rounded-full animate-pulse" />
          <span>Sistemas: Status OK</span>
        </div>
      </footer>
    </div>
  );
}
