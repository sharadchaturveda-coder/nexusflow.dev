import { DashboardData, HeroMetrics, UsageChartData, UsageLog, Subscription } from '@/types/dashboard';

interface ConstructDashboardDataParams {
  subscriptionData: Subscription;
  totalTokensUsed: number;
  totalMessages: number;
  totalApiCost: number;
  usageChartData: UsageChartData[];
  recentActivity: UsageLog[];
}

export function constructDashboardData({
  subscriptionData,
  totalTokensUsed,
  totalMessages,
  totalApiCost,
  usageChartData,
  recentActivity,
}: ConstructDashboardDataParams): DashboardData {
  const heroMetrics: HeroMetrics = {
    totalMessages: totalMessages,
    totalApiCost: totalApiCost,
    tokensConsumed: totalTokensUsed,
    conversationsActive: totalMessages,
  };

  return {
    subscription: {
      ...subscriptionData,
      tokensUsed: totalTokensUsed,
    },
    heroMetrics: heroMetrics,
    usageChartData: usageChartData,
    recentActivity: recentActivity,
    quota: {
      plan: subscriptionData.plan,
      tokensUsed: totalTokensUsed,
      tokenLimit: subscriptionData.tokenLimit,
    },
  };
}
