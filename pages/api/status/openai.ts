import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const openaiApiKey = process.env.OPENAI_API_KEY;

  let status = 'pending'; // Default to pending if not configured
  let latency = 0;
  let message = 'OpenAI API key not configured.';

  if (openaiApiKey) {
    const openai = new OpenAI({
      apiKey: openaiApiKey,
    });

    const startTime = Date.now();
    try {
      // A lightweight call to check OpenAI API status, e.g., listing models
      await openai.models.list();
      latency = Date.now() - startTime;
      status = 'ok';
      message = 'Operational';
    } catch (error: any) {
      status = 'error';
      message = `Error: ${error.message}`;
      latency = Date.now() - startTime; // Still record latency even on error
      console.error('OpenAI status check failed:', error);
    }
  }

  res.status(200).json({
    status,
    latency,
    message,
  });
}
