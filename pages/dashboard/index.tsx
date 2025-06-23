import React, { useState } from 'react';
import DashboardContent from '../../components/dashboard/DashboardContent';
import DashboardErrorPage from '../../components/dashboard/DashboardErrorPage';
import DashboardLayoutWrapper from '../../components/dashboard/DashboardLayoutWrapper';
import { useDashboardData } from '../../lib/hooks/useDashboardData';
import { ChatMessage } from '@/types/chat';
import { useConversationMessages } from '@/lib/hooks/useConversationMessages';
import { handleFlushMemory } from '../../lib/dashboard/dashboardUtils';
import { DashboardProvider } from '@/lib/context/DashboardContext';

interface DashboardPageProps {
  metrics: any;
  usageData: any;
  currentConversation: any;
  quota: any;
  activities: any;
  openaiStatus: any;
  webhookStatus: any;
  aiFeedback: any;
  error?: string;
}

const DashboardPage: React.FC<DashboardPageProps> = ({
  metrics,
  usageData,
  currentConversation,
  quota,
  activities,
  openaiStatus,
  webhookStatus,
  aiFeedback,
  error,
}) => {
  const { refreshData } = useDashboardData();
  const [currentConversationMessages, setCurrentConversationMessages] = useState<ChatMessage[]>([]);

  const handleLoadConversation = (messages: ChatMessage[]) => {
    setCurrentConversationMessages(messages);
  };

  useConversationMessages({ onConversationLoad: handleLoadConversation });

  if (error) {
    return <DashboardErrorPage error={error} />;
  }

  return (
    <DashboardLayoutWrapper>
      <DashboardProvider
        metrics={metrics}
        usageData={usageData}
        currentConversation={currentConversation}
        quota={quota}
        activities={activities}
        openaiStatus={openaiStatus}
        webhookStatus={webhookStatus}
        aiFeedback={aiFeedback}
        handleFlushMemory={handleFlushMemory}
        refreshDashboardData={refreshData}
        onConversationLoad={handleLoadConversation}
        currentConversationMessages={currentConversationMessages}
      >
        <DashboardContent />
      </DashboardProvider>
    </DashboardLayoutWrapper>
  );
};

export default DashboardPage;
