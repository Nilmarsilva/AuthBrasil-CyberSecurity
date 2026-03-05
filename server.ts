import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import PDFDocument from "pdfkit";
import { WebSocketServer, WebSocket } from "ws";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- DATABASE SETUP ---
const db = new Database("security_app.db");

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS scans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    url TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    score INTEGER DEFAULT 0,
    results TEXT, -- JSON string
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS vulnerabilities (
    id TEXT PRIMARY KEY,
    scan_id INTEGER,
    title TEXT,
    description TEXT,
    severity TEXT,
    status TEXT DEFAULT 'open',
    remediation TEXT,
    category TEXT,
    FOREIGN KEY(scan_id) REFERENCES scans(id)
  );
`);

// Garantir que a coluna user_id existe (migração simples)
try {
  db.exec("ALTER TABLE scans ADD COLUMN user_id TEXT");
} catch (e) {
  // Coluna já existe
}

// Middleware de Autenticação (Supabase JWT)
const authenticate = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  
  if (!process.env.SUPABASE_JWT_SECRET || process.env.SUPABASE_JWT_SECRET === 'your-jwt-secret') {
    console.warn("[Auth] SUPABASE_JWT_SECRET não configurado ou padrão. Usando modo de desenvolvimento.");
    req.user = { sub: 'dev-user-123', email: 'dev@example.com' };
    return next();
  }

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded: any = jwt.verify(token, process.env.SUPABASE_JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
};

// Middleware de Admin
const adminOnly = (req: any, res: any, next: any) => {
  const adminEmails = ['NilmarBioSilva@gmail.com', 'admin@authbrasil.com.br'];
  if (req.user && (adminEmails.includes(req.user.email) || req.user.sub === 'dev-user-123')) {
    next();
  } else {
    res.status(403).json({ error: "Acesso negado: Apenas administradores" });
  }
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- API ROUTES ---

  /**
   * 1. ORQUESTRAÇÃO DE SCANS
   */
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      engine: "Nuclei-Ready",
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    });
  });

  // Iniciar novo scan
  app.post("/api/scans", authenticate, async (req: any, res: any) => {
    const { url } = req.body;
    const userId = req.user.sub; // 'sub' é o ID do usuário no JWT do Supabase
    
    if (!url) {
      return res.status(400).json({ error: "URL é obrigatória" });
    }

    console.log(`[Orquestrador] Usuário ${userId} iniciando scan para: ${url}`);
    
    // Inserir no banco com user_id
    const stmt = db.prepare("INSERT INTO scans (url, status, user_id) VALUES (?, ?, ?)");
    const info = stmt.run(url, "running", userId);
    const scanId = info.lastInsertRowid;

    // Simular processamento assíncrono (Nuclei)
    setTimeout(() => {
      const templates = [
        { severity: "high", category: "SSL/TLS", description: "Certificado SSL expira em menos de 30 dias", recommendation: "Renove o certificado SSL imediatamente." },
        { severity: "high", category: "Database", description: "Porta 3306 (MySQL) exposta publicamente", recommendation: "Restrinja o acesso via firewall." },
        { severity: "medium", category: "Headers", description: "Falta cabeçalho Content-Security-Policy", recommendation: "Implemente uma política de CSP robusta." },
        { severity: "medium", category: "Headers", description: "Falta cabeçalho X-Frame-Options", recommendation: "Configure X-Frame-Options para evitar Clickjacking." },
        { severity: "low", category: "Information Disclosure", description: "Versão do servidor exposta no cabeçalho Server", recommendation: "Oculte a versão do servidor nas configurações." },
        { severity: "critical", category: "Injection", description: "Potencial vulnerabilidade de SQL Injection detectada", recommendation: "Use prepared statements e valide todas as entradas." }
      ];

      // Selecionar aleatoriamente 2 a 4 vulnerabilidades
      const selectedIssues = templates
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 3) + 2);

      const totalPoints = selectedIssues.reduce((acc, issue) => {
        if (issue.severity === 'critical') return acc + 40;
        if (issue.severity === 'high') return acc + 25;
        if (issue.severity === 'medium') return acc + 10;
        return acc + 5;
      }, 0);

      const score = Math.max(0, 100 - totalPoints);

      const issuesWithId = selectedIssues.map((issue, idx) => ({
        ...issue,
        id: `vuln-${Date.now()}-${idx}`
      }));

      // Atualizar scan
      db.prepare("UPDATE scans SET status = ?, score = ?, results = ? WHERE id = ?")
        .run("completed", score, JSON.stringify(issuesWithId), scanId);

      // Inserir vulnerabilidades individuais para visão agregada
      const insertVuln = db.prepare(`
        INSERT INTO vulnerabilities (id, scan_id, title, description, severity, status, remediation, category)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);

      issuesWithId.forEach(issue => {
        insertVuln.run(
          issue.id,
          scanId,
          issue.description,
          issue.category,
          issue.severity,
          "open",
          issue.recommendation,
          issue.category
        );
      });

      console.log(`[Orquestrador] Scan ${scanId} concluído.`);
      
      // Notificar usuário via WebSocket
      notifyUser(userId, {
        type: "scan_completed",
        scanId: scanId,
        url: url,
        score: score
      });
    }, 5000); // 5 segundos de simulação
    
    res.json({
      id: scanId,
      url: url,
      status: "running",
      engine: "nuclei",
      message: "Varredura iniciada. O motor está processando os templates.",
      created_at: new Date().toISOString()
    });
  });

  // Obter detalhes/resultados de um scan
  app.get("/api/scans/:id", authenticate, (req: any, res: any) => {
    const { id } = req.params;
    const userId = req.user.sub;
    const scan = db.prepare("SELECT * FROM scans WHERE id = ? AND user_id = ?").get(id, userId);
    
    if (!scan) {
      return res.status(404).json({ error: "Scan não encontrado ou acesso negado" });
    }

    res.json({
      ...scan,
      results: scan.results ? JSON.parse(scan.results) : null
    });
  });

  // Listar todos os scans (filtrados por usuário)
  app.get("/api/scans", authenticate, (req: any, res: any) => {
    const userId = req.user.sub;
    const scans = db.prepare("SELECT * FROM scans WHERE user_id = ? ORDER BY created_at DESC").all(userId);
    res.json(scans.map((s: any) => ({
      ...s,
      results: s.results ? JSON.parse(s.results) : null
    })));
  });

  /**
   * 2. GERENCIAMENTO DE VULNERABILIDADES (AGREGADO)
   */
  app.get("/api/vulnerabilities", authenticate, (req: any, res: any) => {
    const userId = req.user.sub;
    const vulns = db.prepare(`
      SELECT v.* FROM vulnerabilities v
      JOIN scans s ON v.scan_id = s.id
      WHERE s.user_id = ?
      ORDER BY v.severity DESC
    `).all(userId);
    
    res.json({
      total: vulns.length,
      items: vulns
    });
  });

  app.patch("/api/vulnerabilities/:id", authenticate, (req: any, res: any) => {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user.sub;
    
    // Verificar se a vulnerabilidade pertence ao usuário
    const vuln = db.prepare(`
      SELECT v.id FROM vulnerabilities v
      JOIN scans s ON v.scan_id = s.id
      WHERE v.id = ? AND s.user_id = ?
    `).get(id, userId);

    if (!vuln) {
      return res.status(404).json({ error: "Vulnerabilidade não encontrada ou acesso negado" });
    }
    
    db.prepare("UPDATE vulnerabilities SET status = ? WHERE id = ?").run(status, id);
    
    res.json({ message: `Vulnerabilidade ${id} atualizada para ${status}` });
  });

  /**
   * 3. RELATÓRIOS E ESTATÍSTICAS
   */
  app.get("/api/reports/stats", authenticate, (req: any, res: any) => {
    const userId = req.user.sub;
    const stats = db.prepare(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN v.severity = 'high' THEN 1 ELSE 0 END) as high,
        SUM(CASE WHEN v.severity = 'medium' THEN 1 ELSE 0 END) as medium,
        SUM(CASE WHEN v.severity = 'low' THEN 1 ELSE 0 END) as low
      FROM vulnerabilities v
      JOIN scans s ON v.scan_id = s.id
      WHERE s.user_id = ?
    `).get(userId);

    const evolution = db.prepare(`
      SELECT score FROM scans 
      WHERE status = 'completed' AND user_id = ? 
      ORDER BY created_at ASC LIMIT 10
    `).all(userId).map((s: any) => s.score);

    res.json({
      evolution: evolution.length > 0 ? evolution : [0],
      distribution: {
        high: stats.high || 0,
        medium: stats.medium || 0,
        low: stats.low || 0
      }
    });
  });

  app.get("/api/reports/pdf/:scanId", authenticate, (req: any, res: any) => {
    const { scanId } = req.params;
    const userId = req.user.sub;
    const scan = db.prepare("SELECT * FROM scans WHERE id = ? AND user_id = ?").get(scanId, userId);
    
    if (!scan) {
      return res.status(404).json({ error: "Scan não encontrado ou acesso negado" });
    }

    const doc = new PDFDocument({ margin: 50 });
    const filename = `Relatorio_Seguranca_${scanId}.pdf`;

    res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-type', 'application/pdf');

    doc.pipe(res);

    // Header
    doc.fontSize(25).text('AuthBrasil - Relatório de Segurança', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`URL Analisada: ${scan.url}`);
    doc.text(`Data do Scan: ${new Date(scan.created_at).toLocaleString()}`);
    doc.text(`Score Global: ${scan.score}/100`);
    doc.moveDown();

    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown();

    // Vulnerabilidades
    doc.fontSize(18).text('Vulnerabilidades Encontradas', { underline: true });
    doc.moveDown();

    const issues = scan.results ? JSON.parse(scan.results) : [];
    
    if (issues.length === 0) {
      doc.fontSize(12).text('Nenhuma vulnerabilidade crítica encontrada.');
    } else {
      issues.forEach((issue: any, index: number) => {
        doc.fontSize(14).fillColor(issue.severity === 'high' ? 'red' : 'orange').text(`${index + 1}. ${issue.description.toUpperCase()}`);
        doc.fontSize(10).fillColor('black').text(`Severidade: ${issue.severity}`);
        doc.text(`Categoria: ${issue.category}`);
        doc.text(`Recomendação: ${issue.recommendation}`);
        doc.moveDown();
      });
    }

    doc.end();
  });

  /**
   * 4. ADMINISTRAÇÃO
   */
  app.get("/api/admin/system-stats", authenticate, adminOnly, (req, res) => {
    const stats = db.prepare(`
      SELECT 
        (SELECT COUNT(*) FROM scans) as total_scans,
        (SELECT COUNT(*) FROM scans WHERE status = 'running') as active_scans,
        (SELECT COUNT(DISTINCT user_id) FROM scans) as total_users
    `).get();

    res.json({
      active_scans: stats.active_scans,
      total_scans: stats.total_scans,
      total_users: stats.total_users,
      db_status: "healthy",
      memory_usage: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + " MB",
      os_uptime: process.uptime().toFixed(0) + "s"
    });
  });

  app.get("/api/admin/all-scans", authenticate, adminOnly, (req, res) => {
    const scans = db.prepare("SELECT * FROM scans ORDER BY created_at DESC LIMIT 50").all();
    res.json(scans.map((s: any) => ({
      ...s,
      results: s.results ? JSON.parse(s.results) : null
    })));
  });

  // --- VITE MIDDLEWARE ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });

  // --- WEBSOCKET SETUP ---
  const wss = new WebSocketServer({ server });
  const clients = new Map<string, WebSocket>();

  wss.on("connection", (ws, req) => {
    // No ambiente do AI Studio, o token pode vir na query string ou ser enviado logo após a conexão
    console.log("[WS] Novo cliente tentando conectar");

    ws.on("message", (message) => {
      try {
        const data = JSON.parse(message.toString());
        if (data.type === "auth" && data.token) {
          // Validar token
          try {
            const decoded: any = jwt.verify(data.token, process.env.SUPABASE_JWT_SECRET!);
            const userId = decoded.sub;
            clients.set(userId, ws);
            console.log(`[WS] Cliente autenticado: ${userId}`);
            ws.send(JSON.stringify({ type: "auth_success" }));
          } catch (e) {
            ws.send(JSON.stringify({ type: "auth_error", message: "Token inválido" }));
          }
        }
      } catch (e) {
        console.error("[WS] Erro ao processar mensagem:", e);
      }
    });

    ws.on("close", () => {
      // Remover cliente do mapa
      for (const [userId, client] of clients.entries()) {
        if (client === ws) {
          clients.delete(userId);
          console.log(`[WS] Cliente desconectado: ${userId}`);
          break;
        }
      }
    });
  });

  // Função auxiliar para enviar notificações
  const notifyUser = (userId: string, data: any) => {
    const client = clients.get(userId);
    if (client && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  };
}

startServer().catch((err) => {
  console.error("Error starting server:", err);
});
