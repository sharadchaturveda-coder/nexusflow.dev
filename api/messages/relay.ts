import type { NextApiRequest, NextApiResponse } from 'next';
import { withQuotaCheck } from '../../middleware/withQuotaCheck';
import { getGPTResponse } from '../../lib/gptClient';
import { calculateCost } from '../../lib/tokenCostCalculator';
import { logUsage, getUserUsage } from '../../lib/usageLogger';
import { getUserMemory, updateUserMemory, Message } from '../../lib/memoryManager';
import { getBotPersona } from '../../lib/botPersona';
import { Plan, User } from '../../lib/planChecker';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, message } = req.body;
  const plan = (req as any).plan as Plan;
  const user = (req as any).user as User;

  if (!userId || !message) {
    return res.status(400).json({ error: 'userId and message are required' });
  }

  try {
    const userMemory = await getUserMemory(userId);
    const botPersona = await getBotPersona(userId);

    const messages: Message[] = [
        ...userMemory,
        { role: 'user', content: message }
    ];

    const gptResponse = await getGPTResponse(messages, plan.model, botPersona);

    const userMessage: Message = { role: 'user', content: message };
    const assistantMessage: Message = { role: 'assistant', content: gptResponse || '' };

    await updateUserMemory(userId, userMessage);
    await updateUserMemory(userId, assistantMessage);

    const tokensUsed = (gptResponse || '').length;
    const cost = calculateCost(tokensUsed, plan.model);

    await logUsage({
      userId,
      tokensUsed,
      cost,
      timestamp: new Date().toISOString(),
    });

    const totalUsage = await getUserUsage(userId);
    const quotaRemaining = ((plan.token_limit - totalUsage) / plan.token_limit) * 100;

    res.status(200).json({
      message: gptResponse,
      tokensUsed,
      costIncurred: cost,
      quotaRemaining: `${quotaRemaining.toFixed(2)}%`,
      status: 'OK',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export default withQuotaCheck(handler);
