import type { NextApiRequest, NextApiResponse } from 'next';
import { withRateLimit } from '../middleware/rateLimiter';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Dummy data for usage chart
    const usageData = [
      { name: 'Day 1', tokens: 4000, messages: 2400, apiCost: 24 },
      { name: 'Day 2', tokens: 3000, messages: 1398, apiCost: 22 },
      { name: 'Day 3', tokens: 2000, messages: 9800, apiCost: 32 },
      { name: 'Day 4', tokens: 2780, messages: 3908, apiCost: 40 },
      { name: 'Day 5', tokens: 1890, messages: 4800, apiCost: 18 },
      { name: 'Day 6', tokens: 2390, messages: 3800, apiCost: 25 },
      { name: 'Day 7', tokens: 3490, messages: 4300, apiCost: 30 },
    ];
    res.status(200).json(usageData);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withRateLimit(handler);
