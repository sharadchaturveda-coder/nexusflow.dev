import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import {
  fetchMetrics,
  fetchUsage,
  fetchBots,
  fetchQuota,
  fetchActivities,
  fetchOpenAIStatus,
  fetchWebhookStatus,
  fetchAIFeedback,
} from './dashboardApi';

export async function fetchDashboardData(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  try {
    const [
      metrics,
      usageData,
      bots,
      quota,
      activities,
      openaiStatus,
      webhookStatus,
      aiFeedback,
    ] = await Promise.all([
      fetchMetrics(context),
      fetchUsage(context),
      fetchBots(context),
      fetchQuota(context),
      fetchActivities(context),
      fetchOpenAIStatus(context),
      fetchWebhookStatus(context),
      fetchAIFeedback(context),
    ]);

    return {
      props: {
        metrics,
        usageData,
        bots,
        quota,
        activities,
        openaiStatus,
        webhookStatus,
        aiFeedback,
      },
    };
  } catch (error) {
    console.error('Error fetching dashboard data on server:', error);
    return {
      props: {
        metrics: null,
        usageData: [],
        bots: [],
        quota: null,
        activities: [],
        openaiStatus: null,
        webhookStatus: null,
        aiFeedback: null,
        error: 'Failed to load dashboard data.',
      },
    };
  }
}
