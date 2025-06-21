import React from 'react';
import styles from '../../styles/Dashboard.module.css';
import UsageChart from './UsageChart';
import ActiveBotsPanel from './ActiveBotsPanel';
import QuotaOverview from './QuotaOverview';
import RecentActivityFeed from './RecentActivityFeed';
import ExperimentalAI from './ExperimentalAI';
import HeroMetricsSection from './HeroMetricsSection';
import SystemStatusSection from './SystemStatusSection';

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

interface DashboardContentProps {
  metrics: MetricData | null;
  usageData: UsageChartData[];
  bots: BotData[];
  quota: QuotaData | null;
  activities: ActivityData[];
  openaiStatus: SystemStatusData | null;
  webhookStatus: SystemStatusData | null;
  aiFeedback: ExperimentalAIData | null;
  handleFlushMemory: () => void;
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  metrics,
  usageData,
  bots,
  quota,
  activities,
  openaiStatus,
  webhookStatus,
  aiFeedback,
  handleFlushMemory,
}) => {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        Nexus Flow AI Dashboard
      </h1>

      <p className={styles.description}>
        Your control nexus.
      </p>

      <HeroMetricsSection metrics={metrics} />

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

      <SystemStatusSection
        openaiStatus={openaiStatus}
        webhookStatus={webhookStatus}
        handleFlushMemory={handleFlushMemory}
      />

      <section className={`${styles.aiFeedback} shadow-soft-lg`}>
        <h2>Experimental / AI Feedback</h2>
        {aiFeedback ? <ExperimentalAI data={aiFeedback} /> : <p className="text-gray-500">No AI feedback data available.</p>}
      </section>
    </main>
  );
};

export default DashboardContent;
