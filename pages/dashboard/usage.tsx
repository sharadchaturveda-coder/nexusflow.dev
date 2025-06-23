import React from 'react';
import UsageStats from '../../components/UsageStats';
import PlanBanner from '../../components/PlanBanner';
import { useSession } from 'next-auth/react';
import { useUsageData } from '../../lib/hooks/useUsageData';

const UsagePage = () => {
  const { status } = useSession();
  const { usage, subscription, loading, error } = useUsageData();

  if (loading) {
    return <div>Loading usage data...</div>;
  }

  if (status === 'unauthenticated') {
    return <div>Please sign in to view your usage.</div>;
  }

  if (!subscription) {
    return <div>No subscription found.</div>;
  }

  const totalTokensUsed = usage.reduce((acc, log) => acc + log.tokens_used, 0);
  const totalCost = usage.reduce((acc, log) => acc + log.cost, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Usage Dashboard</h1>
      <PlanBanner tokens_used={subscription.tokens_used} quota={subscription.token_limit} />
      <div className="mt-4">
        <UsageStats tokens_used={subscription.tokens_used} cost={totalCost} quota={subscription.token_limit} />
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold">Usage History</h2>
        <ul>
          {usage.map((log) => (
            <li key={log.id} className="border-b p-2">
              {new Date(log.created_at).toLocaleString()}: {log.tokens_used} tokens used (₹{log.cost.toFixed(2)})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UsagePage;
