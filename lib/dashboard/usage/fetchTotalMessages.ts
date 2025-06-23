import { supabase } from '@/lib/supabaseClient';

export async function fetchTotalMessages(userId: string): Promise<number> {
  const { count, error } = await supabase
    .from('conversations')
    .select('*', { count: 'exact', head: true })
    .eq('userId', userId);

  if (error) throw error;
  return count || 0;
}
