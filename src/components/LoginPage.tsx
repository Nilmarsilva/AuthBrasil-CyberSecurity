import React, { useState } from 'react';
import { Shield, Mail, Lock, Eye, LogIn, Github, ArrowLeft, CheckCircle2, KeyRound, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { authService } from '../services/auth';

interface LoginPageProps {
  onSwitchToRegister: () => void;
  onLogin: () => void;
  onHome: () => void;
  onHowItWorks: () => void;
  onAboutUs: () => void;
  onPricing: () => void;
  onTerms: () => void;
  onPrivacy: () => void;
}

type LoginView = 'login' | 'forgot-password' | 'reset-sent';

export default function LoginPage({ onSwitchToRegister, onLogin, onHome, onHowItWorks, onAboutUs, onPricing, onTerms, onPrivacy }: LoginPageProps) {
  const [view, setView] = useState<LoginView>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    try {
      setIsLoading(true);
      setError(null);
      await authService.signInWithOAuth(provider);
      // O Supabase redirecionará, então não precisamos chamar onLogin() aqui se o redirect for para fora
      // Mas em modo simulação, chamamos onLogin
      if (!authService.isConfigured()) {
        onLogin();
      }
    } catch (err: any) {
      setError(err.message || `Erro ao entrar com ${provider}.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setError(null);
      // Se as variáveis do Supabase não estiverem configuradas, simulamos o login para não travar o dev
      if (!authService.isConfigured()) {
        console.warn("Supabase não configurado. Simulando login...");
        setTimeout(onLogin, 1000);
        return;
      }
      await authService.signIn(email, password);
      onLogin();
    } catch (err: any) {
      console.error("Erro detalhado no Login:", err);
      if (err.message === 'Failed to fetch') {
        setError('Erro de conexão: Verifique se a URL e a Chave do Supabase estão corretas.');
      } else {
        setError(err.message || 'Erro ao fazer login. Verifique suas credenciais.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      setIsLoading(true);
      setError(null);
      if (!import.meta.env.VITE_SUPABASE_URL) {
        setView('reset-sent');
        return;
      }
      await authService.resetPassword(email);
      setView('reset-sent');
    } catch (err: any) {
      setError(err.message || 'Erro ao enviar e-mail de recuperação.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetRequest = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API
    setView('reset-sent');
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-dark relative overflow-hidden">
      {/* Header for consistency */}
      <header className="relative z-20 flex items-center justify-between px-4 sm:px-6 lg:px-20 py-4 sm:py-6 border-b border-slate-800/50 backdrop-blur-md sticky top-0">
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
            onClick={onSwitchToRegister}
            className="text-sm font-bold text-primary hover:text-primary/80 transition-colors cursor-pointer"
          >
            Criar Conta
          </button>
        </div>
      </header>

      <div className="flex-1 flex w-full relative overflow-hidden">
      {/* Left Side: Hero Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 relative overflow-hidden border-r border-slate-800/50">
        <div className="absolute inset-0 z-0 opacity-20 grid-bg" />
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 text-center max-w-xl">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-8 inline-flex items-center justify-center p-6 rounded-2xl bg-primary/10 border border-primary/20 cursor-pointer relative"
            onClick={onHome}
          >
            <span className="absolute inset-0 rounded-2xl bg-primary/20 blur-md"></span>
            <span className="relative material-symbols-outlined text-primary" style={{ fontSize: '64px' }}>shield_lock</span>
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-white text-5xl font-bold leading-tight tracking-tight mb-6 font-display"
          >
            Acesse sua <br />
            <span className="text-primary">Fortaleza Digital</span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg font-light leading-relaxed"
          >
            Proteção de alto impacto para sua infraestrutura crítica. Monitore, autentique e blinde seus ativos com inteligência artificial avançada.
          </motion.p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12 flex justify-center gap-8"
          >
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white">99.9%</span>
              <span className="text-xs text-slate-500 uppercase tracking-widest">Uptime</span>
            </div>
            <div className="w-px h-10 bg-slate-800" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white">256-bit</span>
              <span className="text-xs text-slate-500 uppercase tracking-widest">Encryption</span>
            </div>
            <div className="w-px h-10 bg-slate-800" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white">MFA</span>
              <span className="text-xs text-slate-500 uppercase tracking-widest">Ready</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-12 relative">
        <div className="absolute inset-0 lg:hidden opacity-10 grid-bg" />
        
        <AnimatePresence mode="wait">
          {view === 'login' && (
            <motion.div 
              key="login"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-[480px] glass rounded-2xl p-6 sm:p-10 shadow-2xl relative z-10"
            >
              <div className="flex flex-col gap-2 mb-8 sm:mb-10 text-left">
                <div className="lg:hidden mb-6 flex items-center gap-3 cursor-pointer" onClick={onHome}>
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/30">
                    <span className="absolute inset-0 rounded-lg bg-primary/20 blur-sm"></span>
                    <span className="relative material-symbols-outlined" style={{ fontSize: '28px' }}>shield_lock</span>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-white leading-none font-display">AuthBrasil</h1>
                    <p className="text-[10px] text-primary uppercase tracking-widest mt-1">Security Cloud</p>
                  </div>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold leading-tight font-display text-white">Autenticação</h2>
                <p className="text-slate-400 text-sm sm:text-base">Entre na sua conta AuthBrasil para continuar.</p>
                
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-xs"
                  >
                    <AlertCircle className="size-4 shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </div>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
                className="flex flex-col gap-4 sm:gap-5"
              >
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

                <div className="relative flex items-center py-4">
                  <div className="flex-grow border-t border-slate-700/50"></div>
                  <span className="flex-shrink mx-4 text-slate-500 text-xs uppercase tracking-widest">Ou use seu e-mail</span>
                  <div className="flex-grow border-t border-slate-700/50"></div>
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-300 text-sm font-medium ml-1">E-mail corporativo</label>
                  <div className="relative flex items-center group">
                    <Mail className="absolute left-4 text-slate-500 size-5 group-focus-within:text-primary transition-colors" />
                    <input 
                      required
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="voce@empresa.com.br"
                      className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg h-14 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-slate-300 text-sm font-medium">Senha</label>
                    <button 
                      type="button"
                      onClick={() => setView('forgot-password')}
                      className="text-primary text-xs hover:underline cursor-pointer"
                    >
                      Esqueceu a senha?
                    </button>
                  </div>
                  <div className="relative flex items-center group">
                    <Lock className="absolute left-4 text-slate-500 size-5 group-focus-within:text-primary transition-colors" />
                    <input 
                      required
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg h-14 pl-12 pr-12 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 transition-colors"
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 text-slate-500 hover:text-slate-300 cursor-pointer"
                    >
                      <Eye className="size-5" />
                    </button>
                  </div>
                </div>

                {/* Login Button */}
                <div className="mt-4">
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-primary/90 text-white h-14 rounded-lg font-bold text-base transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(19,109,236,0.3)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{isLoading ? 'Autenticando...' : 'Entrar na Fortaleza'}</span>
                    <LogIn className="size-5" />
                  </button>
                </div>

                <p className="text-center text-slate-500 text-sm mt-4">
                  Não tem uma conta? <button type="button" onClick={onSwitchToRegister} className="text-primary font-semibold hover:underline cursor-pointer">Solicite acesso</button>
                </p>
              </form>
            </motion.div>
          )}

          {view === 'forgot-password' && (
            <motion.div 
              key="forgot"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-[480px] glass rounded-2xl p-6 sm:p-10 shadow-2xl relative z-10"
            >
              <button 
                onClick={() => setView('login')}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 text-sm cursor-pointer"
              >
                <ArrowLeft className="size-4" />
                Voltar para o login
              </button>

              <div className="flex flex-col gap-2 mb-8 text-left">
                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 w-fit mb-4">
                  <KeyRound className="text-primary size-8" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold leading-tight font-display text-white">Recuperar Senha</h2>
                <p className="text-slate-400 text-sm sm:text-base">Insira seu e-mail corporativo para receber as instruções de redefinição.</p>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-300 text-sm font-medium ml-1">E-mail corporativo</label>
                  <div className="relative flex items-center group">
                    <Mail className="absolute left-4 text-slate-500 size-5 group-focus-within:text-primary transition-colors" />
                    <input 
                      required
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="voce@empresa.com.br"
                      className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg h-14 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                </div>

                <button 
                  onClick={handleResetPassword}
                  disabled={isLoading || !email}
                  className="w-full bg-primary hover:bg-primary/90 text-white h-14 rounded-lg font-bold text-base transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(19,109,236,0.3)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{isLoading ? 'Enviando...' : 'Enviar Link de Recuperação'}</span>
                </button>
              </div>
            </motion.div>
          )}

          {view === 'reset-sent' && (
            <motion.div 
              key="sent"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-[480px] glass rounded-2xl p-6 sm:p-10 shadow-2xl relative z-10 text-center"
            >
              <div className="flex flex-col items-center gap-6">
                <div className="p-4 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle2 className="text-emerald-500 size-12" />
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">E-mail Enviado!</h2>
                  <p className="text-slate-400 text-sm sm:text-base">
                    Enviamos um link de redefinição para <span className="text-white font-medium">{email}</span>. Verifique sua caixa de entrada e spam.
                  </p>
                </div>

                <div className="w-full pt-4 space-y-4">
                  <button 
                    onClick={() => setView('login')}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-white h-14 rounded-lg font-bold text-base transition-all cursor-pointer"
                  >
                    Voltar para o Login
                  </button>
                  <p className="text-xs text-slate-500">
                    Não recebeu o e-mail? <button onClick={() => setView('forgot-password')} className="text-primary hover:underline cursor-pointer">Tentar novamente</button>
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Links */}
        <div className="absolute bottom-8 text-center w-full max-w-[480px]">
          <div className="flex justify-center gap-6 text-xs text-slate-600">
            <button onClick={onTerms} className="hover:text-slate-400 transition-colors cursor-pointer">Termos de Uso</button>
            <button onClick={onPrivacy} className="hover:text-slate-400 transition-colors cursor-pointer">Privacidade</button>
            <a href="#" className="hover:text-slate-400 transition-colors">Suporte 24/7</a>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
