import { GetServerSidePropsContext } from 'next';

interface FetchOptions {
  headers: HeadersInit;
}

const getBaseUrl = () => process.env.NEXTAUTH_URL || `http://localhost:${process.env.PORT || 3000}`;

const fetchJson = async (url: string, options: FetchOptions) => {
  const res = await fetch(url, options);
  return res.ok ? res.json() : null;
};

const createDashboardFetcher = (path: string) => async (context: GetServerSidePropsContext) => {
  const baseUrl = getBaseUrl();
  const headers = { 'Content-Type': 'application/json', 'Cookie': context.req.headers.cookie || '' };
  return fetchJson(`${baseUrl}${path}`, { headers });
};

export const fetchMetrics = createDashboardFetcher('/api/dashboard/metrics');
export const fetchUsage = createDashboardFetcher('/api/dashboard/usage');
export const fetchBots = createDashboardFetcher('/api/dashboard/bots');
export const fetchQuota = createDashboardFetcher('/api/user/quota');
export const fetchActivities = createDashboardFetcher('/api/dashboard/activity');
export const fetchOpenAIStatus = createDashboardFetcher('/api/status/openai');
export const fetchWebhookStatus = createDashboardFetcher('/api/status/webhooks');
export const fetchAIFeedback = createDashboardFetcher('/api/ai/feedback');
export const fetchAllDashboardData = createDashboardFetcher('/api/dashboard/all-data');
