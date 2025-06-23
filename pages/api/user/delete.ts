import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../api/auth/[...nextauth]';
import { supabase } from '../../../lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const userId = session.user?.id;

    if (!userId) {
      return res.status(400).json({ message: 'User ID not found in session' });
    }

    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', userId);

    if (error) {
      console.error('Error deleting user:', error);
      return res.status(500).json({ message: 'Error deleting account', error: error.message });
    }

    res.status(200).json({ message: 'Account successfully deleted' });
  } catch (error: any) {
    console.error('Unexpected error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
