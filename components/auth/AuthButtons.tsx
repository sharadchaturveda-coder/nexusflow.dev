import React from 'react';
import { useAuthStatus } from '@/lib/hooks/useAuthStatus';
import AuthenticatedButtons from './AuthenticatedButtons';
import UnauthenticatedButton from './UnauthenticatedButton';

interface AuthButtonsProps {
  isMobile?: boolean;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ isMobile = false }) => {
  const { status } = useAuthStatus();

  if (status === 'loading') {
    return (
      <div className="h-10 w-24 animate-pulse rounded-md bg-gray-200"></div> // A placeholder skeleton
    );
  }

  if (status === 'unauthenticated') {
    return <UnauthenticatedButton />;
  }

  // status === 'authenticated'
  return <AuthenticatedButtons isMobile={isMobile} />;
};

export default AuthButtons;
