import type { NextApiRequest, NextApiResponse } from 'next';
import { withRateLimit } from '../middleware/rateLimiter';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Dummy data for user quota
    const quota = {
      currentPlan: 'Pro Plan',
      tokensUsed: 750000,
      tokensMax: 1000000,
      softOverageZone: 80,
    };
    res.status(200).json(quota);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withRateLimit(handler);
