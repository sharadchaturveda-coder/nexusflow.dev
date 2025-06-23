import { supabase } from '@/lib/supabaseClient';
import { UsageLog } from '@/types/dashboard';

export async function fetchRecentActivity(userId: string): Promise<UsageLog[]> {
  const { data, error } = await supabase
    .from('usage_logs')
    .select('id, user_id, created_at, description, tokens_used, cost')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) throw error;
  return data as UsageLog[];
}
