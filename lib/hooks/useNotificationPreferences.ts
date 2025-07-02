import useSWR from 'swr';
import { useState } from 'react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useNotificationPreferences = () => {
  const { data, error, mutate } = useSWR('/api/user/notifications', fetcher);
  const [isLoading, setIsLoading] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const updatePreferences = async (preferences: {
    newLead: boolean;
    conversationAttention: boolean;
    weeklySummary: boolean;
  }) => {
    setIsLoading(true);
    setUpdateError(null);
    try {
      const response = await fetch('/api/user/notifications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preferences }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update preferences');
      }

      const updatedData = await response.json();
      mutate(updatedData, false); // Update local SWR cache
    } catch (e: any) {
      setUpdateError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    preferences: data?.preferences,
    isLoading: !error && !data,
    error: error?.message,
    updatePreferences,
    isUpdating: isLoading,
    updateError,
  };
};