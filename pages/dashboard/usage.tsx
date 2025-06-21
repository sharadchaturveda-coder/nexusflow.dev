import React, { useEffect, useState } from 'react';
import UsageStats from '../../components/UsageStats';
import PlanBanner from '../../components/PlanBanner';
import { useSession } from 'next-auth/react';
import { supabase } from '../../lib/supabaseClient';

interface UsageLog {
  id: string;
  userId: string;
  tokensUsed: number;
  cost: number;
  createdAt: string;
}

const UsagePage = () => {
  const { data: session, status } = useSession();
  const [usage, setUsage] = useState<UsageLog[]>([]);
  const [subscription, setSubscription] = useState<any | null>(null); // Use 'any' for now, define a proper interface later if needed
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (status === 'authenticated' && session?.user?.id) {
        const userId = session.user.id;

        // Fetch subscription data
        const { data: subData, error: subError } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('userId', userId)
          .single();

        if (subError && subError.code !== 'PGRST116') { // PGRST116 means no rows found
          console.error('Error fetching subscription:', subError);
          setLoading(false);
          return;
        }
        setSubscription(subData || { plan: 'free', tokensUsed: 0, tokenLimit: 10000 }); // Default free plan

        // Fetch usage logs
        const { data: usageData, error: usageError } = await supabase
          .from('usage_logs')
          .select('*')
          .eq('userId', userId)
          .order('createdAt', { ascending: false });

        if (usageError) {
          console.error('Error fetching usage logs:', usageError);
          setLoading(false);
          return;
        }
        setUsage(usageData || []);
      }
      setLoading(false);
    };

    fetchData();
  }, [session, status]);

  if (loading) {
    return <div>Loading usage data...</div>;
  }

  if (status === 'unauthenticated') {
    return <div>Please sign in to view your usage.</div>;
  }

  if (!subscription) {
    return <div>No subscription found.</div>;
  }

  const totalTokensUsed = usage.reduce((acc, log) => acc + log.tokensUsed, 0);
  const totalCost = usage.reduce((acc, log) => acc + log.cost, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Usage Dashboard</h1>
      <PlanBanner tokensUsed={subscription.tokensUsed} quota={subscription.tokenLimit} />
      <div className="mt-4">
        <UsageStats tokensUsed={subscription.tokensUsed} cost={totalCost} quota={subscription.tokenLimit} />
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold">Usage History</h2>
        <ul>
          {usage.map((log) => (
            <li key={log.id} className="border-b p-2">
              {new Date(log.createdAt).toLocaleString()}: {log.tokensUsed} tokens used (₹{log.cost.toFixed(2)})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UsagePage;
