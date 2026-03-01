import React from 'react';
import { Shield, User, Mail, Lock, Eye, ArrowRight, CheckCircle2, LockKeyhole } from 'lucide-react';
import { motion } from 'motion/react';

interface RegisterPageProps {
  onSwitchToLogin: () => void;
  onRegister: () => void;
  onHome: () => void;
  onHowItWorks: () => void;
  onAboutUs: () => void;
  onPricing: () => void;
}

export default function RegisterPage({ onSwitchToLogin, onRegister, onHome, onHowItWorks, onAboutUs, onPricing }: RegisterPageProps) {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Digital Grid Background */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none grid-bg" />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-transparent via-bg-dark/80 to-bg-dark pointer-events-none" />

      <header className="relative z-10 flex items-center justify-between px-4 sm:px-6 lg:px-20 py-4 sm:py-6 border-b border-slate-800/50 backdrop-blur-md sticky top-0">
        <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={onHome}>
          <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Shield className="size-5 sm:size-6 text-primary" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-100 font-display">
            AuthBrasil <span className="text-primary">Security</span>
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

            <form className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-300 ml-1">Nome Completo</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                    <input 
                      type="text" 
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
                      type="email" 
                      placeholder="seu@empresa.com.br"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-950/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-600 focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-300 ml-1">Senha</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3.5 bg-slate-950/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-600 focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none"
                  />
                  <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 cursor-pointer hover:text-slate-300">
                    <Eye className="size-5" />
                  </button>
                </div>

                <div className="mt-3">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-500">Força da Senha: Forte</span>
                    <CheckCircle2 className="text-emerald-500 size-4" />
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-500" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-300 ml-1">Confirmar Senha</label>
                <div className="relative group">
                  <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-950/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-600 focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none"
                  />
                </div>
              </div>

              <button 
                type="button"
                onClick={onRegister}
                className="group relative w-full py-4 bg-gradient-to-r from-primary to-[#00a2ff] text-white font-bold rounded-xl shadow-[0_10px_20px_-10px_rgba(19,109,236,0.5)] hover:shadow-[0_15px_30px_-10px_rgba(19,109,236,0.6)] hover:-translate-y-0.5 transition-all active:scale-[0.98] overflow-hidden cursor-pointer"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Criar Conta 
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
          <span>© 2026 AuthBrasil Security Solutions.</span>
          <div className="flex gap-4">
            <button onClick={onAboutUs} className="hover:text-slate-400 cursor-pointer">Sobre Nós</button>
            <a href="#" className="hover:text-slate-400">Termos</a>
            <a href="#" className="hover:text-slate-400">Privacidade</a>
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
