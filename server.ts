import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- DATABASE SETUP ---
const db = new Database("security_app.db");

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS scans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
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
  app.post("/api/scans", async (req, res) => {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: "URL é obrigatória" });
    }

    console.log(`[Orquestrador] Iniciando scan Nuclei para: ${url}`);
    
    // Inserir no banco como pendente
    const stmt = db.prepare("INSERT INTO scans (url, status) VALUES (?, ?)");
    const info = stmt.run(url, "running");
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

  // Listar todos os scans
  app.get("/api/scans", (req, res) => {
    const scans = db.prepare("SELECT * FROM scans ORDER BY created_at DESC").all();
    res.json(scans.map(s => ({
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
    res.status(501).json({ error: "Geração de PDF será implementada com PDFKit" });
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
