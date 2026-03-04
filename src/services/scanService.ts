import { supabase } from '../lib/supabase';

/**
 * SERVIÇO DE SCANS (VULNERABILIDADES)
 * 
 * Gerencia a criação e listagem de varreduras de segurança.
 */

export interface Scan {
  id: string;
  user_id: string;
  target_url: string;
  score: number;
  status: 'completed' | 'running' | 'failed';
  vulnerabilities: any[];
  created_at: string;
  // Join fields
  profiles?: {
    full_name: string;
    company: string;
  };
}

export const scanService = {
  /**
   * Cria um novo registro de scan
   */
  async createScan(scanData: Omit<Scan, 'id' | 'created_at'>) {
    if (!supabase) return null;
    
    const { data, error } = await supabase
      .from('scans')
      .insert([scanData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  /**
   * Obtém os scans do usuário logado
   */
  async getUserScans(userId: string) {
    if (!supabase) return [];
    
    const { data, error } = await supabase
      .from('scans')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  /**
   * Obtém TODOS os scans (Apenas para Admins)
   */
  async getAllScans() {
    if (!supabase) return [];
    
    try {
      // 1. Buscamos os scans primeiro
      const { data: scans, error: scanError } = await supabase
        .from('scans')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (scanError) throw scanError;
      if (!scans || scans.length === 0) return [];

      // 2. Buscamos os perfis dos usuários que estão nos scans para fazer o "join manual"
      const userIds = [...new Set(scans.map(s => s.user_id))];
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('id, full_name, company')
        .in('id', userIds);
      
      if (profileError) {
        console.warn("Não foi possível buscar os perfis para o join, mostrando apenas IDs.");
        return scans;
      }

      // 3. Mesclamos os dados
      return scans.map(scan => ({
        ...scan,
        profiles: profiles.find(p => p.id === scan.user_id) || null
      }));
    } catch (error) {
      console.error("Erro ao buscar scans:", error);
      throw error;
    }
  },

  /**
   * Deleta um scan
   */
  async deleteScan(scanId: string) {
    if (!supabase) return;
    
    const { error } = await supabase
      .from('scans')
      .delete()
      .eq('id', scanId);
    
    if (error) throw error;
  }
};
