import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';
import ProfileCard from '@/components/account/ProfileCard';
import SubscriptionCard from '@/components/account/SubscriptionCard';
import DangerZoneCard from '@/components/account/DangerZoneCard';
import { getServerSideProps } from '@/lib/account/serverSideProps';
import { useProTrialActivation } from '@/lib/hooks/useProTrialActivation';
import { useAccountDeletion } from '@/lib/hooks/useAccountDeletion';

const AccountPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: userData, error, isLoading } = useSWR('/api/user/profile', fetcher);
  const { handleActivateProTrial } = useProTrialActivation();
  const { handleDeleteAccount } = useAccountDeletion();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin');
    }
  }, [status, router]);


  if (status === 'loading' || isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>; // Or a spinner/skeleton UI
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-600">Failed to load account data: {error.message}</div>;
  }

  if (!session || !userData) {
    return null; // Redirect handled by useEffect or data not yet available
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-extrabold text-gray-900">My Account</h1>
        <ProfileCard name={userData.name} email={userData.email} image={userData.image} />
        <SubscriptionCard
          plan={userData.plan}
          tokens_used={userData.tokens_used}
          token_limit={userData.token_limit}
          onActivateProTrial={handleActivateProTrial}
        />
        <DangerZoneCard onDeleteAccount={handleDeleteAccount} />
      </div>
    </div>
  );
};

export default AccountPage;
