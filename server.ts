import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import PDFDocument from "pdfkit";

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
    req.user = { sub: 'dev-user-123' };
    return next();
  }

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.SUPABASE_JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
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
      const mockResults = {
        score: 68,
        issues: [
          {
            id: `vuln-${Date.now()}-1`,
            severity: "high",
            category: "SSL/TLS",
            description: "Certificado SSL expira em menos de 30 dias",
            recommendation: "Renove o certificado SSL imediatamente."
          },
          {
            id: `vuln-${Date.now()}-2`,
            severity: "high",
            category: "Database",
            description: "Porta 3306 (MySQL) exposta publicamente",
            recommendation: "Restrinja o acesso via firewall."
          }
        ]
      };

      // Atualizar scan
      db.prepare("UPDATE scans SET status = ?, score = ?, results = ? WHERE id = ?")
        .run("completed", mockResults.score, JSON.stringify(mockResults.issues), scanId);

      // Inserir vulnerabilidades individuais para visão agregada
      const insertVuln = db.prepare(`
        INSERT INTO vulnerabilities (id, scan_id, title, description, severity, status, remediation, category)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);

      mockResults.issues.forEach(issue => {
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
  app.get("/api/scans/:id", (req, res) => {
    const { id } = req.params;
    const scan = db.prepare("SELECT * FROM scans WHERE id = ?").get(id);
    
    if (!scan) {
      return res.status(404).json({ error: "Scan não encontrado" });
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
  app.get("/api/vulnerabilities", (req, res) => {
    const vulns = db.prepare("SELECT * FROM vulnerabilities ORDER BY severity DESC").all();
    res.json({
      total: vulns.length,
      items: vulns
    });
  });

  app.patch("/api/vulnerabilities/:id", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    const info = db.prepare("UPDATE vulnerabilities SET status = ? WHERE id = ?").run(status, id);
    
    if (info.changes === 0) {
      return res.status(404).json({ error: "Vulnerabilidade não encontrada" });
    }

    res.json({ message: `Vulnerabilidade ${id} atualizada para ${status}` });
  });

  /**
   * 3. RELATÓRIOS E ESTATÍSTICAS
   */
  app.get("/api/reports/stats", (req, res) => {
    const stats = db.prepare(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN severity = 'high' THEN 1 ELSE 0 END) as high,
        SUM(CASE WHEN severity = 'medium' THEN 1 ELSE 0 END) as medium,
        SUM(CASE WHEN severity = 'low' THEN 1 ELSE 0 END) as low
      FROM vulnerabilities
    `).get();

    const evolution = db.prepare(`
      SELECT score FROM scans WHERE status = 'completed' ORDER BY created_at ASC LIMIT 10
    `).all().map(s => s.score);

    res.json({
      evolution: evolution.length > 0 ? evolution : [0],
      distribution: {
        high: stats.high || 0,
        medium: stats.medium || 0,
        low: stats.low || 0
      }
    });
  });

  app.get("/api/reports/pdf/:scanId", (req, res) => {
    const { scanId } = req.params;
    const scan = db.prepare("SELECT * FROM scans WHERE id = ?").get(scanId);
    
    if (!scan) {
      return res.status(404).json({ error: "Scan não encontrado" });
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
  app.get("/api/admin/system-stats", (req, res) => {
    const stats = db.prepare(`
      SELECT 
        (SELECT COUNT(*) FROM scans) as total_scans,
        (SELECT COUNT(*) FROM scans WHERE status = 'running') as active_scans
    `).get();

    res.json({
      active_scans: stats.active_scans,
      total_scans: stats.total_scans,
      db_status: "healthy",
      memory_usage: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + " MB"
    });
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

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Error starting server:", err);
});
