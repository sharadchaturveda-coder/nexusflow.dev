// lib/usageLogger.ts (New version)
import { supabase } from './supabaseClient';

export async function logUsage(userId: string, tokensUsed: number, cost: number) {
  // Use a transaction to ensure both operations succeed or fail together
  const { error } = await supabase.rpc('log_and_update_usage', {
    p_user_id: userId,
    p_tokens_used: tokensUsed,
    p_cost: cost
  });
  if (error) throw error;
}
