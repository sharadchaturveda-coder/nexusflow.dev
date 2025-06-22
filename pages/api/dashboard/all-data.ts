import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { supabase } from '@/lib/supabaseClient';
import { Subscription, UsageLog, UsageChartData, HeroMetrics, DashboardData, RawUsageChartData, Plan } from '@/types/dashboard';
import { getPlanByUserId } from '@/lib/planChecker';

export default async function handler(req: NextApiRequest, res: NextApiResponse<DashboardData | { error: string }>) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const userId = session.user?.id;

  if (!userId) {
    return res.status(400).json({ error: 'User ID not found in session' });
  }

  try {
    // 1. Subscription Data
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

    const { data: totalTokensUsedData, error: totalTokensUsedError } = await supabase
      .from('usage_logs')
      .select('tokens_used')
      .eq('user_id', userId);

    if (totalTokensUsedError) throw totalTokensUsedError;

    const totalTokensUsed = totalTokensUsedData ? totalTokensUsedData.reduce((sum: number, log: { tokens_used: number }) => sum + log.tokens_used, 0) : 0;

    const userPlan = await getPlanByUserId(userId);
    const tokenLimit = userPlan?.token_limit || 0;

    // 2. Hero Metrics
    const { count: totalMessages, error: messagesError } = await supabase
      .from('conversations')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    if (messagesError) throw messagesError;

    const { data: totalApiCostData, error: apiCostError } = await supabase
      .from('usage_logs')
      .select('cost')
      .eq('user_id', userId);

    if (apiCostError) throw apiCostError;

    const totalApiCost = totalApiCostData ? totalApiCostData.reduce((sum: number, log: { cost: number }) => sum + log.cost, 0) : 0;

    // 3. Usage Chart Data (last 7 days)
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
    usageChartRawData.forEach((log: RawUsageChartData) => { // Use RawUsageChartData
      const date = new Date(log.created_at).toISOString().split('T')[0];
      usageChartDataMap.set(date, (usageChartDataMap.get(date) || 0) + log.tokens_used);
    });

    const usageChartData: UsageChartData[] = Array.from(usageChartDataMap.entries()).map(([date, tokens_used]) => ({
      date,
      tokens_used,
    }));

    // 4. Recent Activity (5 most recent)
    const { data: recentActivity, error: activityError } = await supabase
      .from('usage_logs')
      .select('created_at, description, tokens_used, cost') // Assuming 'description' field exists for activity
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(5);

    if (activityError) throw activityError;

    const dashboardData: DashboardData = {
      subscription: {
        plan: subscriptionData?.plan || 'free',
        tokens_used: totalTokensUsed,
        token_limit: tokenLimit,
        user_id: userId, // Ensure user_id is included
      },
      heroMetrics: {
        totalMessages: totalMessages || 0,
        totalApiCost: totalApiCost,
        tokensConsumed: totalTokensUsed,
        conversationsActive: totalMessages || 0,
      },
      usageChartData: usageChartData,
      recentActivity: recentActivity as UsageLog[],
    };

    res.status(200).json(dashboardData);
  } catch (error: any) {
    console.error('Error fetching dashboard data:', error.message);
    res.status(500).json({ error: error.message });
  }
}
