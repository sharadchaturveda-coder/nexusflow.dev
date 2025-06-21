import type { NextApiRequest, NextApiResponse } from 'next';
import { withRateLimit } from '../middleware/rateLimiter';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Dummy data for hero metrics
    const metrics = {
      totalMessagesThisMonth: 8942,
      tokensConsumed: 1200000,
      estimatedApiCost: 125.67,
      conversationsActive: 42,
      deltaMessages: '+12% vs last 7 days',
      deltaTokens: '+8% vs last 7 days',
      deltaApiCost: '-3% vs last 7 days',
      deltaConversations: '+25% vs last 7 days',
    };
    res.status(200).json(metrics);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withRateLimit(handler);
