// pages/api/user/cancel-subscription.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { supabase } from '../../../lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const session = await getSession({ req });

  if (!session || !session.user || !session.user.id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const userId = session.user.id;

  try {
    // 1. Fetch the user's current active subscription
    const { data: subscription, error: fetchError } = await supabase
      .from('subscriptions')
      .select('id, status, next_billing_date, payment_gateway_subscription_id')
      .eq('userId', userId)
      .eq('status', 'active') // Only allow cancellation for active subscriptions
      .single();

    if (fetchError) {
      if (fetchError.code === 'PGRST116') { // No rows found
        return res.status(404).json({ message: 'No active subscription found for this user.' });
      }
      console.error('Error fetching subscription:', fetchError);
      return res.status(500).json({ message: 'Failed to fetch subscription details.' });
    }

    if (!subscription) {
      return res.status(404).json({ message: 'No active subscription found.' });
    }

    // Check if already pending cancellation
    if (subscription.status === 'pending_cancellation') {
      return res.status(200).json({ message: 'Subscription is already pending cancellation.', cancellationDate: subscription.next_billing_date });
    }

    // 2. Calculate cancellation date (end of current billing period)
    // Assuming next_billing_date is the end of the current period for active subscriptions
    const cancellationDate = subscription.next_billing_date; 

    // 3. Update subscription status in Supabase
    const { error: updateError } = await supabase
      .from('subscriptions')
      .update({ 
        status: 'pending_cancellation', 
        cancellation_date: cancellationDate 
      })
      .eq('id', subscription.id);

    if (updateError) {
      console.error('Error updating subscription status:', updateError);
      return res.status(500).json({ message: 'Failed to update subscription status.' });
    }

    // 4. Integrate with payment gateway (e.g., Razorpay) to cancel recurring payments
    // This is a placeholder. Actual implementation would involve calling Razorpay API.
    // Example:
    // if (subscription.payment_gateway_subscription_id) {
    //   const razorpayCancelResponse = await cancelRazorpaySubscription(subscription.payment_gateway_subscription_id);
    //   if (razorpayCancelResponse.error) {
    //     console.error('Razorpay cancellation failed:', razorpayCancelResponse.error);
    //     // Potentially revert Supabase status or log for manual intervention
    //     return res.status(500).json({ message: 'Subscription updated, but payment gateway cancellation failed.' });
    //   }
    // } else {
    //   console.warn('No payment_gateway_subscription_id found for subscription:', subscription.id);
    // }

    return res.status(200).json({ 
      message: 'Subscription successfully scheduled for cancellation.', 
      cancellationDate: cancellationDate 
    });

  } catch (error) {
    console.error('Unexpected error during subscription cancellation:', error);
    return res.status(500).json({ message: 'An unexpected error occurred.' });
  }
}