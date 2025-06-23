import { supabase } from '@/lib/supabaseClient';

export async function fetchTotalTokensUsed(userId: string): Promise<number> {
  const { data, error } = await supabase
    .from('usage_logs')
    .select('"tokensUsed"')
    .eq('userId', userId);

  if (error) throw error;
  return data ? data.reduce((sum, log) => sum + log.tokensUsed, 0) : 0;
}
