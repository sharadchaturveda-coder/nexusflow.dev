// pages/api/payments/webhook.ts
import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import { supabase } from '../../../lib/supabaseClient'; // Adjust path

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;
  const signature = req.headers['x-razorpay-signature'];
  
  const shasum = crypto.createHmac('sha256', secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest('hex');

  if (digest !== signature) {
    return res.status(400).json({ error: 'Invalid signature' });
  }
  
  // Signature is valid, process the event
  const event = req.body;
  if (event.event === 'payment.captured') {
    const payment = event.payload.payment.entity;
    const userId = payment.notes.userId; // Changed userId to user_id // You MUST pass user_id in notes from frontend

    // Update user's plan to 'pro'
    await supabase
      .from('subscriptions')
      .update({ plan: 'pro', tokenLimit: 100000 }) // Changed tokenLimit to token_limit // Pro plan limit
      .eq('userId', userId); // Changed userId to user_id
  }

  res.status(200).json({ status: 'ok' });
}
