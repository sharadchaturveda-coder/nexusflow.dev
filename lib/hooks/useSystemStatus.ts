import { useState, useEffect, useCallback } from 'react';
import { SystemStatus } from '../../types/dashboard';

interface UseSystemStatusResult {
  openaiStatus: SystemStatus | null;
  webhookStatus: SystemStatus | null;
  loadingStatus: boolean;
  statusError: string | null;
  refreshSystemStatus: () => void;
}

export const useSystemStatus = (): UseSystemStatusResult => {
  const [openaiStatus, setOpenaiStatus] = useState<SystemStatus | null>(null);
  const [webhookStatus, setWebhookStatus] = useState<SystemStatus | null>(null);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [statusError, setStatusError] = useState<string | null>(null);

  const refreshSystemStatus = useCallback(async () => {
    setLoadingStatus(true);
    setStatusError(null);
    try {
      const [openaiRes, webhookRes] = await Promise.all([
        fetch('/api/status/openai'),
        fetch('/api/status/webhooks'),
      ]);
      setOpenaiStatus(await openaiRes.json());
      setWebhookStatus(await webhookRes.json());
    } catch (err: any) {
      console.error('Error fetching system status data:', err);
      setStatusError('Failed to load system status. Please try again later.');
    } finally {
      setLoadingStatus(false);
    }
  }, []);

  useEffect(() => {
    refreshSystemStatus(); // Initial fetch
  }, [refreshSystemStatus]);

  return {
    openaiStatus,
    webhookStatus,
    loadingStatus,
    statusError,
    refreshSystemStatus,
  };
};