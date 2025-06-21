import type { NextApiRequest, NextApiResponse } from 'next';
import { withRateLimit } from '../middleware/rateLimiter';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Dummy data for active bots
    const bots = [
      { id: '1', name: 'SalesBot', personality: 'Friendly', lastUsed: '2 hours ago', totalUsage: '5,123 messages' },
      { id: '2', name: 'SupportBot', personality: 'Empathetic', lastUsed: '1 day ago', totalUsage: '8,765 messages' },
      { id: '3', name: 'MarketingBot', personality: 'Persuasive', lastUsed: '3 days ago', totalUsage: '2,345 messages' },
      { id: '4', name: 'HRBot', personality: 'Formal', lastUsed: '5 days ago', totalUsage: '1,122 messages' },
    ];
    res.status(200).json(bots);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withRateLimit(handler);
