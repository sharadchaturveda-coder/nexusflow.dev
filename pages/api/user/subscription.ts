// pages/api/user/subscription.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react'; // Assuming getSession is available from next-auth/react
import { supabase } from '../../../lib/supabaseClient'; // Corrected import: supabaseClient is actually supabase

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const session = await getSession({ req });

  if (!session || !session.user || !session.user.id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const userId = session.user.id;

  // 1. Fetch Subscription Data (plan, tokenLimit, next_billing_date)
  const { data: subscriptionData, error: subscriptionError } = await supabase
    .from('subscriptions')
    .select('plan, "tokenLimit", next_billing_date') // Add next_billing_date here
    .eq('"userId"', userId)
    .single();

  if (subscriptionError && subscriptionError.code !== 'PGRST116') { // PGRST116 means no rows found
    console.error('Error fetching subscription data:', subscriptionError);
    // Handle error appropriately, maybe return a default free plan
  }

  const planName = subscriptionData?.plan || 'Free';
  const nextBillingDate = subscriptionData?.next_billing_date || null; // Get the date

  // 2. Query Usage Data
  // For simplicity, calculate usage for the last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const { data: usageData, error: usageError } = await supabase
    .from('usage_logs')
    .select('token_count')
    .eq('user_id', userId)
    .gte('created_at', thirtyDaysAgo.toISOString());

  if (usageError) {
    console.error('Error fetching usage data:', usageError);
    return res.status(500).json({ message: 'Error fetching usage data' });
  }

  const tokensUsed = usageData.reduce((sum: number, log: { token_count: number }) => sum + log.token_count, 0);

  // Define sensible defaults for tokensAvailable
  let tokensAvailable: number | string;
  if (planName === 'Free') {
    tokensAvailable = 10000;
  } else if (planName === 'Pro') {
    tokensAvailable = 'unlimited';
  } else {
    tokensAvailable = 0; // Default for unknown plans
  }

  // 3. Construct Response
  const response = {
    planName,
    tokensUsed,
    tokensAvailable,
    nextBillingDate, // Include the new field
    billingHistory: [],
  };

  return res.status(200).json(response);
}