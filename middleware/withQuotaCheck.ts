import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { getPlan } from '../lib/planChecker';
import { UsageLog } from '../lib/usageLogger';
import fs from 'fs/promises';
import path from 'path';

const usageLogPath = path.resolve(process.cwd(), 'data/usage.json');

export const withQuotaCheck = (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, planName } = req.body;

  if (!userId || !planName) {
    return res.status(400).json({ error: 'userId and planName are required' });
  }

  const plan = await getPlan(planName);

  if (!plan) {
    return res.status(404).json({ error: 'Plan not found' });
  }

  let usageData: UsageLog[] = [];
  try {
    const fileContent = await fs.readFile(usageLogPath, 'utf-8');
    usageData = JSON.parse(fileContent);
  } catch (error) {
    // File might not exist yet, which is fine.
  }

  const userUsage = usageData
    .filter(log => log.userId === userId)
    .reduce((total, log) => total + log.tokensUsed, 0);

  if (userUsage >= plan.token_limit) {
    return res.status(429).json({ error: 'Monthly quota exceeded' });
  }

  return handler(req, res);
};
