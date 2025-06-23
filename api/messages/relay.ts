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

  const { message } = req.body;

  // Perform quota check directly in the API route
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET! });

  if (!token || !token.sub) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const user_id = token.sub;

  const { data: subscription, error: subError } = await supabase
      .from('subscriptions')
      .select('tokens_used, token_limit')
      .eq('user_id', user_id)
      .single();

  if (subError || !subscription) {
    return res.status(403).json({ error: 'Subscription not found or error fetching subscription.' });
  }

  if (subscription.tokens_used >= subscription.token_limit) {
    return res.status(429).json({ error: 'Token limit exceeded.' });
  }
  // End quota check

  if (!message) {
    return res.status(400).json({ error: 'message is required' });
  }

  try {
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
    const cost = calculateCost(tokens_used, 'gpt-3.5-turbo'); // Use a default model or derive from subscription

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
