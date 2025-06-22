import { getSession, signOut, useSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';
import ProfileCard from '@/components/account/ProfileCard';
import SubscriptionCard from '@/components/account/SubscriptionCard';
import DangerZoneCard from '@/components/account/DangerZoneCard';

const AccountPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: userData, error, isLoading, mutate } = useSWR('/api/user/profile', fetcher);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin');
    }
  }, [status, router]);

  const handleActivateProTrial = async () => {
    try {
      const res = await fetch('/api/admin/grant-pro-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        await mutate(); // Re-fetch data to update UI
      } else {
        console.error('Failed to activate pro trial');
      }
    } catch (err) {
      console.error('Error activating pro trial:', err);
    }
  };

  const handleDeleteAccount = async () => {
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
  };

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
          tokensUsed={userData.tokensUsed}
          tokenLimit={userData.tokenLimit}
          onActivateProTrial={handleActivateProTrial}
        />
        <DangerZoneCard onDeleteAccount={handleDeleteAccount} />
      </div>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default AccountPage;