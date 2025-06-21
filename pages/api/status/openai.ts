import type { NextApiRequest, NextApiResponse } from 'next';
import { withRateLimit } from '../middleware/rateLimiter';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Dummy status for OpenAI
    const status = {
      service: 'OpenAI API',
      status: 'operational', // or 'degraded', 'outage'
      message: 'Latency: 50ms',
      lastChecked: new Date().toISOString(),
    };
    res.status(200).json(status);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withRateLimit(handler);
