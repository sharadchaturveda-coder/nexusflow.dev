import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import { fetchAllDashboardData } from './dashboardApi';

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
    const data = await fetchAllDashboardData(context);

    return {
      props: {
        metrics: data?.metrics || null,
        usageData: data?.usageData || [],
        currentConversation: data?.currentConversation || null,
        quota: data?.quota || null,
        activities: data?.activities || [],
        openaiStatus: data?.openaiStatus || null,
        webhookStatus: data?.webhookStatus || null,
        aiFeedback: data?.aiFeedback || null,
      },
    };
  } catch (error) {
    console.error('Error fetching dashboard data on server:', error);
    return {
      props: {
        metrics: null,
        usageData: [],
        currentConversation: null,
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
