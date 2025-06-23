import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import UsageChart from './UsageChart';
import ActiveBotsPanel from './ActiveBotsPanel';
import QuotaOverview from './QuotaOverview';
import RecentActivityFeed from './RecentActivityFeed';
import ExperimentalAI from './ExperimentalAI';
import HeroMetricsSection from './HeroMetricsSection';
import SystemStatusSection from './SystemStatusSection';
import { DashboardLayout, DashboardSection } from './DashboardLayout';
import { HeroMetrics, UsageChartData, UsageLog, Subscription, SystemStatus } from '@/types/dashboard';
import { ChatMessage } from '@/types/chat';

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
  onConversationLoad?: (messages: ChatMessage[]) => void;
  currentConversationMessages: ChatMessage[];
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
  onConversationLoad,
  currentConversationMessages,
}) => {
  const router = useRouter();
  const { conversationId } = router.query;

  useEffect(() => {
    if (conversationId && onConversationLoad) {
      const fetchConversationMessages = async () => {
        try {
          const response = await fetch(`/api/conversations/${conversationId}`);
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
          const data = await response.json();
          onConversationLoad(data.messages);
        } catch (error) {
          console.error('Error loading conversation messages:', error);
        }
      };
      fetchConversationMessages();
    }
  }, [conversationId, onConversationLoad]);

  return (
    <DashboardLayout>
      {conversationId ? (
        <DashboardSection title={`Conversation: ${conversationId}`} delay={0}>
          <div className="flex flex-col space-y-4">
            {currentConversationMessages.length > 0 ? (
              currentConversationMessages.map((message, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white self-end'
                      : 'bg-gray-200 text-gray-800 self-start'
                  }`}
                >
                  <p className="font-semibold capitalize">{message.role}</p>
                  <p>{message.content}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-10">No messages in this conversation.</p>
            )}
          </div>
        </DashboardSection>
      ) : (
        <HeroMetricsSection metrics={metrics} />
      )}

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
