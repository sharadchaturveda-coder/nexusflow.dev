import type { NextApiRequest, NextApiResponse } from 'next';
import { withRateLimit } from '../middleware/rateLimiter';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // This endpoint would receive incoming Facebook Messenger messages via webhook
    console.log('Received Facebook Messenger webhook:', req.body);

    // In a real application:
    // 1. Parse message
    // 2. Retrieve company context
    // 3. Send to ChatGPT
    // 4. Send response back to Facebook Messenger API

    res.status(200).json({ status: 'success', message: 'Facebook Messenger webhook received' });
  } else if (req.method === 'GET') {
    // Facebook Messenger webhook verification
    const VERIFY_TOKEN = process.env.FACEBOOK_VERIFY_TOKEN;
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('Facebook Messenger webhook verified!');
      res.status(200).send(challenge);
    } else {
      res.status(403).end();
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withRateLimit(handler);
