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

  try {
    const { data: conversations, error } = await supabase
      .from('conversations')
      .select('id, "updatedAt", "conversationData"')
      .eq('userId', userId)
      .order('"updatedAt"', { ascending: false });

    if (error) {
      console.error('Error fetching conversations:', error);
      return res.status(500).json({ error: error.message });
    }

    const formattedConversations = conversations.map((conv) => {
      let title = 'New Conversation';
      if (conv.conversationData && conv.conversationData.messages && conv.conversationData.messages.length > 0) {
        const firstUserMessage = conv.conversationData.messages.find((msg: any) => msg.role === 'user');
        if (firstUserMessage && firstUserMessage.content) {
          title = firstUserMessage.content.substring(0, 30);
          if (firstUserMessage.content.length > 30) {
            title += '...';
          }
        }
      }
      return {
        id: conv.id,
        updatedAt: conv.updatedAt,
        title: title,
      };
    });

    res.status(200).json(formattedConversations);
  } catch (error: any) {
    console.error('Server error:', error);
    res.status(500).json({ error: error.message });
  }
}
