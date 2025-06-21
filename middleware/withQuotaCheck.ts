import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { getPlanByUserId, getUser } from '../lib/planChecker';
import { getUserUsage } from '../lib/usageLogger';
import { logTransaction } from '../lib/transactionManager';
import { calculateCost } from '../lib/tokenCostCalculator';

export function withQuotaCheck(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const user = await getUser(userId);
    if (user?.locked) {
        return res.status(403).json({ error: 'User account is locked' });
    }

    const plan = await getPlanByUserId(userId);
    if (!plan) {
      return res.status(403).json({ error: 'User does not have a valid plan' });
    }

    const currentUsage = await getUserUsage(userId);
    const hardLimit = plan.token_limit * 1.1; // 10% hard overage limit

    if (currentUsage > hardLimit) {
        await logTransaction({
            userId,
            amount: calculateCost(currentUsage - plan.token_limit, plan.model),
            description: `Hard overage limit exceeded`,
            timestamp: new Date().toISOString(),
            type: 'overage_penalty'
        });
        return res.status(429).json({ error: 'Quota exceeded. Please upgrade your plan.' });
    }
    
    if (currentUsage > plan.token_limit) {
        res.setHeader('X-Warning', 'You are using overage tokens. Additional charges may apply.');
    }

    // Inject plan and user info into the request object
    (req as any).plan = plan;
    (req as any).user = user;

    return handler(req, res);
  };
}
