import { useCallback } from 'react';
import { signOut } from 'next-auth/react';

export const useAccountDeletion = () => {
  const handleDeleteAccount = useCallback(async () => {
    try {
      const res = await fetch('/api/user/delete', {
        method: 'DELETE',
      });
      if (res.ok) {
        await signOut({ callbackUrl: '/' }); // Sign out and redirect to homepage
      } else {
        console.error('Failed to delete account');
      }
    } catch (err) {
      console.error('Error deleting account:', err);
    }
  }, []);

  return { handleDeleteAccount };
};
