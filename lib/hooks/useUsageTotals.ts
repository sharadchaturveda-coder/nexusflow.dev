import { UsageLog, Subscription } from '@/types/dashboard';

export const useUsageTotals = (usage: UsageLog[], subscription: Subscription | null) => {
  const totalTokensUsed = usage.reduce((acc, log) => acc + log.tokens_used, 0);
  const totalCost = usage.reduce((acc, log) => acc + log.cost, 0);

  return {
    totalTokensUsed,
    totalCost,
    tokenLimit: subscription?.tokenLimit || 0,
  };
};
