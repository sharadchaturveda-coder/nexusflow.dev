import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { supabase } from '../../../lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const userId = session.user.id;

  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .update({ plan: 'pro', tokenLimit: 100000 })
      .eq('userId', userId);

    if (error) {
      console.error('Error updating subscription:', error);
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: 'Pro trial activated successfully!' });
  } catch (error: any) {
    console.error('Server error:', error);
    res.status(500).json({ error: error.message });
  }
}
