import React, { useEffect, useState } from 'react';
import UsageStats from '../../components/UsageStats';
import PlanBanner from '../../components/PlanBanner';
import { UsageLog } from '../../lib/usageLogger';
import { Plan } from '../../lib/planChecker';

const UsagePage = () => {
  const [usage, setUsage] = useState<UsageLog[]>([]);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you'd fetch this data from an API
    // For now, we'll use mock data.
    const mockUsage: UsageLog[] = [
      { userId: 'user1', tokensUsed: 50000, cost: 3, timestamp: new Date().toISOString() },
      { userId: 'user1', tokensUsed: 75000, cost: 4.5, timestamp: new Date().toISOString() },
    ];
    const mockPlan: Plan = { name: 'Pro', token_limit: 200000, price: 500 };

    setUsage(mockUsage);
    setPlan(mockPlan);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!plan) {
    return <div>Plan not found.</div>;
  }

  const totalTokensUsed = usage.reduce((acc, log) => acc + log.tokensUsed, 0);
  const totalCost = usage.reduce((acc, log) => acc + log.cost, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Usage Dashboard</h1>
      <PlanBanner tokensUsed={totalTokensUsed} quota={plan.token_limit} />
      <div className="mt-4">
        <UsageStats tokensUsed={totalTokensUsed} cost={totalCost} quota={plan.token_limit} />
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold">Usage History</h2>
        <ul>
          {usage.map((log, index) => (
            <li key={index} className="border-b p-2">
              {new Date(log.timestamp).toLocaleString()}: {log.tokensUsed} tokens used (₹{log.cost.toFixed(2)})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UsagePage;
