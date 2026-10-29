# AllScan — AuthBrasil CyberSecurity

Plataforma SaaS de análise de vulnerabilidades web. O usuário informa
uma URL, o AllScan executa a varredura e devolve um **score de
segurança** com as vulnerabilidades encontradas, severidade e
recomendações de correção — com relatório em PDF e atualização em
tempo real.

> Status: **MVP** (desenvolvimento pausado para foco na graduação).
> A orquestração e o pipeline de scan estão implementados; o engine
> de detecção está em evolução.

## O que faz

- Varredura de URLs: certificado SSL, portas expostas, headers de
  segurança (CSP, X-Frame-Options), exposição de versão do servidor,
  indicadores de SQL Injection
- Score de segurança por scan + classificação por severidade
  (critical / high / medium / low)
- Recomendação de remediação para cada achado
- Relatório em PDF e notificações em tempo real (WebSocket)
- Área de cliente: dashboard, histórico de scans, relatórios
- Área admin + planos/assinatura (Supabase Auth + JWT)

## Stack

- **Frontend**: React 18 + TypeScript + Vite + TailwindCSS + Recharts
- **Backend**: Express (server.ts) — orquestração de scans
- **Dados**: Supabase (auth + Postgres) e better-sqlite3 (scans locais)
- **Tempo real**: ws (WebSocket) — status do scan ao vivo
- **Relatórios**: pdfkit | **IA**: @google/genai (Gemini)

## Como rodar

```bash
npm install
cp .env.example .env.local   # GEMINI_API_KEY, VITE_SUPABASE_*, VITE_API_URL
npm run dev
```

## Arquitetura

```
frontend (React) ──► /api/scans (Express) ──► orquestrador de scan
      ▲                     │                       │
      └── WebSocket ◄───────┘                       ▼
        status ao vivo                    SQLite + vulnerabilidades
                                          Supabase (usuários/planos)
```

Desenvolvido com fluxo AI-assisted (Google AI Studio + agentes de
código) pela **AuthBrasil** — authbrasil.com.br
