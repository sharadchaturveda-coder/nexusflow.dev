import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../api/auth/[...nextauth]'; // Adjust path as needed
import { supabase } from '../../../lib/supabaseClient'; // Adjust path as needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { order_id, payment_id, razorpay_signature } = req.body;

  if (!order_id || !payment_id || !razorpay_signature) {
    return res.status(400).json({ message: 'Missing required payment details.' });
  }

  const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

  if (!RAZORPAY_KEY_SECRET) {
    console.error('RAZORPAY_KEY_SECRET is not set in environment variables.');
    return res.status(500).json({ message: 'Server configuration error.' });
  }

  const body = order_id + '|' + payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex');

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({ message: 'Invalid signature.' });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user || !session.user.id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const userId = session.user.id;

  try {
    const { error } = await supabase
      .from('users') // Assuming 'users' is your user table
      .update({ plan: 'Pro', subscription_status: 'active' }) // Adjust column names as per your schema
      .eq('id', userId); // Assuming 'id' is the userId column

    if (error) {
      console.error('Database update failed:', error);
      return res.status(500).json({ message: 'Failed to update user plan in database.' });
    }

    res.status(200).json({ message: 'Payment verified and plan updated successfully!' });
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    res.status(500).json({ message: 'Internal Server Error.' });
  }
}