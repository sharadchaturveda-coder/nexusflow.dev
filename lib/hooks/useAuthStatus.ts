import { useSession, signIn, signOut } from 'next-auth/react';

export const useAuthStatus = () => {
  const { data: session, status } = useSession();

  return {
    session,
    status,
    signIn: (provider: string, options: { callbackUrl: string }) => signIn(provider, options),
    signOut: () => signOut(),
  };
};
