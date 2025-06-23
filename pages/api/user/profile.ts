import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../api/auth/[...nextauth]';
import { supabase } from '../../../lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const userId = session.user?.id;

    if (!userId) {
      return res.status(400).json({ message: 'User ID not found in session' });
    }

    // Fetch user data
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('name, email, image')
      .eq('id', userId)
      .single();

    if (userError) {
      console.error('Error fetching user data:', userError);
      return res.status(500).json({ message: 'Error fetching user data', error: userError.message });
    }

    // Fetch subscription data
    const { data: subscriptionData, error: subscriptionError } = await supabase
      .from('subscriptions')
      .select('plan, "tokensUsed", "tokenLimit"')
      .eq('userId', userId)
      .single();

    if (subscriptionError) {
      console.error('Error fetching subscription data:', subscriptionError);
      return res.status(500).json({ message: 'Error fetching subscription data', error: subscriptionError.message });
    }

    const profileData = {
      ...userData,
      ...subscriptionData,
    };

    res.status(200).json(profileData);
  } catch (error: any) {
    console.error('Unexpected error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
