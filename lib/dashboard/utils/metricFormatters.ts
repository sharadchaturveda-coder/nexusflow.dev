import { HeroMetrics } from '@/types/dashboard';

export const formatTotalMessages = (metrics: HeroMetrics | null): string => {
  return metrics?.totalMessages?.toLocaleString() || 'N/A';
};

export const formatTokensConsumed = (metrics: HeroMetrics | null): string => {
  return metrics?.tokensConsumed ? `${(metrics.tokensConsumed / 1000000).toFixed(1)}M` : 'N/A';
};

export const formatTotalApiCost = (metrics: HeroMetrics | null): string => {
  return metrics?.totalApiCost ? `$${metrics.totalApiCost.toFixed(2)}` : 'N/A';
};

export const formatConversationsActive = (metrics: HeroMetrics | null): string => {
  return metrics?.conversationsActive?.toLocaleString() || 'N/A';
};
