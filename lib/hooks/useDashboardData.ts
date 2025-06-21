import { useState, useEffect } from 'react';

interface MetricData {
  totalMessagesThisMonth: number;
  tokensConsumed: number;
  estimatedApiCost: number;
  conversationsActive: number;
  deltaMessages: string;
  deltaTokens: string;
  deltaApiCost: string;
  deltaConversations: string;
}

interface UsageChartData {
  name: string;
  tokens: number;
  messages: number;
  apiCost: number;
}

interface BotData {
  id: string;
  name: string;
  personality: string;
  lastUsed: string;
  totalUsage: string;
}

interface QuotaData {
  currentPlan: string;
  tokensUsed: number;
  tokensMax: number;
  softOverageZone: number;
}

interface ActivityData {
  id: string;
  type: 'message' | 'bot' | 'cost';
  description: string;
  timestamp: string;
}

interface SystemStatusData {
  service: string;
  status: 'operational' | 'degraded' | 'outage';
  message: string;
  lastChecked: string;
}

interface ExperimentalAIData {
  personalityMessages: { personality: string; messages: number }[];
  gptModelUsage: { name: string; value: number }[];
  insights: string[];
}

interface DashboardData {
  metrics: MetricData | null;
  usageData: UsageChartData[];
  bots: BotData[];
  quota: QuotaData | null;
  activities: ActivityData[];
  openaiStatus: SystemStatusData | null;
  webhookStatus: SystemStatusData | null;
  aiFeedback: ExperimentalAIData | null;
  loading: boolean;
  error: string | null;
}

export const useDashboardData = (): DashboardData => {
  const [metrics, setMetrics] = useState<MetricData | null>(null);
  const [usageData, setUsageData] = useState<UsageChartData[]>([]);
  const [bots, setBots] = useState<BotData[]>([]);
  const [quota, setQuota] = useState<QuotaData | null>(null);
  const [activities, setActivities] = useState<ActivityData[]>([]);
  const [openaiStatus, setOpenaiStatus] = useState<SystemStatusData | null>(null);
  const [webhookStatus, setWebhookStatus] = useState<SystemStatusData | null>(null);
  const [aiFeedback, setAiFeedback] = useState<ExperimentalAIData | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [
          metricsRes,
          usageRes,
          botsRes,
          quotaRes,
          activitiesRes,
          openaiStatusRes,
          webhookStatusRes,
          aiFeedbackRes,
        ] = await Promise.all([
          fetch('/api/dashboard/metrics'),
          fetch('/api/dashboard/usage'),
          fetch('/api/dashboard/bots'),
          fetch('/api/user/quota'),
          fetch('/api/dashboard/activity'),
          fetch('/api/status/openai'),
          fetch('/api/status/webhooks'),
          fetch('/api/ai/feedback'),
        ]);

        setMetrics(await metricsRes.json());
        setUsageData(await usageRes.json());
        setBots(await botsRes.json());
        setQuota(await quotaRes.json());
        setActivities(await activitiesRes.json());
        setOpenaiStatus(await openaiStatusRes.json());
        setWebhookStatus(await webhookStatusRes.json());
        setAiFeedback(await aiFeedbackRes.json());
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    metrics,
    usageData,
    bots,
    quota,
    activities,
    openaiStatus,
    webhookStatus,
    aiFeedback,
    loading,
    error,
  };
};
