import type { NextApiRequest, NextApiResponse } from 'next';
import { withQuotaCheck } from '../../middleware/withQuotaCheck';
import { getGPT4oMiniResponse } from '../../lib/gptClient';
import { calculateCost } from '../../lib/tokenCostCalculator';
import { logUsage } from '../../lib/usageLogger';
import { logTransaction } from '../../lib/transactionManager';
import { getPlan } from '../../lib/planChecker';
import path from 'path';
import fs from 'fs/promises';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, message, planName } = req.body;

  if (!userId || !message || !planName) {
    return res.status(400).json({ error: 'userId, message, and planName are required' });
  }

  try {
    const gptResponse = await getGPT4oMiniResponse(message);
    // In a real scenario, we would get the token count from the API response.
    // For now, we'll estimate it based on the length of the response.
    const tokensUsed = gptResponse ? gptResponse.length : 0;
    const cost = calculateCost(tokensUsed);

    await logUsage({
      userId,
      tokensUsed,
      cost,
      timestamp: new Date().toISOString(),
    });

    const plan = await getPlan(planName);
    if (plan) {
        const usageLogPath = path.resolve(process.cwd(), 'data/usage.json');
        let usageData: any[] = [];
        try {
            const fileContent = await fs.readFile(usageLogPath, 'utf-8');
            usageData = JSON.parse(fileContent);
        } catch (error) {
            // File might not exist yet
        }
        const userUsage = usageData
            .filter(log => log.userId === userId)
            .reduce((total, log) => total + log.tokensUsed, 0);

        if (userUsage > plan.token_limit) {
            const overage = userUsage - plan.token_limit;
            const overageCost = calculateCost(overage);
            await logTransaction({
                userId,
                amount: overageCost,
                description: `Overage charge for ${overage} tokens`,
                timestamp: new Date().toISOString(),
            });
        }
    }


    res.status(200).json({ response: gptResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export default withQuotaCheck(handler);
