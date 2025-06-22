import { GetServerSidePropsContext } from 'next';

interface FetchOptions {
  headers: HeadersInit;
}

const getBaseUrl = () => process.env.NEXTAUTH_URL || `http://localhost:${process.env.PORT || 3000}`;

const fetchJson = async (url: string, options: FetchOptions) => {
  const res = await fetch(url, options);
  return res.ok ? res.json() : null;
};

export const fetchMetrics = async (context: GetServerSidePropsContext) => {
  const baseUrl = getBaseUrl();
  const headers = { 'Content-Type': 'application/json', 'Cookie': context.req.headers.cookie || '' };
  return fetchJson(`${baseUrl}/api/dashboard/metrics`, { headers });
};

export const fetchUsage = async (context: GetServerSidePropsContext) => {
  const baseUrl = getBaseUrl();
  const headers = { 'Content-Type': 'application/json', 'Cookie': context.req.headers.cookie || '' };
  return fetchJson(`${baseUrl}/api/dashboard/usage`, { headers });
};

export const fetchBots = async (context: GetServerSidePropsContext) => {
  const baseUrl = getBaseUrl();
  const headers = { 'Content-Type': 'application/json', 'Cookie': context.req.headers.cookie || '' };
  return fetchJson(`${baseUrl}/api/dashboard/bots`, { headers });
};

export const fetchQuota = async (context: GetServerSidePropsContext) => {
  const baseUrl = getBaseUrl();
  const headers = { 'Content-Type': 'application/json', 'Cookie': context.req.headers.cookie || '' };
  return fetchJson(`${baseUrl}/api/user/quota`, { headers });
};

export const fetchActivities = async (context: GetServerSidePropsContext) => {
  const baseUrl = getBaseUrl();
  const headers = { 'Content-Type': 'application/json', 'Cookie': context.req.headers.cookie || '' };
  return fetchJson(`${baseUrl}/api/dashboard/activity`, { headers });
};

export const fetchOpenAIStatus = async (context: GetServerSidePropsContext) => {
  const baseUrl = getBaseUrl();
  const headers = { 'Content-Type': 'application/json', 'Cookie': context.req.headers.cookie || '' };
  return fetchJson(`${baseUrl}/api/status/openai`, { headers });
};

export const fetchWebhookStatus = async (context: GetServerSidePropsContext) => {
  const baseUrl = getBaseUrl();
  const headers = { 'Content-Type': 'application/json', 'Cookie': context.req.headers.cookie || '' };
  return fetchJson(`${baseUrl}/api/status/webhooks`, { headers });
};

export const fetchAIFeedback = async (context: GetServerSidePropsContext) => {
  const baseUrl = getBaseUrl();
  const headers = { 'Content-Type': 'application/json', 'Cookie': context.req.headers.cookie || '' };
  return fetchJson(`${baseUrl}/api/ai/feedback`, { headers });
};