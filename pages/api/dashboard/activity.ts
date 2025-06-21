import type { NextApiRequest, NextApiResponse } from 'next';
import { withRateLimit } from '../middleware/rateLimiter';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Dummy data for recent activity feed
    const activities = [
      { id: '1', type: 'message', description: 'Message relayed to SalesBot', timestamp: '2 minutes ago' },
      { id: '2', type: 'cost', description: 'Cost incurred: $0.05 for API call', timestamp: '5 minutes ago' },
      { id: '3', type: 'bot', description: 'SupportBot used by user ID 123', timestamp: '10 minutes ago' },
      { id: '4', type: 'message', description: 'Message relayed to HRBot', timestamp: '30 minutes ago' },
      { id: '5', type: 'cost', description: 'Cost incurred: $0.02 for API call', timestamp: '1 hour ago' },
      { id: '6', type: 'bot', description: 'MarketingBot used by user ID 456', timestamp: '2 hours ago' },
    ];
    res.status(200).json(activities);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withRateLimit(handler);
