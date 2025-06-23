import { supabase } from '@/lib/supabaseClient';
import { UsageLog } from '@/types/dashboard';

export async function fetchRecentActivity(userId: string): Promise<UsageLog[]> {
  const { data, error } = await supabase
    .from('usage_logs')
    .select('"createdAt", description, "tokensUsed", cost')
    .eq('userId', userId)
    .order('"createdAt"', { ascending: false })
    .limit(5);

  if (error) throw error;
  return data as UsageLog[];
}
