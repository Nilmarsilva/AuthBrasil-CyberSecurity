import React, { useEffect, useState } from 'react';
import { 
  Shield, 
  HelpCircle, 
  ArrowRight, 
  Lock, 
  Globe, 
  Router, 
  SearchCode, 
  Mail, 
  Cookie,
  Share2,
  FileCode,
  FileCheck,
  Zap,
  Bot,
  AlertCircle
} from 'lucide-react';
import api from '../services/api';

interface VulnerabilitiesPageProps {
  onNavigate?: (view: any) => void;
}

export default function VulnerabilitiesPage({ onNavigate }: VulnerabilitiesPageProps) {
  const [detectedVulns, setDetectedVulns] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVulns = async () => {
      try {
        const response = await api.get('/vulnerabilities');
        setDetectedVulns(response.data.items);
      } catch (error) {
        console.error("Erro ao buscar vulnerabilidades:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVulns();
  }, []);

  const categories = [
    {
      icon: <Lock className="size-6" />,
      title: 'SSL/TLS & Criptografia',
      tag: 'INFRAESTRUTURA',
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      maxPts: '55 pts',
      description: 'Validade do certificado, data de expiração, versões de TLS suportadas (1.0 a 1.3) e detecção de Ciphers fracos (RC4, DES, MD5).',
      importance: 'Garante a confidencialidade e integridade dos dados, protegendo contra interceptação e ataques de downgrade.',
      criteria: 'Certificado válido (-30 se expirado), TLS moderno (-15 se 1.0/1.1 ativo) e cifras fortes (-10 se fracas).'
    },
    {
      icon: <Globe className="size-6" />,
      title: 'Redirecionamento HTTPS',
      tag: 'INFRAESTRUTURA',
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      maxPts: '20 pts',
      description: 'Verificação se o tráfego HTTP é redirecionado automaticamente para HTTPS de forma segura.',
      importance: 'Previne que usuários acessem o site via conexões não criptografadas, evitando roubo de credenciais.',
      criteria: 'Ausência de redirecionamento automático resulta em penalidade total de 20 pontos.'
    },
    {
      icon: <Shield className="size-6" />,
      title: 'Security Headers',
      tag: 'APLICAÇÃO',
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
      maxPts: '35 pts',
      description: 'Análise de 7 headers: HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Permissions-Policy, Referrer-Policy e X-XSS-Protection.',
      importance: 'Instrui o navegador a aplicar políticas de segurança rígidas, mitigando XSS, Clickjacking e Sniffing.',
      criteria: 'Cada header ausente ou mal configurado desconta 5 pontos do score total.'
    },
    {
      icon: <Router className="size-6" />,
      title: 'Portas Expostas',
      tag: 'REDE',
      color: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
      maxPts: '30 pts',
      description: 'Varredura das portas 21 (FTP), 22 (SSH), 80 (HTTP), 443 (HTTPS) e 3306 (MySQL) expostas publicamente.',
      importance: 'Reduz a superfície de ataque. Bancos de dados e serviços de gerenciamento nunca devem estar expostos.',
      criteria: 'Porta 3306 (MySQL) aberta é crítica (-30 pts). Portas 21 e 22 são monitoradas para risco.'
    },
    {
      icon: <SearchCode className="size-6" />,
      title: 'Serviços & CMS',
      tag: 'APLICAÇÃO',
      color: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
      maxPts: '20 pts',
      description: 'Identificação de CMS (WordPress, Joomla, etc.) e detecção de versões de software vulneráveis ou desatualizadas.',
      importance: 'Softwares desatualizados possuem vulnerabilidades conhecidas (CVEs) que podem ser exploradas facilmente.',
      criteria: 'Detecção de versão vulnerável resulta em penalidade de 20 pontos por serviço.'
    },
    {
      icon: <Mail className="size-6" />,
      title: 'Segurança de E-mail (DNS)',
      tag: 'DNS',
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      maxPts: '15 pts',
      description: 'Verificação de registros SPF, DKIM e DMARC para prevenir spoofing e garantir a autenticidade dos e-mails.',
      importance: 'Protege a reputação do domínio e evita que criminosos enviem e-mails em seu nome.',
      criteria: '5 pontos para cada registro configurado corretamente (SPF, DKIM, DMARC).'
    },
    {
      icon: <Cookie className="size-6" />,
      title: 'Atributos de Cookie',
      tag: 'APLICAÇÃO',
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      maxPts: '10 pts',
      description: "Análise das flags 'Secure', 'HttpOnly' e 'SameSite' nos cookies de sessão da aplicação.",
      importance: 'Dificulta o roubo de sessões via ataques XSS ou interceptação de rede.',
      criteria: 'Todos os cookies críticos devem possuir as flags de segurança para garantir os 10 pontos.'
    },
    {
      icon: <Share2 className="size-6" />,
      title: 'Configuração de CORS',
      tag: 'APLICAÇÃO',
      color: 'text-red-400 bg-red-500/10 border-red-500/20',
      maxPts: '15 pts',
      description: 'Verificação de políticas de Cross-Origin Resource Sharing (CORS) excessivamente permissivas (ex: Access-Control-Allow-Origin: *).',
      importance: 'Previne que sites maliciosos acessem dados sensíveis da sua API através do navegador do usuário.',
      criteria: 'Configurações inseguras ou curingas (*) em domínios sensíveis resultam em penalidade de 15 pontos.'
    },
    {
      icon: <FileCode className="size-6" />,
      title: 'Exposição de Versão',
      tag: 'APLICAÇÃO',
      color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
      maxPts: '3 pts',
      description: 'Detecção de cabeçalhos (Server, X-Powered-By) ou metadados que revelam a versão exata do servidor ou framework.',
      importance: 'Dificulta o trabalho de atacantes ao esconder quais vulnerabilidades específicas podem existir no seu ambiente.',
      criteria: 'A exposição da versão exata do software resulta em uma penalidade leve de 3 pontos.'
    },
    {
      icon: <FileCheck className="size-6" />,
      title: 'Registros CAA (DNS)',
      tag: 'DNS',
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      maxPts: '5 pts',
      description: 'Verificação do registro DNS Certification Authority Authorization (CAA).',
      importance: 'Permite que você especifique quais autoridades certificadoras (CAs) têm permissão para emitir certificados para seu domínio.',
      criteria: 'Ausência de registros CAA para controle de emissão de certificados penaliza em 5 pontos.'
    },
    {
      icon: <Zap className="size-6" />,
      title: 'HSTS Preload',
      tag: 'INFRAESTRUTURA',
      color: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
      maxPts: '3 pts',
      description: 'Verificação se o domínio está incluído na lista de HSTS Preload dos navegadores.',
      importance: 'Garante que o navegador nunca tente uma conexão HTTP insegura, mesmo na primeira visita ao site.',
      criteria: 'Domínios que não utilizam a diretiva "preload" no HSTS perdem 3 pontos de otimização.'
    },
    {
      icon: <Bot className="size-6" />,
      title: 'Análise de Robots.txt',
      tag: 'APLICAÇÃO',
      color: 'text-slate-400 bg-slate-500/10 border-slate-500/20',
      maxPts: '5 pts',
      description: 'Busca por diretórios sensíveis ou caminhos de administração expostos no arquivo robots.txt.',
      importance: 'Evita que atacantes descubram áreas administrativas ou arquivos privados através de mapeamento passivo.',
      criteria: 'Exposição de caminhos críticos ou sensíveis no robots.txt penaliza em 5 pontos.'
    }
  ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden relative font-noto">
      {/* Header */}
      <header className="relative z-10 h-auto min-h-[4rem] border-b border-slate-800/50 flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-4 sm:py-0 bg-bg-vulnerability/50 backdrop-blur-md gap-4">
        <div className="text-center sm:text-left">
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight font-space">Base de Conhecimento</h2>
          <p className="text-[10px] sm:text-xs text-text-muted">Biblioteca de testes e critérios de pontuação</p>
        </div>
        <div className="w-full sm:w-auto flex items-center justify-center sm:justify-end gap-4">
          <button 
            onClick={() => onNavigate?.('analyses')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow-neon transition-all duration-300 transform hover:scale-105 active:scale-95 group cursor-pointer"
          >
            <Shield className="size-5 group-hover:animate-pulse" />
            <span className="text-sm font-bold tracking-wide">Nova Varredura</span>
          </button>
        </div>
      </header>

      {/* Content Scroll Area */}
      <div className="relative z-10 flex-1 overflow-y-auto p-4 sm:p-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-6 sm:gap-8">
          
          {/* Detected Vulnerabilities Section */}
          {detectedVulns.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2 px-2">
                <AlertCircle className="text-red-500 size-5" />
                Vulnerabilidades Detectadas nos seus Scans
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {detectedVulns.map((vuln) => (
                  <div key={vuln.id} className="glass-card p-4 rounded-xl border-slate-800 hover:border-primary/30 transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase ${
                        vuln.severity === 'critical' ? 'bg-red-500/20 text-red-400' : 
                        vuln.severity === 'high' ? 'bg-orange-500/20 text-orange-400' : 
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {vuln.severity}
                      </span>
                      <span className="text-[10px] text-slate-500">{vuln.status}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1">{vuln.title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2">{vuln.description}</p>
                    <div className="mt-3 pt-3 border-t border-slate-800 flex justify-between items-center">
                      <span className="text-[10px] text-slate-500 uppercase font-bold">{vuln.category}</span>
                      <button 
                        onClick={() => onNavigate?.('analyses')}
                        className="text-[10px] text-primary hover:underline font-bold"
                      >
                        Ver Detalhes
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Intro Section */}
          <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-6 mb-2">
            <div className="max-w-2xl">
              <p className="text-text-muted text-sm sm:text-base leading-relaxed">
                Entenda cada verificação realizada pelo nosso motor de segurança. Cada teste impacta diretamente sua pontuação de segurança (Score) e ajuda a prevenir vetores de ataque comuns.
              </p>
            </div>
            {/* Filters */}
            <div className="flex gap-2 flex-wrap">
              <button className="px-4 py-1.5 rounded-full bg-primary text-white text-[10px] sm:text-xs font-semibold border border-primary/50 shadow-glow-sm cursor-pointer">Todos</button>
              <button className="px-4 py-1.5 rounded-full bg-slate-800/50 hover:bg-slate-700 text-text-muted hover:text-white border border-slate-700 hover:border-slate-600 transition-all text-[10px] sm:text-xs font-medium backdrop-blur-sm cursor-pointer">Rede</button>
              <button className="px-4 py-1.5 rounded-full bg-slate-800/50 hover:bg-slate-700 text-text-muted hover:text-white border border-slate-700 hover:border-slate-600 transition-all text-[10px] sm:text-xs font-medium backdrop-blur-sm cursor-pointer">Aplicação</button>
              <button className="px-4 py-1.5 rounded-full bg-slate-800/50 hover:bg-slate-700 text-text-muted hover:text-white border border-slate-700 hover:border-slate-600 transition-all text-[10px] sm:text-xs font-medium backdrop-blur-sm cursor-pointer">Configuração</button>
            </div>
          </div>

          {/* Grid of Cards */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {categories.map((cat, i) => (
              <article key={i} className="glass-card rounded-xl p-6 hover:border-primary/30 transition-all group shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`h-12 w-12 rounded-lg flex items-center justify-center border ${cat.color}`}>
                      {cat.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors font-space">{cat.title}</h3>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-400 border border-slate-700 mt-1">
                        {cat.tag}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center h-8 px-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold">
                    Max: {cat.maxPts}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-bg-vulnerability/50 rounded-lg p-3 border border-slate-800/50">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">O que testamos</p>
                    <p className="text-sm text-slate-300">{cat.description}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Por que é importante</p>
                      <p className="text-sm text-text-muted">{cat.importance}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Critério de Pontuação</p>
                      <p className="text-sm text-text-muted">{cat.criteria}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Footer / Help */}
          <div className="rounded-xl border border-dashed border-slate-700 p-8 flex flex-col items-center justify-center text-center mt-4">
            <div className="bg-slate-800 p-3 rounded-full mb-3">
              <HelpCircle className="size-6 text-text-muted" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-space">Precisa de ajuda com a interpretação?</h3>
            <p className="text-text-muted max-w-lg mb-4">Nossa equipe de especialistas em segurança pode ajudar a corrigir as vulnerabilidades encontradas no seu relatório.</p>
            <button className="text-primary hover:text-primary-light font-medium text-sm flex items-center gap-2 cursor-pointer group">
              Falar com Suporte <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
