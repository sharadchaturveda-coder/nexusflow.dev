import UsageStats from '../../components/UsageStats';
import PlanBanner from '../../components/PlanBanner';
import { useSession } from 'next-auth/react';
import { useUsageData } from '../../lib/hooks/useUsageData';
import { useUsageTotals } from '@/lib/hooks/useUsageTotals';
import UsageHistoryList from '../../components/dashboard/UsageHistoryList';
import SeoHead from '../../components/SeoHead';
import Navbar from '../../components/Navbar';
import styles from '../../styles/Dashboard.module.css';

const UsagePage = () => {
  const { status } = useSession();
  const { usage, subscription, loading, error } = useUsageData();
  const { totalTokensUsed, totalCost, tokenLimit } = useUsageTotals(usage, subscription);

  if (loading) {
    return (
      <div className={`${styles.container} font-sans flex`}>
        <SeoHead title="Nexus Flow AI - Usage" description="Nexus Flow AI Usage Dashboard" />
        <Navbar />
        <div className="flex-grow p-8">
          <h1 className="text-2xl font-bold mb-4">Loading Usage Data...</h1>
          <p className="text-gray-500">Please wait while we fetch your usage statistics.</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className={`${styles.container} font-sans flex`}>
        <SeoHead title="Nexus Flow AI - Usage" description="Nexus Flow AI Usage Dashboard" />
        <Navbar />
        <div className="flex-grow p-8">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-red-500">Please sign in to view your usage.</p>
        </div>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className={`${styles.container} font-sans flex`}>
        <SeoHead title="Nexus Flow AI - Usage" description="Nexus Flow AI Usage Dashboard" />
        <Navbar />
        <div className="flex-grow p-8">
          <h1 className="text-2xl font-bold mb-4">No Subscription Found</h1>
          <p className="text-gray-500">It seems you don't have an active subscription.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.container} font-sans flex`}>
      <SeoHead title="Nexus Flow AI - Usage" description="Nexus Flow AI Usage Dashboard" />
      <Navbar />
      <div className="flex-grow p-8">
        <h1 className="text-2xl font-bold mb-4">Usage Dashboard</h1>
        <PlanBanner tokens_used={totalTokensUsed} quota={tokenLimit} />
        <div className="mt-4">
          <UsageStats tokens_used={totalTokensUsed} cost={totalCost} quota={tokenLimit} />
        </div>
        <UsageHistoryList usage={usage} />
      </div>
    </div>
  );
};

export default UsagePage;
