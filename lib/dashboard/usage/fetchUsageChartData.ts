import { supabase } from '@/lib/supabaseClient';
import { UsageChartData, RawUsageChartData } from '@/types/dashboard';

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
