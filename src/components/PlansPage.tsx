import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  CreditCard, 
  Download, 
  AlertTriangle, 
  Info 
} from 'lucide-react';

export default function PlansPage() {
  const invoices = [
    { date: '12 Set, 2023', status: 'Paga', amount: 'R$ 149,00', statusType: 'success' },
    { date: '12 Ago, 2023', status: 'Paga', amount: 'R$ 149,00', statusType: 'success' },
    { date: '12 Jul, 2023', status: 'Erro', amount: 'R$ 149,00', statusType: 'error' },
  ];

  const currentPlan = {
    name: 'Profissional',
    status: 'Ativo',
    nextBilling: '12 de Outubro, 2023',
    price: 'R$ 149,00/mês'
  };

  return (
    <div className="flex-grow overflow-y-auto px-4 sm:px-8 py-6 sm:py-10 max-w-7xl mx-auto font-space min-h-full">
      {/* Header Section */}
      <header className="mb-8 sm:mb-12">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">Planos e Assinatura</h1>
          <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-400">Escolha seu nível de proteção e garanta a segurança absoluta dos seus ativos digitais.</p>
        </div>
      </header>

      {/* Pricing Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {/* Individual Card */}
        <div className="glass-card flex flex-col p-8 rounded-2xl">
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-1">Individual</h2>
            <p className="text-sm text-slate-500 mb-6">Para projetos pessoais e testes.</p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black">R$ 0</span>
              <span className="text-slate-500 font-medium">/mês</span>
            </div>
          </div>
          <button className="w-full py-3 px-4 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-sm font-bold transition-all mb-8 cursor-pointer">
            Começar Agora
          </button>
          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Recursos Inclusos</p>
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle2 className="text-green-500 size-5" />
              Scan Básico de Vulnerabilidades
            </div>
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle2 className="text-green-500 size-5" />
              Verificações HTTP/SSL
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <XCircle className="text-slate-600 size-5" />
              Relatórios em PDF
            </div>
          </div>
        </div>

        {/* Profissional Card */}
        <div className="glass-card neon-glow relative flex flex-col p-8 rounded-2xl bg-gradient-to-b from-primary/5 to-transparent border-primary/30">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest">
            Recomendado
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-1 text-primary">Profissional</h2>
            <p className="text-sm text-slate-500 mb-6">Segurança robusta para empresas em crescimento.</p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black">R$ 149</span>
              <span className="text-slate-500 font-medium">/mês</span>
            </div>
          </div>
          <button className="w-full py-3 px-4 rounded-xl bg-primary hover:bg-primary/90 text-white text-sm font-bold shadow-lg shadow-primary/30 transition-all mb-8 cursor-pointer">
            Assinar Agora
          </button>
          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Todos os recursos Individual, mais:</p>
            {[
              'Deep Scan (Análise Profunda)',
              'Check de Portas e Serviços',
              'Detecção de CMS (WP, Joomla, etc)',
              'Fila Celery Prioritária',
              'Relatórios PDF Detalhados'
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <ShieldCheck className="text-primary size-5" />
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Enterprise Card */}
        <div className="glass-card flex flex-col p-8 rounded-2xl">
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-1">Enterprise</h2>
            <p className="text-sm text-slate-500 mb-6">Infraestrutura crítica e conformidade total.</p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black">Sob Consulta</span>
            </div>
          </div>
          <button className="w-full py-3 px-4 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-sm font-bold transition-all mb-8 cursor-pointer">
            Falar com Vendas
          </button>
          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Escalabilidade Total</p>
            {[
              'Scans Ilimitados',
              'Acesso total via API',
              'Integrações Webhook (Slack/Discord)',
              'Suporte Dedicado 24/7'
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <CheckCircle2 className="text-green-500 size-5" />
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Billing Info & History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Current Plan Info */}
        <section className="flex flex-col gap-6">
          <h3 className="text-xl font-bold text-white">Plano Atual</h3>
          <div className="glass-card p-8 rounded-2xl border-primary/20 bg-primary/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <ShieldCheck className="size-24 text-primary" />
            </div>
            
            <div className="flex flex-col gap-6 relative z-10">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-primary uppercase tracking-widest">Assinatura Ativa</span>
                  <h4 className="text-3xl font-black text-white">{currentPlan.name}</h4>
                </div>
                <div className="px-3 py-1 rounded-full bg-success-neon/10 border border-success-neon/20 text-success-neon text-[10px] font-bold uppercase tracking-widest">
                  {currentPlan.status}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Valor do Plano</span>
                  <span className="text-sm font-bold text-slate-200">{currentPlan.price}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Próxima Cobrança</span>
                  <span className="text-sm font-bold text-slate-200">{currentPlan.nextBilling}</span>
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <button className="flex-1 bg-white text-black font-bold py-2.5 rounded-xl hover:bg-slate-200 transition-all text-sm cursor-pointer">
                  Gerenciar no Stripe
                </button>
                <button className="flex-1 border border-slate-700 text-slate-300 font-bold py-2.5 rounded-xl hover:bg-slate-800 transition-all text-sm cursor-pointer">
                  Alterar Plano
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 px-2">
            <Info className="text-slate-500 size-4" />
            <p className="text-xs text-slate-500">Os pagamentos são processados de forma segura pelo <strong>Stripe</strong>. Não armazenamos seus dados de cartão.</p>
          </div>
        </section>

        {/* Invoice History */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">Histórico de Faturas</h3>
            <button className="text-primary text-sm font-bold hover:underline cursor-pointer">Ver todas</button>
          </div>
          <div className="glass-card rounded-2xl overflow-hidden border-slate-800">
            {/* Desktop Table */}
            <table className="hidden sm:table w-full text-left text-sm">
              <thead className="bg-slate-900/50 text-slate-400 font-bold uppercase text-[10px] tracking-widest border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Data</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Valor</th>
                  <th className="px-6 py-4 text-right">Recibo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {invoices.map((invoice, i) => (
                  <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-300">{invoice.date}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter ${
                        invoice.statusType === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                      }`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-300">{invoice.amount}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-500 hover:text-white transition-colors cursor-pointer">
                        {invoice.statusType === 'success' ? <Download className="size-4" /> : <AlertTriangle className="size-4" />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile List */}
            <div className="sm:hidden divide-y divide-slate-800">
              {invoices.map((invoice, i) => (
                <div key={i} className="p-4 flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-300">{invoice.date}</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter ${
                      invoice.statusType === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                    }`}>
                      {invoice.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">{invoice.amount}</span>
                    <button className="text-slate-500 hover:text-white transition-colors cursor-pointer">
                      {invoice.statusType === 'success' ? <Download className="size-4" /> : <AlertTriangle className="size-4" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-[10px] text-slate-500 italic px-2">Nota: Os recibos detalhados podem ser acessados diretamente no portal do cliente Stripe.</p>
        </section>
      </div>
    </div>
  );
}
