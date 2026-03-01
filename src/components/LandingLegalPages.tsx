import React from 'react';
import { Shield, ArrowLeft, FileText, Scale, Lock, AlertTriangle, Globe } from 'lucide-react';
import { motion } from 'motion/react';

interface LandingLegalPageProps {
  onBack: () => void;
  onPricing: () => void;
  onHowItWorks: () => void;
  onAboutUs: () => void;
  onSampleReport: () => void;
  onApiDocs: () => void;
  onContact: () => void;
  onTerms: () => void;
  onPrivacy: () => void;
  onCookies: () => void;
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

const LegalLayout = ({ 
  onBack, onPricing, onHowItWorks, onAboutUs, onSampleReport, onApiDocs, onContact, onTerms, onPrivacy, onCookies,
  title, lastUpdated, children 
}: LandingLegalPageProps) => (
  <div className="min-h-screen bg-bg-dark flex flex-col font-body selection:bg-primary selection:text-white">
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/50 bg-bg-dark/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={onBack}>
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/30">
              <Shield className="size-5" />
            </div>
            <span className="text-xl font-display font-bold tracking-tight text-white">AuthBrasil<span className="text-primary">.io</span></span>
          </div>
          <button onClick={onBack} className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-primary transition-colors cursor-pointer">
            <ArrowLeft className="size-4" /> Voltar
          </button>
        </div>
      </div>
    </header>

    <main className="flex-grow py-16 px-4">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">{title}</h1>
            <p className="text-slate-500 text-sm">Última atualização: {lastUpdated}</p>
          </div>
          
          <div className="glass rounded-3xl p-8 md:p-12 border border-white/5 shadow-2xl prose prose-invert prose-slate max-w-none">
            {children}
          </div>
        </motion.div>
      </div>
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
              <li><button onClick={onContact} className="text-sm text-text-muted hover:text-lp-primary transition-colors cursor-pointer text-left">Contato</button></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Legal</h3>
            <ul className="space-y-3">
              <li><button onClick={onTerms} className={`text-sm transition-colors cursor-pointer text-left ${title.includes('Termos') ? 'text-lp-primary font-bold' : 'text-text-muted hover:text-lp-primary'}`}>Termos de Uso</button></li>
              <li><button onClick={onPrivacy} className={`text-sm transition-colors cursor-pointer text-left ${title.includes('Privacidade') ? 'text-lp-primary font-bold' : 'text-text-muted hover:text-lp-primary'}`}>Privacidade</button></li>
              <li><button onClick={onCookies} className={`text-sm transition-colors cursor-pointer text-left ${title.includes('Cookies') ? 'text-lp-primary font-bold' : 'text-text-muted hover:text-lp-primary'}`}>Cookies</button></li>
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

export function LandingTermsPage(props: Omit<LandingLegalPageProps, 'title' | 'lastUpdated' | 'children'>) {
  return (
    <LegalLayout {...props} title="Termos de Uso" lastUpdated="01 de Março de 2026">
      <div className="space-y-8 text-slate-300">
        <section>
          <h2 className="text-white flex items-center gap-2"><FileText className="size-5 text-primary" /> 1. Aceitação dos Termos</h2>
          <p>Ao acessar e utilizar a plataforma AuthBrasil.io, você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deverá utilizar nossos serviços.</p>
        </section>

        <section>
          <h2 className="text-white flex items-center gap-2"><Shield className="size-5 text-primary" /> 2. Descrição do Serviço</h2>
          <p>A AuthBrasil fornece ferramentas de varredura de segurança cibernética automatizada, análise de vulnerabilidades e monitoramento de ativos digitais. Nossos serviços são destinados exclusivamente para fins de segurança e auditoria autorizada.</p>
        </section>

        <section>
          <h2 className="text-white flex items-center gap-2"><AlertTriangle className="size-5 text-orange-500" /> 3. Uso Autorizado e Restrições</h2>
          <p>Você declara e garante que possui autorização legal explícita para realizar varreduras de segurança nos alvos (domínios, IPs, infraestrutura) que submeter à nossa plataforma.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>É estritamente proibido o uso da plataforma para atividades ilegais, ataques não autorizados ou espionagem cibernética.</li>
            <li>O uso indevido resultará no cancelamento imediato da conta e cooperação total com as autoridades competentes.</li>
            <li>Você é responsável por todas as atividades que ocorrem sob sua conta.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-white flex items-center gap-2"><Scale className="size-5 text-primary" /> 4. Limitação de Responsabilidade</h2>
          <p>A AuthBrasil não se responsabiliza por quaisquer danos diretos, indiretos ou consequentes resultantes do uso ou da incapacidade de usar nossos serviços, ou por quaisquer ações tomadas com base nos relatórios gerados.</p>
        </section>

        <section>
          <h2 className="text-white flex items-center gap-2"><Globe className="size-5 text-primary" /> 5. Foro e Legislação Aplicável</h2>
          <p>Estes termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da Comarca de São Paulo, SP, para dirimir quaisquer controvérsias oriundas deste contrato.</p>
        </section>
      </div>
    </LegalLayout>
  );
}

export function LandingPrivacyPage(props: Omit<LandingLegalPageProps, 'title' | 'lastUpdated' | 'children'>) {
  return (
    <LegalLayout {...props} title="Política de Privacidade" lastUpdated="01 de Março de 2026">
      <div className="space-y-8 text-slate-300">
        <section>
          <h2 className="text-white flex items-center gap-2"><Lock className="size-5 text-emerald-500" /> 1. Compromisso com a LGPD</h2>
          <p>A AuthBrasil está totalmente comprometida com a proteção de dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD).</p>
        </section>

        <section>
          <h2 className="text-white flex items-center gap-2"><FileText className="size-5 text-primary" /> 2. Coleta de Dados</h2>
          <p>Coletamos apenas os dados estritamente necessários para a prestação de nossos serviços:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Dados Cadastrais:</strong> Nome, e-mail corporativo e informações da empresa.</li>
            <li><strong>Dados de Uso:</strong> Logs de acesso, endereços IP e histórico de varreduras para fins de segurança e auditoria.</li>
            <li><strong>Dados Técnicos:</strong> Informações sobre os ativos submetidos para análise.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-white flex items-center gap-2"><Shield className="size-5 text-primary" /> 3. Finalidade do Tratamento</h2>
          <p>Seus dados são utilizados para autenticação, prestação de suporte técnico, melhoria contínua de nossos algoritmos de detecção e cumprimento de obrigações legais.</p>
        </section>

        <section>
          <h2 className="text-white flex items-center gap-2"><Scale className="size-5 text-primary" /> 4. Seus Direitos</h2>
          <p>De acordo com a LGPD, você possui o direito de confirmar a existência de tratamento, acessar seus dados, corrigir dados incompletos ou inexatos, e solicitar a exclusão de seus dados pessoais de nossa base.</p>
        </section>
      </div>
    </LegalLayout>
  );
}

export function LandingCookiesPage(props: Omit<LandingLegalPageProps, 'title' | 'lastUpdated' | 'children'>) {
  return (
    <LegalLayout {...props} title="Política de Cookies" lastUpdated="01 de Março de 2026">
      <div className="space-y-8 text-slate-300">
        <section>
          <h2 className="text-white">1. O que são Cookies?</h2>
          <p>Cookies são pequenos arquivos de texto armazenados em seu navegador para melhorar sua experiência, lembrar suas preferências e garantir a segurança da navegação.</p>
        </section>

        <section>
          <h2 className="text-white">2. Cookies que Utilizamos</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
              <h4 className="text-white font-bold mb-1">Cookies Essenciais</h4>
              <p className="text-sm text-slate-400">Necessários para o funcionamento básico da plataforma, como login e segurança.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
              <h4 className="text-white font-bold mb-1">Cookies Analíticos</h4>
              <p className="text-sm text-slate-400">Utilizados para entender como os usuários interagem com nosso site e identificar pontos de melhoria.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-white">3. Como Gerenciar</h2>
          <p>Você pode configurar seu navegador para recusar todos ou alguns cookies, ou para alertá-lo quando sites definirem ou acessarem cookies. Note que, se você desativar os cookies, algumas partes deste site podem se tornar inacessíveis ou não funcionar corretamente.</p>
        </section>
      </div>
    </LegalLayout>
  );
}
