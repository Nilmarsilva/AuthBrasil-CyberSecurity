import { supabase } from '../lib/supabase';

/**
 * SERVIÇO DE AUTENTICAÇÃO (SUPABASE)
 * 
 * Este serviço gerencia o login, registro e logout usando o Supabase.
 * Comentários em PT-BR para facilitar sua manutenção.
 */

export const authService = {
  /**
   * Verifica se o Supabase está configurado corretamente
   */
  isConfigured() {
    const isClientReady = !!supabase;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
    const url = import.meta.env.VITE_SUPABASE_URL;
    
    const hasKey = key && key.length > 20;
    const hasUrl = url && url.includes('supabase.co');
    
    if (isClientReady && hasKey && !key.startsWith('eyJ')) {
      console.warn("DICA: Você está usando uma 'Publishable Key'. Se encontrar erros, tente usar a 'Anon Key (Legacy)' que começa com 'eyJ'.");
    }
    
    return isClientReady && hasKey && hasUrl;
  },

  /**
   * Cadastra um novo usuário
   */
  async signUp(email: string, password: string, fullName: string, company?: string, role?: string, phone?: string) {
    if (!supabase) {
      console.warn("Supabase não configurado. Simulando registro...");
      return { user: { email, user_metadata: { full_name: fullName, company, role, phone } } };
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          display_name: fullName, // Alguns provedores usam display_name
          company: company || '',
          role: role || '',
          phone: phone || ''
        }
      }
    });
    if (error) throw error;
    return data;
  },

  /**
   * Faz login de um usuário existente
   */
  async signIn(email: string, password: string) {
    if (!supabase) {
      console.warn("Supabase não configurado. Simulando login...");
      return { user: { email } };
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  /**
   * Faz logout do usuário atual
   */
  async signOut() {
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  /**
   * Obtém o usuário atual logado
   */
  async getCurrentUser() {
    if (!supabase) return null;
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  /**
   * Faz login com provedor social (Google, GitHub)
   */
  async signInWithOAuth(provider: 'google' | 'github') {
    if (!supabase) {
      console.warn(`Supabase não configurado. Simulando login com ${provider}...`);
      return { success: true };
    }
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) throw error;
    return data;
  },

  /**
   * Obtém o perfil completo do usuário (da tabela profiles)
   */
  async getUserProfile(userId: string) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error("Erro ao buscar perfil:", error);
      return null;
    }
    return data;
  },

  /**
   * Atualiza o perfil do usuário
   */
  async updateProfile(userId: string, updates: { full_name?: string, company?: string, role?: string, phone?: string, avatar_url?: string }) {
    if (!supabase) return { success: true };
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId);
    
    if (error) throw error;
    return data;
  },

  /**
   * Obtém todos os usuários (Apenas para Admins)
   */
  async getAllUsers() {
    if (!supabase) return [];
    
    // Buscamos da tabela profiles que contém os dados extras
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('updated_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  /**
   * Upload de avatar para o Supabase Storage
   */
  async uploadAvatar(userId: string, file: File) {
    if (!supabase) return "https://picsum.photos/seed/authbrasil/100/100";
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Math.random()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    return publicUrl;
  },

  /**
   * Envia e-mail de recuperação de senha
   */
  async resetPassword(email: string) {
    if (!supabase) throw new Error("Supabase não configurado. Verifique suas variáveis de ambiente.");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  }
};
