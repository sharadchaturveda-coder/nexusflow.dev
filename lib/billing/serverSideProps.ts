import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import { fetchDashboardData } from '../dashboardDataFetcher';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
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
    const dashboardResult = await fetchDashboardData(context);

    if ('redirect' in dashboardResult) {
      return dashboardResult;
    }

    const dashboardProps = dashboardResult.props;

    if (dashboardProps.error) {
      return { props: { error: dashboardProps.error } };
    }

    if (!dashboardProps.quota) {
      return { props: { error: 'Failed to fetch billing data: quota missing.' } };
    }

    return {
      props: {
        quota: dashboardProps.quota,
      },
    };
  } catch (error: any) {
    console.error('Error fetching billing data:', error);
    return {
      props: {
        error: error.message || 'Failed to fetch billing data.',
      },
    };
  }
};
