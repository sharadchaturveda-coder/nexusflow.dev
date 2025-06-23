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
import { useConversationLoader } from '../../lib/dashboard/dashboardUtils';
import { useDashboardContext } from '@/lib/context/DashboardContext';

const DashboardContent: React.FC = () => {
  const {
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
  } = useDashboardContext();

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
