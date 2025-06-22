import { useState, useEffect, useCallback } from 'react';
import useSWR from 'swr';
import { DashboardData, HeroMetrics, UsageChartData, UsageLog, Subscription, SystemStatus } from '@/types/dashboard';
import { useSystemStatus } from './useSystemStatus';

// Define the structure for the data returned by the useDashboardData hook
interface UseDashboardDataResult {
  metrics: HeroMetrics | null;
  usageData: UsageChartData[];
  bots: any[]; // Will be populated with placeholder or adapted data
  quota: Subscription | null;
  activities: UsageLog[];
  openaiStatus: SystemStatus | null;
  webhookStatus: SystemStatus | null;
  aiFeedback: any; // Will be populated with placeholder or adapted data
  loading: boolean;
  error: string | null;
  refreshData: () => void; // Add a refresh function
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useDashboardData = (): UseDashboardDataResult => {
  const { data, error, isLoading, mutate } = useSWR<DashboardData>('/api/dashboard/all-data', fetcher);
  const { openaiStatus, webhookStatus, loadingStatus, statusError, refreshSystemStatus } = useSystemStatus();

  const refreshData = useCallback(() => {
    mutate(); // Re-fetch data from /api/dashboard/all-data
    refreshSystemStatus(); // Re-fetch status data
  }, [mutate, refreshSystemStatus]);

  useEffect(() => {
    refreshData(); // Initial fetch
  }, [refreshData]);

  // Map the fetched data to the existing state structure
  const metrics: HeroMetrics | null = data?.heroMetrics || null;
  const usageData: UsageChartData[] = data?.usageChartData || [];
  const quota: Subscription | null = data?.subscription || null;
  const activities: UsageLog[] = data?.recentActivity || [];

  // Placeholder for bots and AI Feedback as they are not part of all-data endpoint yet
  const bots: any[] = [{ id: 'default-bot', name: 'SalesBot', personality: 'Helpful AI Assistant', lastUsed: 'Just now', totalUsage: '100 messages' }];
  const aiFeedback: any = {
    personalityMessages: [{ personality: 'SalesBot', messages: 100 }],
    gptModelUsage: [{ name: 'gpt-4o-mini', value: 100 }],
    insights: ['SalesBot is highly utilized.'],
  };

  return {
    metrics,
    usageData,
    bots,
    quota,
    activities,
    openaiStatus,
    webhookStatus,
    aiFeedback,
    loading: isLoading || loadingStatus,
    error: error ? error.message : statusError,
    refreshData,
  };
};
