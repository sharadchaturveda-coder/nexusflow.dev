import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { DashboardData, UsageLog } from '@/types/dashboard';
import {
  fetchSubscriptionData,
  fetchTotalTokensUsed,
  // fetchTokenLimit, // No longer needed as it's part of subscriptionData
  fetchTotalMessages,
  fetchTotalApiCost,
  fetchUsageChartData,
  fetchRecentActivity
} from '@/lib/dashboard/dataFetchers';

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
    const [
      subscriptionData,
      totalTokensUsed,
      totalMessages,
      totalApiCost,
      usageChartData,
      // recentActivity // Temporarily disabled
    ] = await Promise.all([
      fetchSubscriptionData(userId),
      fetchTotalTokensUsed(userId),
      fetchTotalMessages(userId),
      fetchTotalApiCost(userId),
      fetchUsageChartData(userId),
      // fetchRecentActivity(userId) // Temporarily disabled
    ]);

    const recentActivity: UsageLog[] = []; // Provide a dummy value

    const dashboardData: DashboardData = {
      subscription: {
        ...subscriptionData,
        tokensUsed: totalTokensUsed,
      },
      heroMetrics: {
        totalMessages: totalMessages,
        totalApiCost: totalApiCost,
        tokensConsumed: totalTokensUsed,
        conversationsActive: totalMessages,
      },
      usageChartData: usageChartData,
      recentActivity: recentActivity,
    };

    res.status(200).json(dashboardData);
  } catch (error: any) {
    console.error('Error fetching dashboard data:', error.message);
    res.status(500).json({ error: error.message });
  }
}
