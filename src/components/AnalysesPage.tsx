import React, { useState, useEffect } from 'react';
import { 
  Search, 
  FileDown, 
  Info, 
  ShieldCheck, 
  Router, 
  Server, 
  History, 
  Construction, 
  Copy, 
  ChevronRight, 
  ArrowDownCircle, 
  BrainCircuit,
  CheckCircle2,
  Loader2,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AnalysesPageProps {
  target?: string | null;
}

interface Vulnerability {
  id: string;
  severity: 'ALTA' | 'MÉDIA' | 'BAIXA';
  points: number;
  title: string;
  description: string;
  status: 'Pendente' | 'Corrigido' | 'Ignorado';
  remediation: string;
  codeSnippet?: string;
  category: string;
}

export default function AnalysesPage({ target }: AnalysesPageProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'critical'>('all');
  const [expandedId, setExpandedId] = useState<string | null>('vuln-1');
  const [scanTarget, setScanTarget] = useState(target || '');
  const [showComingSoon, setShowComingSoon] = useState(false);

  useEffect(() => {
    if (target) setScanTarget(target);
  }, [target]);

  const vulnerabilities: Vulnerability[] = [
    {
      id: 'vuln-1',
      severity: 'ALTA',
      points: 30,
      title: 'Porta 3306 (MySQL) Exposta',
      description: 'Banco de dados acessível externamente sem restrições de IP.',
      status: 'Pendente',
      category: 'configuração / firewall / linux',
      remediation: 'A porta do MySQL está aberta para a rede pública (0.0.0.0). Isso permite tentativas de força bruta e exploração de vulnerabilidades do motor do banco de dados. Recomenda-se restringir o bind do MySQL ao 127.0.0.1 ou utilizar regras de IPTables.',
      codeSnippet: '# Bloquear MySQL globalmente e permitir apenas IP específico\nsudo iptables -A INPUT -p tcp -s 192.168.1.100 --dport 3306 -m state --state NEW,ESTABLISHED -j ACCEPT\nsudo iptables -A INPUT -p tcp --dport 3306 -j DROP'
    },
    {
      id: 'vuln-2',
      severity: 'MÉDIA',
      points: 15,
      title: 'Falta Header Content-Security-Policy',
      description: 'Vulnerável a ataques XSS e injeção de dados maliciosos.',
      status: 'Ignorado',
      category: 'segurança / web / headers',
      remediation: 'O cabeçalho Content-Security-Policy (CSP) ajuda a mitigar ataques de Cross-Site Scripting (XSS) e injeção de dados. Configure uma política restritiva que permita apenas scripts de origens confiáveis.',
      codeSnippet: 'Content-Security-Policy: default-src \'self\'; script-src \'self\' https://trusted.cdn.com;'
    },
    {
      id: 'vuln-3',
      severity: 'BAIXA',
      points: 5,
      title: 'Header X-Frame-Options Ausente',
      description: 'Risco menor de Clickjacking no front-end.',
      status: 'Corrigido',
      category: 'segurança / web / clickjacking',
      remediation: 'O cabeçalho X-Frame-Options indica se o navegador deve ter permissão para renderizar uma página em um <frame>, <iframe>, <embed> ou <object>. Use SAMEORIGIN para prevenir clickjacking.',
      codeSnippet: 'X-Frame-Options: SAMEORIGIN'
    },
    {
      id: 'vuln-4',
      severity: 'ALTA',
      points: 30,
      title: 'JWT Signing Vulnerability',
      description: 'Uso de algoritmo "none" permitido na validação de tokens.',
      status: 'Pendente',
      category: 'autenticação / api / jwt',
      remediation: 'A vulnerabilidade de algoritmo "none" permite que um atacante ignore a assinatura do JWT. Certifique-se de que sua biblioteca de validação de tokens exija um algoritmo de assinatura forte como RS256 ou HS256.',
      codeSnippet: 'jwt.verify(token, publicKey, { algorithms: [\'RS256\'] });'
    }
  ];

  const handleStartScan = () => {
    if (!scanTarget) return;
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      alert(`Varredura concluída para: ${scanTarget}`);
    }, 3000);
  };

  const handleExportPDF = () => {
    alert('Gerando relatório PDF detalhado...');
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert('Código copiado para a área de transferência!');
  };

  const filteredVulnerabilities = vulnerabilities.filter(v => 
    activeFilter === 'all' ? true : v.severity === 'ALTA'
  );

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'ALTA': return 'text-red-500 bg-red-500/20 border-red-500/40';
      case 'MÉDIA': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'BAIXA': return 'text-green-500 bg-green-500/10 border-green-500/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Corrigido': return <CheckCircle2 className="text-green-500 size-4" />;
      case 'Pendente': return <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />;
      case 'Ignorado': return <span className="w-2 h-2 rounded-full bg-slate-600" />;
      default: return null;
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'Corrigido': return 'text-green-500';
      case 'Pendente': return 'text-amber-500';
      case 'Ignorado': return 'text-slate-500';
      default: return 'text-slate-500';
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <header className="h-20 border-b border-white/5 flex items-center px-8 sticky top-0 bg-[#050810]/80 backdrop-blur-md z-10">
        <div className="flex-1 flex items-center gap-4">
          <div className="relative flex-1 max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 size-5" />
            <input 
              type="text" 
              placeholder="Cole uma URL ou repositório para nova varredura..."
              value={scanTarget}
              onChange={(e) => setScanTarget(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-32 py-3 text-sm focus:ring-2 focus:ring-blue-500/50 outline-none transition-all placeholder:text-slate-500"
            />
            <button 
              onClick={handleStartScan}
              disabled={isScanning || !scanTarget}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-2"
            >
              {isScanning ? <Loader2 className="size-3 animate-spin" /> : null}
              {isScanning ? 'SCANNEANDO...' : 'INICIAR SCAN'}
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center">
              <CheckCircle2 className="size-4 text-green-500" />
            </div>
          </div>
          <button 
            onClick={handleExportPDF}
            className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-xs font-bold transition-all cursor-pointer"
          >
            <FileDown className="size-4 text-blue-400" />
            EXPORTAR PDF
          </button>
        </div>
      </header>

      <div className="p-8 space-y-8">
        <section className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-4 glass-card p-8 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden neon-border-blue">
            <div className="absolute top-0 right-0 p-4">
              <Info className="size-5 text-slate-600" />
            </div>
            <div className="security-gauge w-44 h-44 shadow-[0_0_40px_rgba(59,130,246,0.2)]">
              <div className="relative z-10 flex flex-col items-center">
                <span className="text-5xl font-black text-white">72</span>
                <span className="text-[10px] text-blue-400 font-bold tracking-widest uppercase">Score Global</span>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm font-medium text-slate-300">Sua segurança é <span className="text-blue-400 font-bold">Boa</span></p>
              <p className="text-xs text-slate-500 mt-1">Melhore 28 pontos corrigindo as vulnerabilidades críticas.</p>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8 grid grid-cols-2 gap-4">
            <div className="glass-card p-5 rounded-2xl border-l-4 border-l-success-neon">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">SSL/HTTPS Status</p>
                  <h3 className="text-lg font-bold text-white mt-1">Certificado Ativo</h3>
                </div>
                <ShieldCheck className="text-success-neon size-5" />
              </div>
              <p className="text-xs text-slate-500 mt-3">Expira em 142 dias (Let's Encrypt)</p>
            </div>
            <div className="glass-card p-5 rounded-2xl border-l-4 border-l-critical-neon">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Portas Abertas</p>
                  <h3 className="text-lg font-bold text-white mt-1">08 Detectadas</h3>
                </div>
                <Router className="text-critical-neon size-5" />
              </div>
              <p className="text-xs text-critical-neon mt-3 font-medium">Risco: MySQL (3306) exposta publicamente</p>
            </div>
            <div className="glass-card p-5 rounded-2xl border-l-4 border-l-warning-neon">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">CMS & Tech Stack</p>
                  <h3 className="text-lg font-bold text-white mt-1">FastAPI / Nginx</h3>
                </div>
                <Server className="text-warning-neon size-5" />
              </div>
              <p className="text-xs text-slate-500 mt-3">Versão 0.95.0 - Atualização disponível</p>
            </div>
            <div className="glass-card p-5 rounded-2xl border-l-4 border-l-primary-neon">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Última Varredura</p>
                  <h3 className="text-lg font-bold text-white mt-1">Há 2 horas</h3>
                </div>
                <History className="text-primary-neon size-5" />
              </div>
              <p className="text-xs text-slate-500 mt-3">Duração total: 4min 12s</p>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Problemas de Segurança 
                <span className="bg-red-500/20 text-red-500 text-xs px-2 py-0.5 rounded-full border border-red-500/30">
                  {vulnerabilities.filter(v => v.status === 'Pendente').length} ativos
                </span>
              </h2>
              <p className="text-sm text-slate-500">Lista detalhada de vulnerabilidades encontradas no domínio principal.</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 border rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === 'all' 
                    ? 'bg-white/10 border-white/20 text-white' 
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                }`}
              >
                TODOS
              </button>
              <button 
                onClick={() => setActiveFilter('critical')}
                className={`px-4 py-2 border rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === 'critical' 
                    ? 'bg-red-500/20 border-red-500/30 text-red-500' 
                    : 'bg-red-500/5 border-red-500/10 text-red-500/60 hover:bg-red-500/10'
                }`}
              >
                CRÍTICOS ({vulnerabilities.filter(v => v.severity === 'ALTA').length})
              </button>
            </div>
          </div>

          <div className="glass-card rounded-2xl overflow-hidden border border-white/5">
            <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-white/5 border-b border-white/5 uppercase">
              <div className="col-span-2 text-[10px] font-bold text-slate-500 tracking-widest">SEVERIDADE</div>
              <div className="col-span-5 text-[10px] font-bold text-slate-500 tracking-widest">IDENTIFICADOR / VULNERABILIDADE</div>
              <div className="col-span-2 text-[10px] font-bold text-slate-500 tracking-widest text-center">PONTOS PERDIDOS</div>
              <div className="col-span-2 text-[10px] font-bold text-slate-500 tracking-widest">STATUS</div>
              <div className="col-span-1 text-[10px] font-bold text-slate-500 tracking-widest text-right">AÇÕES</div>
            </div>
            <div className="divide-y divide-white/5">
              {filteredVulnerabilities.map((vuln) => (
                <div key={vuln.id} className={`${expandedId === vuln.id ? 'bg-red-500/5' : ''}`}>
                  <div 
                    onClick={() => setExpandedId(expandedId === vuln.id ? null : vuln.id)}
                    className="grid grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-white/5 transition-colors cursor-pointer group"
                  >
                    <div className="col-span-2">
                      <span className={`px-3 py-1 rounded-md text-[10px] font-black border uppercase tracking-wider ${getSeverityColor(vuln.severity)}`}>
                        {vuln.severity} ({vuln.points} pts)
                      </span>
                    </div>
                    <div className="col-span-5">
                      <h4 className="font-bold text-sm text-white group-hover:text-blue-400 transition-colors">{vuln.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{vuln.description}</p>
                    </div>
                    <div className="col-span-2 text-center">
                      <span className={`${vuln.severity === 'ALTA' ? 'text-red-500' : vuln.severity === 'MÉDIA' ? 'text-amber-500' : 'text-green-500'} font-black text-lg`}>
                        - {vuln.points < 10 ? `0${vuln.points}` : vuln.points}
                      </span>
                    </div>
                    <div className="col-span-2 flex items-center gap-2">
                      {getStatusIcon(vuln.status)}
                      <span className={`text-xs font-bold uppercase tracking-wider ${getStatusTextColor(vuln.status)}`}>
                        {vuln.status}
                      </span>
                    </div>
                    <div className="col-span-1 text-right">
                      <ArrowDownCircle className={`text-slate-400 size-5 transition-transform duration-300 ${expandedId === vuln.id ? 'rotate-0' : '-rotate-90'}`} />
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {expandedId === vuln.id && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2">
                          <div className={`bg-black/40 rounded-xl p-6 border border-white/10 ${vuln.severity === 'ALTA' ? 'neon-border-red' : 'neon-border-blue'}`}>
                            <div className={`flex items-center gap-2 font-bold text-xs uppercase tracking-widest mb-4 ${vuln.severity === 'ALTA' ? 'text-red-500' : 'text-blue-400'}`}>
                              <Construction className="size-4" />
                              Plano de Correção (Como Corrigir)
                            </div>
                            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                              {vuln.remediation}
                            </p>
                            {vuln.codeSnippet && (
                              <div className="code-block rounded-lg overflow-hidden border border-white/5">
                                <div className="flex justify-between items-center px-4 py-2 bg-white/5 border-b border-white/5">
                                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-tighter">{vuln.category}</span>
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleCopyCode(vuln.codeSnippet!);
                                    }}
                                    className="text-slate-500 hover:text-white transition-colors cursor-pointer"
                                  >
                                    <Copy className="size-4" />
                                  </button>
                                </div>
                                <pre className="p-4 text-xs leading-6 overflow-x-auto text-slate-300 font-mono">
                                  {vuln.codeSnippet}
                                </pre>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="glass-card p-10 rounded-[32px] flex items-center justify-between neon-border-blue relative overflow-hidden group">
          <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center gap-6 relative z-10">
            <div className="bg-blue-600/20 p-5 rounded-2xl border border-blue-500/30">
              <BrainCircuit className="text-blue-500 size-10" />
            </div>
            <div>
              <h3 className="font-bold text-xl text-white tracking-tight">Central de Ajuda & Documentação</h3>
              <p className="text-slate-400 text-sm mt-1 max-w-md">Aprenda a mitigar os riscos mais comuns e veja exemplos práticos de correção para sua stack tecnológica.</p>
            </div>
          </div>
          <button 
            onClick={() => setShowComingSoon(true)}
            className="px-8 py-4 bg-transparent border border-blue-500/50 text-blue-400 font-bold rounded-xl hover:bg-blue-500 hover:text-white transition-all relative z-10 text-sm cursor-pointer"
          >
            ACESSAR DOCUMENTAÇÃO
          </button>
        </section>

        <AnimatePresence>
          {showComingSoon && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-slate-900 border border-white/10 p-8 rounded-3xl max-w-sm w-full text-center relative shadow-2xl"
              >
                <button 
                  onClick={() => setShowComingSoon(false)}
                  className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="size-5" />
                </button>
                <div className="bg-blue-600/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-500/30">
                  <BrainCircuit className="text-blue-500 size-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-space">Em Breve!</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Estamos preparando uma base de conhecimento completa com os principais erros e exemplos práticos de correção. Fique atento às próximas atualizações!
                </p>
                <button 
                  onClick={() => setShowComingSoon(false)}
                  className="mt-8 w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all cursor-pointer"
                >
                  ENTENDI
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
