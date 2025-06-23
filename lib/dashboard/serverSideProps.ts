import { GetServerSideProps } from 'next';
import { fetchDashboardData } from '../dashboardDataFetcher';

export const getServerSideProps: GetServerSideProps = async (context) => {
  return fetchDashboardData(context);
};
