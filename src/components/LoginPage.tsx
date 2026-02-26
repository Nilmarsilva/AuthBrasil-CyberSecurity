import React from 'react';
import { Shield, Mail, Lock, Eye, LogIn, Github } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginPageProps {
  onSwitchToRegister: () => void;
  onLogin: () => void;
}

export default function LoginPage({ onSwitchToRegister, onLogin }: LoginPageProps) {
  return (
    <div className="min-h-screen flex w-full bg-bg-dark relative overflow-hidden">
      {/* Left Side: Hero Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 relative overflow-hidden border-r border-slate-800/50">
        <div className="absolute inset-0 z-0 opacity-20 grid-bg" />
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 text-center max-w-xl">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-8 inline-flex items-center justify-center p-4 rounded-full bg-primary/10 border border-primary/20"
          >
            <Shield className="text-primary size-16" />
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
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        <div className="absolute inset-0 lg:hidden opacity-10 grid-bg" />
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-[480px] glass rounded-xl p-8 shadow-2xl relative z-10"
        >
          <div className="flex flex-col gap-2 mb-10 text-left">
            <div className="lg:hidden mb-4">
              <Shield className="text-primary size-10" />
            </div>
            <h2 className="text-white text-3xl font-bold leading-tight font-display">Autenticação</h2>
            <p className="text-slate-400 text-sm">Entre na sua conta AuthBrasil para continuar.</p>
          </div>

          <div className="flex flex-col gap-5">
            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4 mb-2">
              <button className="flex items-center justify-center gap-3 h-12 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-slate-200 text-sm font-medium transition-all cursor-pointer">
                <Github className="size-5" />
                GitHub
              </button>
              <button className="flex items-center justify-center gap-3 h-12 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-slate-200 text-sm font-medium transition-all cursor-pointer">
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
                  type="email" 
                  placeholder="voce@empresa.com.br"
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg h-14 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="text-slate-300 text-sm font-medium">Senha</label>
                <a href="#" className="text-primary text-xs hover:underline">Esqueceu a senha?</a>
              </div>
              <div className="relative flex items-center group">
                <Lock className="absolute left-4 text-slate-500 size-5 group-focus-within:text-primary transition-colors" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg h-14 pl-12 pr-12 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 transition-colors"
                />
                <button type="button" className="absolute right-4 text-slate-500 hover:text-slate-300 cursor-pointer">
                  <Eye className="size-5" />
                </button>
              </div>
            </div>

            {/* Login Button */}
            <div className="mt-4">
              <button 
                onClick={onLogin}
                className="w-full bg-primary hover:bg-primary/90 text-white h-14 rounded-lg font-bold text-base transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(19,109,236,0.3)] cursor-pointer"
              >
                <span>Entrar na Fortaleza</span>
                <LogIn className="size-5" />
              </button>
            </div>

            <p className="text-center text-slate-500 text-sm mt-4">
              Não tem uma conta? <button onClick={onSwitchToRegister} className="text-primary font-semibold hover:underline cursor-pointer">Solicite acesso</button>
            </p>
          </div>
        </motion.div>

        {/* Footer Links */}
        <div className="absolute bottom-8 text-center w-full max-w-[480px]">
          <div className="flex justify-center gap-6 text-xs text-slate-600">
            <a href="#" className="hover:text-slate-400 transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Privacidade</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Suporte 24/7</a>
          </div>
        </div>
      </div>
    </div>
  );
}
