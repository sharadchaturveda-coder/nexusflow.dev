import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Since there's no external webhook configured yet, return a placeholder status
  res.status(200).json({
    status: 'pending',
    message: 'Webhook not configured',
    latency: 0, // No actual latency to measure
  });
}
