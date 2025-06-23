import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { supabase } from '@/lib/supabaseClient';
import { UsageLog, Subscription } from '@/types/dashboard'; // Import UsageLog and Subscription from types

interface UseUsageDataResult {
  usage: UsageLog[];
  subscription: Subscription | null; // Use imported Subscription type
  loading: boolean;
  error: string | null;
}

export const useUsageData = (): UseUsageDataResult => {
  const { data: session, status } = useSession();
  const [usage, setUsage] = useState<UsageLog[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null); // Use imported Subscription type
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (status === 'authenticated' && session?.user?.id) {
        const user_id = session.user.id;

        // Fetch subscription data
        const { data: subData, error: subError } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user_id)
          .single();

        if (subError && subError.code !== 'PGRST116') {
          console.error('Error fetching subscription:', subError);
          setError(subError.message);
          setLoading(false);
          return;
        }
        setSubscription(subData || { plan: 'free', tokens_used: 0, token_limit: 10000 });

        // Fetch usage logs
        const { data: usageData, error: usageError } = await supabase
          .from('usage_logs')
          .select('*')
          .eq('user_id', user_id)
          .order('created_at', { ascending: false });

        if (usageError) {
          console.error('Error fetching usage logs:', usageError);
          setError(usageError.message);
          setLoading(false);
          return;
        }
        setUsage(usageData || []);
      }
      setLoading(false);
    };

    fetchData();
  }, [session, status]);

  return { usage, subscription, loading, error };
};
