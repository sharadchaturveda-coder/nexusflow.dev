import { useState, useEffect, useCallback } from 'react';
import useSWR from 'swr';
import { HeroMetrics, UsageChartData, UsageLog, Subscription, SystemStatus } from '@/types/dashboard';
import { useSystemStatus } from './useSystemStatus';

interface DashboardData {
  heroMetrics: HeroMetrics | null;
  usageChartData: UsageChartData[];
  recentActivity: UsageLog[];
  subscription: Subscription | null;
}

interface UseDashboardDataResult {
  metrics: HeroMetrics | null;
  usageData: UsageChartData[];
  quota: Subscription | null;
  activities: UsageLog[];
  openaiStatus: SystemStatus | null;
  webhookStatus: SystemStatus | null;
  loading: boolean;
  error: string | null;
  refreshData: () => void;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useDashboardMetrics = (): UseDashboardDataResult => {
  const { data, error, isLoading, mutate } = useSWR<DashboardData>('/api/dashboard/all-data', fetcher);
  const { openaiStatus, webhookStatus, loadingStatus, statusError, refreshSystemStatus } = useSystemStatus();

  const refreshData = useCallback(() => {
    mutate();
    refreshSystemStatus();
  }, [mutate, refreshSystemStatus]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const metrics: HeroMetrics | null = data?.heroMetrics || null;
  const usageData: UsageChartData[] = data?.usageChartData || [];
  const quota: Subscription | null = data?.subscription || null;
  const activities: UsageLog[] = data?.recentActivity || [];

  return {
    metrics,
    usageData,
    quota,
    activities,
    openaiStatus,
    webhookStatus,
    loading: isLoading || loadingStatus,
    error: error ? error.message : statusError,
    refreshData,
  };
};
