import { supabase } from '@/lib/supabaseClient';
import { Subscription, UsageLog, UsageChartData, RawUsageChartData } from '@/types/dashboard';
import { getPlanByUserId } from '@/lib/planChecker';

export async function fetchSubscriptionData(userId: string): Promise<Pick<Subscription, 'plan' | 'user_id'> | null> {
  let subscriptionData: Pick<Subscription, 'plan' | 'user_id'> | null = null;
  const { data, error: subscriptionError } = await supabase
    .from('subscriptions')
    .select('plan, user_id')
    .eq('user_id', userId)
    .single();

  if (subscriptionError && subscriptionError.code !== 'PGRST116') {
    throw subscriptionError;
  }

  if (data) {
    subscriptionData = {
      plan: data.plan as Subscription['plan'],
      user_id: data.user_id,
    };
  } else {
    subscriptionData = { plan: 'free', user_id: userId };
  }
  return subscriptionData;
}

export async function fetchTotalTokensUsed(userId: string): Promise<number> {
  const { data: totalTokensUsedData, error: totalTokensUsedError } = await supabase
    .from('usage_logs')
    .select('tokens_used')
    .eq('user_id', userId);

  if (totalTokensUsedError) throw totalTokensUsedError;
  return totalTokensUsedData ? totalTokensUsedData.reduce((sum: number, log: { tokens_used: number }) => sum + log.tokens_used, 0) : 0;
}

export async function fetchTokenLimit(userId: string): Promise<number> {
  const userPlan = await getPlanByUserId(userId);
  return userPlan?.token_limit || 0;
}

export async function fetchTotalMessages(userId: string): Promise<number> {
  const { count: totalMessages, error: messagesError } = await supabase
    .from('conversations')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);

  if (messagesError) throw messagesError;
  return totalMessages || 0;
}

export async function fetchTotalApiCost(userId: string): Promise<number> {
  const { data: totalApiCostData, error: apiCostError } = await supabase
    .from('usage_logs')
    .select('cost')
    .eq('user_id', userId);

  if (apiCostError) throw apiCostError;
  return totalApiCostData ? totalApiCostData.reduce((sum: number, log: { cost: number }) => sum + log.cost, 0) : 0;
}

export async function fetchUsageChartData(userId: string): Promise<UsageChartData[]> {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const { data: usageChartRawData, error: usageChartError } = await supabase
    .from('usage_logs')
    .select('created_at, tokens_used')
    .eq('user_id', userId)
    .gte('created_at', sevenDaysAgo.toISOString())
    .order('created_at', { ascending: true });

  if (usageChartError) throw usageChartError;

  const usageChartDataMap = new Map<string, number>();
  usageChartRawData.forEach((log: RawUsageChartData) => {
    const date = new Date(log.created_at).toISOString().split('T')[0];
    usageChartDataMap.set(date, (usageChartDataMap.get(date) || 0) + log.tokens_used);
  });

  return Array.from(usageChartDataMap.entries()).map(([date, tokens_used]) => ({
    date,
    tokens_used,
  }));
}

export async function fetchRecentActivity(userId: string): Promise<UsageLog[]> {
  const { data: recentActivity, error: activityError } = await supabase
    .from('usage_logs')
    .select('created_at, description, tokens_used, cost')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(5);

  if (activityError) throw activityError;
  return recentActivity as UsageLog[];
}