import { useState, useEffect, useCallback } from 'react';
import useSWR from 'swr';
import { DashboardData, HeroMetrics, UsageChartData, UsageLog, Subscription, SystemStatus } from '@/types/dashboard';
import { useSystemStatus } from './useSystemStatus';
import { useDashboardMetrics } from './useDashboardMetrics';

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
  const { metrics, usageData, quota, activities, openaiStatus, webhookStatus, loading, error, refreshData } = useDashboardMetrics();

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
    loading,
    error,
    refreshData,
  };
};
