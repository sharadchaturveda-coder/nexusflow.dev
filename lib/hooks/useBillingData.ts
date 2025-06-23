import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { supabase } from '@/lib/supabaseClient';
import { Subscription } from '@/types/dashboard';

interface UseBillingDataResult {
  subscription: Subscription | null;
  loading: boolean;
  error: string | null;
}

export const useBillingData = (): UseBillingDataResult => {
  const { data: session, status } = useSession();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (status === 'authenticated' && session?.user?.id) {
        const user_id = session.user.id;

        const { data: subData, error: subError } = await supabase
          .from('subscriptions')
          .select('plan, "tokenLimit"')
          .eq('"userId"', user_id)
          .single();

        if (subError && subError.code !== 'PGRST116') {
          console.error('Error fetching subscription:', subError);
          setError(subError.message);
          setLoading(false);
          return;
        }
        setSubscription(subData ? { ...subData, tokensUsed: 0, userId: user_id } : { plan: 'free', tokensUsed: 0, tokenLimit: 10000, userId: user_id });
      }
      setLoading(false);
    };

    fetchData();
  }, [session, status]);

  return { subscription, loading, error };
};
