import React from 'react';
import Head from 'next/head';
import styles from '../../styles/Dashboard.module.css';
import HeroMetricCard from '../../components/dashboard/HeroMetricCard';
import { FaEnvelope, FaCoins, FaDollarSign, FaUsers } from 'react-icons/fa';
import UsageChart from '../../components/dashboard/UsageChart';
import ActiveBotsPanel from '../../components/dashboard/ActiveBotsPanel';
import QuotaOverview from '../../components/dashboard/QuotaOverview';
import RecentActivityFeed from '../../components/dashboard/RecentActivityFeed';
import SystemStatusWidget from '../../components/dashboard/SystemStatusWidget';
import { useState, useEffect } from 'react';
import ExperimentalAI from '../../components/dashboard/ExperimentalAI';

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

const DashboardPage: React.FC = () => {
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

  const handleFlushMemory = () => {
    alert('Flushing system memory...');
    // In a real application, this would trigger an API call
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Nexus Flow AI - Dashboard</title>
          <meta name="description" content="Nexus Flow AI Dashboard" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <h1 className={styles.title}>Loading Dashboard...</h1>
          <p className={styles.description}>Please wait while we fetch your data.</p>
          {/* You could add a global spinner here */}
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Nexus Flow AI - Dashboard</title>
          <meta name="description" content="Nexus Flow AI Dashboard" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <h1 className={styles.title}>Error</h1>
          <p className={styles.description}>{error}</p>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Nexus Flow AI - Dashboard</title>
        <meta name="description" content="Nexus Flow AI Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Nexus Flow AI Dashboard
        </h1>

        <p className={styles.description}>
          Your control nexus.
        </p>

        <section className={`${styles.heroMetrics} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`}>
          {metrics ? (
            <>
              <HeroMetricCard
                title="Total Messages This Month"
                value={metrics.totalMessagesThisMonth.toLocaleString()}
                icon={<FaEnvelope />}
                delta={metrics.deltaMessages}
              />
              <HeroMetricCard
                title="Tokens Consumed"
                value={`${(metrics.tokensConsumed / 1000000).toFixed(1)}M`}
                icon={<FaCoins />}
                delta={metrics.deltaTokens}
              />
              <HeroMetricCard
                title="Estimated API Cost"
                value={`$${metrics.estimatedApiCost.toFixed(2)}`}
                icon={<FaDollarSign />}
                delta={metrics.deltaApiCost}
              />
              <HeroMetricCard
                title="Conversations Active"
                value={metrics.conversationsActive.toLocaleString()}
                icon={<FaUsers />}
                delta={metrics.deltaConversations}
              />
            </>
          ) : (
            <p className="text-gray-500">No metrics available.</p>
          )}
        </section>

        <section className={`${styles.usageChart} shadow-soft-lg`}>
          <h2>Usage Chart</h2>
          {usageData.length > 0 ? <UsageChart data={usageData} /> : <p className="text-gray-500">No usage data available.</p>}
        </section>

        <section className={`${styles.activeBots} shadow-soft-lg`}>
          <h2>Active Users / Bots</h2>
          {bots.length > 0 ? <ActiveBotsPanel bots={bots} /> : <p className="text-gray-500">No active bots found. Configure your first bot to see data here!</p>}
        </section>

        <section className={`${styles.quotaOverview} shadow-soft-lg`}>
          <h2>Quota Overview</h2>
          {quota ? (
            <QuotaOverview
              currentPlan={quota.currentPlan}
              tokensUsed={quota.tokensUsed}
              tokensMax={quota.tokensMax}
              softOverageZone={quota.softOverageZone}
            />
          ) : (
            <p className="text-gray-500">No quota information available.</p>
          )}
        </section>

        <section className={`${styles.recentActivity} shadow-soft-lg`}>
          <h2>Recent Activity</h2>
          {activities.length > 0 ? <RecentActivityFeed activities={activities} /> : <p className="text-gray-500">No recent activity to display.</p>}
        </section>

        <section className={`${styles.systemStatus} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 shadow-soft-lg`}>
          {openaiStatus ? (
            <SystemStatusWidget
              title="Ping OpenAI"
              status={openaiStatus.status === 'operational' ? 'success' : openaiStatus.status === 'degraded' ? 'loading' : 'failure'}
              message={openaiStatus.message}
            />
          ) : (
            <p className="text-gray-500">Loading OpenAI status...</p>
          )}
          {webhookStatus ? (
            <SystemStatusWidget
              title="Webhook Health"
              status={webhookStatus.status === 'operational' ? 'success' : webhookStatus.status === 'degraded' ? 'loading' : 'failure'}
              message={webhookStatus.message}
            />
          ) : (
            <p className="text-gray-500">Loading Webhook status...</p>
          )}
          <SystemStatusWidget
            title="Message Relay Latency"
            status="loading" // This would typically be dynamic
            message="Checking..."
          />
          <div className="col-span-full flex justify-center mt-4">
            <button
              onClick={handleFlushMemory}
              className="bg-purple-gradient text-white font-bold py-2 px-6 rounded-md shadow-md hover:scale-105 transition-all"
            >
              Flush Memory System-Wide
            </button>
          </div>
        </section>

        <section className={`${styles.aiFeedback} shadow-soft-lg`}>
          <h2>Experimental / AI Feedback</h2>
          {aiFeedback ? <ExperimentalAI data={aiFeedback} /> : <p className="text-gray-500">No AI feedback data available.</p>}
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
