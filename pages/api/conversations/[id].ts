import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { supabase } from '../../../lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const userId = session.user.id;
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Conversation ID is required' });
  }

  try {
    const { data: conversation, error } = await supabase
      .from('conversations')
      .select('"conversationData"')
      .eq('id', id)
      .eq('userId', userId)
      .single();

    if (error) {
      console.error('Error fetching conversation:', error);
      return res.status(500).json({ error: error.message });
    }

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    res.status(200).json(conversation.conversationData);
  } catch (error: any) {
    console.error('Server error:', error);
    res.status(500).json({ error: error.message });
  }
}
