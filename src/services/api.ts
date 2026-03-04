/**
 * AuthBrasil - Camada de Integração com a API Backend (FastAPI)
 * 
 * Este arquivo contém as definições de tipos e funções para comunicar com o
 * repositório backend: https://github.com/Nilmarsilva/AuthBrasil-CyberSecurity-Ltda
 * 
 * Instruções para o desenvolvedor:
 * 1. Configure a URL da sua API no arquivo .env (VITE_API_URL).
 * 2. Certifique-se de que o CORS está habilitado no FastAPI (main.py).
 * 3. Se estiver usando Supabase Auth, adicione o token JWT no cabeçalho Authorization.
 */

import axios from 'axios';

// URL base da API (definida no .env ou fallback para localhost)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * TIPOS DE DADOS (Espelhados do app/schemas.py do Backend)
 */

export interface SecurityHeaders {
  strict_transport_security: boolean;
  content_security_policy: boolean;
  x_frame_options: boolean;
  x_content_type_options: boolean;
  referrer_policy: boolean;
  permissions_policy: boolean;
  x_xss_protection: boolean;
}

export interface SecurityIssue {
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  category: string;
  description: string;
  recommendation?: string;
}

export interface ScanResult {
  url: string;
  ssl_valid: boolean;
  ssl_expires_at?: string;
  https_redirect: boolean;
  security_headers: SecurityHeaders;
  open_ports: number[];
  detected_cms?: string;
  detected_technologies?: Record<string, any>;
  service_versions?: Record<string, any>;
  ssl_details?: Record<string, any>;
  score: number;
  issues: SecurityIssue[];
  scan_timestamp: string;
}

export interface ScanResponse {
  id: number;
  url: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  created_at: string;
}

export interface ScanDetail extends ScanResponse {
  result?: ScanResult;
  error_message?: string;
  updated_at?: string;
  completed_at?: string;
}

/**
 * SERVIÇOS DE API
 */

export const scanService = {
  /**
   * Dispara um novo scan de segurança para uma URL.
   * Mapeia para: POST /scans/
   */
  async createScan(url: string): Promise<ScanResponse> {
    const response = await api.post<ScanResponse>('/scans/', { url });
    return response.data;
  },

  /**
   * Retorna a lista de todos os scans realizados.
   * Mapeia para: GET /scans/
   */
  async listScans(skip = 0, limit = 100): Promise<ScanResponse[]> {
    const response = await api.get<ScanResponse[]>('/scans/', {
      params: { skip, limit },
    });
    return response.data;
  },

  /**
   * Retorna os detalhes completos de um scan específico, incluindo resultados.
   * Mapeia para: GET /scans/{id}
   */
  async getScanDetail(id: number): Promise<ScanDetail> {
    const response = await api.get<ScanDetail>(`/scans/${id}`);
    return response.data;
  },

  /**
   * Retorna o histórico de scans para um domínio específico.
   * Mapeia para: GET /scans/history/{domain}
   */
  async getHistoryByDomain(domain: string, limit = 10): Promise<ScanResponse[]> {
    const response = await api.get<ScanResponse[]>(`/scans/history/${domain}`, {
      params: { limit },
    });
    return response.data;
  },

  /**
   * Remove um scan do banco de dados.
   * Mapeia para: DELETE /scans/{id}
   */
  async deleteScan(id: number): Promise<void> {
    await api.delete(`/scans/${id}`);
  },

  /**
   * Retorna a URL do relatório HTML (pode ser usado em um iframe ou link direto).
   * Mapeia para: GET /scans/{id}/report
   */
  getReportUrl(id: number): string {
    return `${API_BASE_URL}/scans/${id}/report`;
  }
};

export default api;
