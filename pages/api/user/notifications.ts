import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createServerSupabaseClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const userId = session.user.id;

  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('notification_preferences')
        .eq('id', userId)
        .single();

      if (error) throw error;

      return res.status(200).json({ preferences: data?.notification_preferences || {} });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method === 'PUT') {
    const { preferences } = req.body;

    if (!preferences) {
      return res.status(400).json({ message: 'Preferences data is required.' });
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .update({ notification_preferences: preferences })
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;

      return res.status(200).json({ preferences: data.notification_preferences });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  res.setHeader('Allow', ['GET', 'PUT']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
};

export default handler;