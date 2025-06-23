import React from 'react';
import { useAuthStatus } from '@/lib/hooks/useAuthStatus';

const UnauthenticatedButton: React.FC = () => {
  const { signIn } = useAuthStatus();

  return (
    <button
      onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
      className="px-4 py-2 bg-gradient-to-tr from-pink-500 to-yellow-400 text-white rounded-xl shadow-lg hover:scale-105 transition-all"
    >
      Sign In
    </button>
  );
};

export default UnauthenticatedButton;
