// lib/dashboard/dataFetchers.ts

import { supabase } from '@/lib/supabaseClient';
import { Subscription, UsageLog, UsageChartData, RawUsageChartData } from '@/types/dashboard';
import { getPlanByUserId } from '@/lib/planChecker';

export async function fetchSubscriptionData(userId: string): Promise<Subscription> {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('plan, "tokenLimit"')
    .eq('"userId"', userId) // Changed user_id to "user_id"
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching subscription data:', error);
    // If no subscription found, default to free plan with 0 tokens used and default limit
    return { plan: 'free', tokensUsed: 0, tokenLimit: 0, userId };
  }

  const tokenLimit = data?.tokenLimit || 0;

  return {
    plan: data?.plan || 'free',
    tokensUsed: 0, // This will be populated by fetchTotalTokensUsed
    tokenLimit: tokenLimit,
    userId: userId,
  };
}

export async function fetchTotalTokensUsed(userId: string): Promise<number> {
  const { data, error } = await supabase
    .from('usage_logs')
    .select('"tokensUsed"')
    .eq('userId', userId);

  if (error) throw error;
  return data ? data.reduce((sum, log) => sum + log.tokensUsed, 0) : 0;
}


export async function fetchTotalMessages(userId: string): Promise<number> {
  const { count, error } = await supabase
    .from('conversations')
    .select('*', { count: 'exact', head: true })
    .eq('userId', userId);

  if (error) throw error;
  return count || 0;
}

export async function fetchTotalApiCost(userId: string): Promise<number> {
  const { data, error } = await supabase
    .from('usage_logs')
    .select('cost')
    .eq('userId', userId);

  if (error) throw error;
  return data ? data.reduce((sum, log) => sum + log.cost, 0) : 0;
}

export async function fetchUsageChartData(userId: string): Promise<UsageChartData[]> {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const { data, error } = await supabase
    .from('usage_logs')
    .select('"createdAt", "tokensUsed"')
    .eq('userId', userId)
    .gte('"createdAt"', sevenDaysAgo.toISOString())
    .order('"createdAt"', { ascending: true });

  if (error) throw error;

  const usageMap = new Map<string, number>();
  (data as RawUsageChartData[]).forEach(log => {
    const date = new Date(log.createdAt).toISOString().split('T')[0];
    usageMap.set(date, (usageMap.get(date) || 0) + log.tokensUsed);
  });

  return Array.from(usageMap.entries()).map(([date, tokensUsed]) => ({
    date,
    tokensUsed,
  }));
}

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
