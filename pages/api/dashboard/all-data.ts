import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { DashboardData, UsageLog } from '@/types/dashboard';
import {
  fetchSubscriptionData,
  fetchTotalTokensUsed,
  fetchTotalMessages,
  fetchTotalApiCost,
  fetchUsageChartData,
  fetchRecentActivity
} from '@/lib/dashboard/dataFetchers';
import { constructDashboardData } from '@/lib/dashboard/utils/dashboardDataConstructors';

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

    const recentActivity: UsageLog[] = []; // Provide a dummy value for now, as it's temporarily disabled

    const dashboardData = constructDashboardData({
      subscriptionData,
      totalTokensUsed,
      totalMessages,
      totalApiCost,
      usageChartData,
      recentActivity,
    });

    res.status(200).json(dashboardData);
  } catch (error: any) {
    console.error('Error fetching dashboard data:', error.message);
    res.status(500).json({ error: error.message });
  }
}
