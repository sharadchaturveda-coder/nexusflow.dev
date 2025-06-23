import { useCallback } from 'react';

export const useUserProTrialActivation = () => {
  const handleActivateProTrial = useCallback(async () => {
    try {
      const response = await fetch('/api/user/activate-pro-trial', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        alert('Pro Trial Activated!');
        // Optionally refresh data or redirect
        window.location.reload();
      } else {
        const data = await response.json();
        alert(`Failed to activate trial: ${data.error}`);
      }
    } catch (err) {
      console.error('Error activating pro trial:', err);
      alert('An error occurred while activating pro trial.');
    }
  }, []);

  return { handleActivateProTrial };
};
