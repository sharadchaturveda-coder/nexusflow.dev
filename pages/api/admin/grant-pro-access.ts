import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { supabase } from '@/lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const userId = session.user?.id;

  if (!userId) {
    return res.status(400).json({ error: 'User ID not found in session' });
  }

  try {
    // Update the user's subscription to 'pro' and increase token limit
    const { data, error } = await supabase
      .from('subscriptions')
      .update({ plan: 'pro', token_limit: 1000000 }) // Example: Set a new higher limit for pro plan
      .eq('user_id', userId);

    if (error) {
      console.error('Error granting pro access:', error.message);
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: 'Pro access granted successfully', data });
  } catch (error: any) {
    console.error('Error in grant-pro-access API:', error.message);
    res.status(500).json({ error: error.message });
  }
}
