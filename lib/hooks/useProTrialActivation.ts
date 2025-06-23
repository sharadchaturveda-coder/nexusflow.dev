import { useCallback } from 'react';
import { mutate } from 'swr'; // Assuming SWR's global mutate is used for revalidation

export const useProTrialActivation = () => {
  const handleActivateProTrial = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/grant-pro-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        await mutate('/api/user/profile'); // Re-fetch user profile data to update UI
      } else {
        console.error('Failed to activate pro trial');
      }
    } catch (err) {
      console.error('Error activating pro trial:', err);
    }
  }, []);

  return { handleActivateProTrial };
};
