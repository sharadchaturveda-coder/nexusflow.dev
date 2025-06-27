import type { NextApiRequest, NextApiResponse } from 'next';
import { getGPTResponse } from '../../lib/gptClient';
import { calculateCost } from '../../lib/tokenCostCalculator';
import { logUsage } from '../../lib/usageLogger';
import { getUserMemory, updateUserMemory } from '../../lib/memoryManager';
import { getBotPersona } from '../../lib/botPersona';
import { supabase } from '../../lib/supabaseClient';
import { getToken } from 'next-auth/jwt';
import { ChatMessage as Message } from '../../types/chat'; // Import Message from new location

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, conversationId } = req.body;

  if (!message || !conversationId) {
    return res.status(400).json({ error: 'message and conversationId are required' });
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET! });

  if (!token || !token.sub) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const user_id = token.sub;

  try {
    const { data: subscription, error: subError } = await supabase
      .from('subscriptions')
      .select('conversations_used, conversation_limit, last_conversation_id')
      .eq('user_id', user_id)
      .single();

    if (subError || !subscription) {
      return res.status(403).json({ error: 'Subscription not found or error fetching subscription.' });
    }

    if (subscription.conversations_used >= subscription.conversation_limit) {
      return res.status(429).json({ error: 'Conversation limit exceeded.' });
    }

    // Check if this conversationId has already been processed
    let shouldIncrementConversation = false;
    if (subscription.last_conversation_id !== conversationId) {
      shouldIncrementConversation = true;
    }

    if (shouldIncrementConversation) {
      const { error: updateError } = await supabase
        .from('subscriptions')
        .update({
          conversations_used: subscription.conversations_used + 1,
          last_conversation_id: conversationId,
        })
        .eq('user_id', user_id);

      if (updateError) {
        console.error('Error updating conversation count:', updateError);
        return res.status(500).json({ error: 'Failed to update conversation count.' });
      }
    }

    const userMemory = await getUserMemory(user_id);
    const botPersona = await getBotPersona(user_id);

    const messages: Message[] = [
        ...userMemory,
        { role: 'user', content: message }
    ];

    const gptResponse = await getGPTResponse(messages, 'gpt-3.5-turbo', botPersona); // Use a default model or derive from subscription

    const userMessage: Message = { role: 'user', content: message };
    const assistantMessage: Message = { role: 'assistant', content: gptResponse || '' };

    // Update memory with both messages
    const newHistory = [...userMemory, userMessage, assistantMessage];
    await updateUserMemory(user_id, newHistory);

    const tokens_used = (gptResponse || '').length;
    const cost = calculateCost(tokens_used, 'gpt-3.5-turbo');

    await logUsage(user_id, tokens_used, cost);

    res.status(200).json({
      message: gptResponse,
      tokens_used,
      costIncurred: cost,
      status: 'OK',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export default handler;
