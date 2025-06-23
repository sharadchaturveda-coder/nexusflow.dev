import React, { createContext, useContext, ReactNode } from 'react';
import { HeroMetrics, UsageChartData, UsageLog, Subscription, SystemStatus } from '@/types/dashboard';
import { ChatMessage } from '@/types/chat';

interface DashboardContextType {
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
  onConversationLoad: (messages: ChatMessage[]) => void;
  currentConversationMessages: ChatMessage[];
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

interface DashboardProviderProps {
  children: ReactNode;
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
  onConversationLoad: (messages: ChatMessage[]) => void;
  currentConversationMessages: ChatMessage[];
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({
  children,
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
  return (
    <DashboardContext.Provider
      value={{
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
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboardContext must be used within a DashboardProvider');
  }
  return context;
};
