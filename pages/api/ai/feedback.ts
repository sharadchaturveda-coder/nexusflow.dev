import type { NextApiRequest, NextApiResponse } from 'next';
import { withRateLimit } from '../middleware/rateLimiter';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Dummy data for AI feedback
    const feedback = {
      personalityMessages: [
        { personality: 'Friendly', messages: 1500 },
        { personality: 'Empathetic', messages: 1200 },
        { personality: 'Formal', messages: 800 },
        { personality: 'Persuasive', messages: 700 },
        { personality: 'Informative', messages: 1000 },
      ],
      gptModelUsage: [
        { name: 'GPT-3.5', value: 60 },
        { name: 'GPT-4o', value: 40 },
      ],
      insights: [
        'Most common user prompt style: FAQ-type inquiries.',
        'Peak usage time: Weekdays, 10 AM - 2 PM UTC.',
      ],
    };
    res.status(200).json(feedback);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withRateLimit(handler);
