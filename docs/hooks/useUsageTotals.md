# `useUsageTotals` Hook

This hook calculates the total tokens used and total cost from an array of usage logs, and provides the token limit from the user's subscription.

## Props

*   `usage` (`UsageLog[]`): An array of usage log objects.
*   `subscription` (`Subscription | null`): The user's subscription object, or `null` if not available.

## Returns

*   `totalTokensUsed` (number): The sum of `tokens_used` from all usage logs.
*   `totalCost` (number): The sum of `cost` from all usage logs.
*   `tokenLimit` (number): The token limit from the subscription, or 0 if no subscription.

## Usage

```typescript
import { useUsageTotals } from '@/lib/hooks/useUsageTotals';
import { useUsageData } from '@/lib/hooks/useUsageData';

const { usage, subscription } = useUsageData();
const { totalTokensUsed, totalCost, tokenLimit } = useUsageTotals(usage, subscription);
