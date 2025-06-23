# `UsageHistoryList` Component

This component displays a list of recent usage activities, showing the date, tokens used, and cost for each log entry.

## Props

*   `usage` (`UsageLog[]`): An array of usage log objects to display.

## Usage

```typescript
import UsageHistoryList from '@/components/dashboard/UsageHistoryList';
import { UsageLog } from '@/types/dashboard';

const recentActivities: UsageLog[] = [
  // ... array of UsageLog objects
];

<UsageHistoryList usage={recentActivities} />;
