import { supabase } from '@/lib/supabaseClient';

export async function fetchTotalApiCost(userId: string): Promise<number> {
  const { data, error } = await supabase
    .from('usage_logs')
    .select('cost')
    .eq('userId', userId);

  if (error) throw error;
  return data ? data.reduce((sum, log) => sum + log.cost, 0) : 0;
}
