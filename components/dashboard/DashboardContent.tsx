import React from 'react';
import { useRouter } from 'next/router';
import ConversationDisplay from './ConversationDisplay';
import HeroMetricsSection from './HeroMetricsSection';
import DashboardUsageSection from './DashboardUsageSection';
import DashboardCurrentSessionSection from './DashboardCurrentSessionSection';
import DashboardQuotaOverviewSection from './DashboardQuotaOverviewSection';
import DashboardRecentActivitySection from './DashboardRecentActivitySection';
import DashboardUsageInsightsSection from './DashboardUsageInsightsSection';
import { DashboardLayout, DashboardSection } from './DashboardLayout';
import { HeroMetrics, UsageChartData, UsageLog, Subscription, SystemStatus } from '@/types/dashboard';
import { ChatMessage } from '@/types/chat';
import { useConversationLoader } from '../../lib/dashboard/dashboardUtils';

interface DashboardContentProps {
  metrics: HeroMetrics | null;
  usageData: UsageChartData[];
  currentConversation: {
    status: string;
    lastMessage: string;
    totalMessages: number;
  } | null;
  quota: Subscription | null;
  activities: UsageLog[];
  openaiStatus: SystemStatus | null;
  webhookStatus: SystemStatus | null;
  aiFeedback: any;
  handleFlushMemory: () => void;
  refreshDashboardData: () => void;
  onConversationLoad?: (messages: ChatMessage[]) => void;
  currentConversationMessages: ChatMessage[];
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  metrics,
  usageData,
  currentConversation,
  quota,
  activities,
  openaiStatus,
  webhookStatus,
  aiFeedback,
  handleFlushMemory,
  refreshDashboardData,
  onConversationLoad,
  currentConversationMessages,
}) => {
  const router = useRouter();
  const { conversationId } = router.query;
  useConversationLoader(onConversationLoad || (() => {}));

  return (
    <DashboardLayout>
      {conversationId ? (
        <DashboardSection title={`Conversation: ${conversationId}`} delay={0}>
          <ConversationDisplay conversationId={conversationId as string} messages={currentConversationMessages} />
        </DashboardSection>
      ) : (
        <HeroMetricsSection metrics={metrics} />
      )}

      <DashboardUsageSection usageData={usageData} />

      <DashboardCurrentSessionSection
        currentConversation={currentConversation}
        handleFlushMemory={handleFlushMemory}
      />

      <DashboardQuotaOverviewSection
        quota={quota}
        refreshDashboardData={refreshDashboardData}
      />

      <DashboardRecentActivitySection activities={activities} />

      <DashboardUsageInsightsSection aiFeedback={aiFeedback} />
    </DashboardLayout>
  );
};

export default DashboardContent;
