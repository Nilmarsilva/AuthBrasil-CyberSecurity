import { createClient } from '@supabase/supabase-js';

const getEnv = (key: string) => {
  return import.meta.env[key] || (window as any).process?.env?.[key] || '';
};

const supabaseUrl = getEnv('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnv('VITE_SUPABASE_ANON_KEY');

// Inicializa o cliente do Supabase de forma ultra-segura
const createSupabase = () => {
  try {
    if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('sua-url')) {
      console.log("Supabase aguardando configuração de URL e Key...");
      return null;
    }
    
    // Validação básica de URL
    if (!supabaseUrl.startsWith('https://')) {
      console.error("ERRO: A URL do Supabase deve começar com https://");
      return null;
    }

    console.log("Conectando ao Supabase em:", supabaseUrl);
    return createClient(supabaseUrl, supabaseAnonKey);
  } catch (e) {
    console.error("Erro fatal ao inicializar Supabase:", e);
    return null;
  }
};

export const supabase = createSupabase();

/**
 * Função para testar a conectividade de rede
 */
export const testSupabaseConnection = async () => {
  if (!supabaseUrl) return { success: false, message: "URL não configurada" };
  
  try {
    const start = Date.now();
    // Teste 1: Chamada básica de API com headers completos
    const response = await fetch(`${supabaseUrl}/rest/v1/?select=1`, {
      method: 'GET',
      headers: { 
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`
      }
    });
    const duration = Date.now() - start;
    
    if (response.ok) {
      // Teste 2: Verificar se a tabela profiles existe e é acessível
      if (supabase) {
        const { error: tableError } = await supabase.from('profiles').select('id').limit(1);
        if (tableError) {
          return { 
            success: true, 
            message: `Conexão OK (${duration}ms), mas a tabela 'profiles' retornou erro: ${tableError.message}. Você rodou o SQL?` 
          };
        }
      }
      return { success: true, message: `Conectado com sucesso! Banco de dados pronto. (${duration}ms)` };
    } else {
      const errorData = await response.json().catch(() => ({}));
      let msg = `Erro ${response.status}: ${errorData.message || 'Acesso negado'}`;
      if (response.status === 401) msg = "Erro 401: Chave 'anon' inválida ou sem permissão de acesso ao schema public.";
      return { success: false, message: msg };
    }
  } catch (e: any) {
    return { success: false, message: `Falha na rede: ${e.message}. Verifique se a URL está correta.` };
  }
};

/**
 * LÓGICA DE ADMIN MASTER (DICA PARA O NILMAR)
 * 
 * Para tornar o primeiro usuário um Admin Master:
 * 1. No Supabase, vá em SQL Editor.
 * 2. Cole o seguinte script:
 * 
 * CREATE TABLE IF NOT EXISTS public.profiles (
 *   id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
 *   is_admin boolean DEFAULT false,
 *   full_name text,
 *   company text,
 *   role text,
 *   phone text,
 *   avatar_url text,
 *   updated_at timestamp with time zone DEFAULT now()
 * );
 * 
 * -- Habilitar RLS (Row Level Security)
 * ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
 * 
 * -- Criar políticas de acesso
 * CREATE POLICY "Usuários podem ver seu próprio perfil" ON public.profiles
 *   FOR SELECT USING (auth.uid() = id);
 * 
 * CREATE POLICY "Usuários podem atualizar seu próprio perfil" ON public.profiles
 *   FOR UPDATE USING (auth.uid() = id);
 * 
 * -- Política para Admins verem todos os perfis
 * CREATE POLICY "Admins podem ver todos os perfis" ON public.profiles
 *   FOR SELECT USING (
 *     EXISTS (
 *       SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true
 *     )
 *   );
 * 
 * -- Criar bucket para avatares
 * -- Vá em Storage > New Bucket > Nome: 'avatars' > Public: true
 * 
 * -- Trigger para tornar o primeiro usuário admin automaticamente
 * CREATE OR REPLACE FUNCTION public.handle_first_user_admin()
 * RETURNS TRIGGER AS $$
 * BEGIN
 *   IF (SELECT COUNT(*) FROM public.profiles) = 0 THEN
 *     INSERT INTO public.profiles (id, is_admin, full_name, company, role, phone) 
 *     VALUES (
 *       NEW.id, 
 *       true, 
 *       COALESCE(NEW.raw_user_meta_data->>'full_name', 'Admin Master'),
 *       COALESCE(NEW.raw_user_meta_data->>'company', ''),
 *       COALESCE(NEW.raw_user_meta_data->>'role', 'CEO'),
 *       COALESCE(NEW.raw_user_meta_data->>'phone', '')
 *     );
 *   ELSE
 *     INSERT INTO public.profiles (id, is_admin, full_name, company, role, phone) 
 *     VALUES (
 *       NEW.id, 
 *       false, 
 *       COALESCE(NEW.raw_user_meta_data->>'full_name', 'Usuário'),
 *       COALESCE(NEW.raw_user_meta_data->>'company', ''),
 *       COALESCE(NEW.raw_user_meta_data->>'role', 'Membro'),
 *       COALESCE(NEW.raw_user_meta_data->>'phone', '')
 *     );
 *   END IF;
 *   RETURN NEW;
 * END;
 * $$ LANGUAGE plpgsql SECURITY DEFINER;
 * 
 * CREATE TRIGGER on_auth_user_created
 *   AFTER INSERT ON auth.users
 *   FOR EACH ROW EXECUTE FUNCTION public.handle_first_user_admin();
 */

/**
 * DICA PARA O NILMAR:
 * No Supabase, você já tem um painel de administração completo para:
 * 1. Ver todos os usuários cadastrados.
 * 2. Editar dados diretamente no banco de dados (PostgreSQL).
 * 3. Ver logs de autenticação.
 * 
 * Acesse em: https://supabase.com/dashboard
 */
