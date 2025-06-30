import { supabase } from './supabaseClient';

export async function getBotPersona(userId: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('bot_personas')
    .select('persona_content')
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found, which is fine
    console.error('Error fetching bot persona:', error);
    throw error;
  }

  return data ? data.persona_content : null;
}
