import { supabase } from '@/lib/supabaseClient';
import { Subscription } from '@/types/dashboard';

export async function fetchSubscriptionData(userId: string): Promise<Subscription> {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('plan, "tokenLimit"')
    .eq('"userId"', userId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching subscription data:', error);
    return { plan: 'free', tokensUsed: 0, tokenLimit: 0, userId };
  }

  const tokenLimit = data?.tokenLimit || 0;

  return {
    plan: data?.plan || 'free',
    tokensUsed: 0,
    tokenLimit: tokenLimit,
    userId: userId,
  };
}
