import React from 'react';
import UsageChart from './UsageChart';
import ActiveBotsPanel from './ActiveBotsPanel';
import QuotaOverview from './QuotaOverview';
import RecentActivityFeed from './RecentActivityFeed';
import ExperimentalAI from './ExperimentalAI';
import HeroMetricsSection from './HeroMetricsSection';
import SystemStatusSection from './SystemStatusSection';
import { DashboardLayout, DashboardSection } from './DashboardLayout';
import { HeroMetrics, UsageChartData, UsageLog, Subscription, SystemStatus } from '@/types/dashboard';

interface DashboardContentProps {
  metrics: HeroMetrics | null;
  usageData: UsageChartData[];
  bots: any[];
  quota: Subscription | null;
  activities: UsageLog[];
  openaiStatus: SystemStatus | null;
  webhookStatus: SystemStatus | null;
  aiFeedback: any;
  handleFlushMemory: () => void;
  refreshDashboardData: () => void;
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
  refreshDashboardData,
}) => {
  return (
    <DashboardLayout>
      <HeroMetricsSection metrics={metrics} />

      <DashboardSection title="Usage Chart" delay={0.1} className="usageChart">
        {usageData && usageData.length > 0 ? <UsageChart data={usageData} /> : <p className="text-gray-500 text-center py-10">No usage data available.</p>}
      </DashboardSection>

      <DashboardSection title="My Bots" delay={0.2} className="activeBots">
        {bots && bots.length > 0 ? <ActiveBotsPanel bots={bots} /> : <p className="text-gray-500 text-center py-10">No active bots found. Configure your first bot to see data here!</p>}
      </DashboardSection>

      <DashboardSection title="Quota Overview" delay={0.3} className="quotaOverview">
        {quota ? (
          <QuotaOverview
            quota={quota}
            refreshDashboardData={refreshDashboardData}
          />
        ) : (
          <p className="text-gray-500 text-center py-10">No quota information available.</p>
        )}
      </DashboardSection>

      <DashboardSection title="Recent Activity" delay={0.4} className="recentActivity">
        {activities && activities.length > 0 ? <RecentActivityFeed activities={activities} /> : <p className="text-gray-500 text-center py-10">No recent activity to display.</p>}
      </DashboardSection>

      <DashboardSection title="System Status" delay={0.5} className="systemStatus">
        <SystemStatusSection
          openaiStatus={openaiStatus}
          webhookStatus={webhookStatus}
          handleFlushMemory={handleFlushMemory}
        />
      </DashboardSection>

      <DashboardSection title="Experimental / AI Feedback" delay={0.6} className="aiFeedback">
        {aiFeedback ? <ExperimentalAI data={aiFeedback} /> : <p className="text-gray-500 text-center py-10">No AI feedback data available.</p>}
      </DashboardSection>
    </DashboardLayout>
  );
};

export default DashboardContent;
