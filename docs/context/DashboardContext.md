# `DashboardContext` and `DashboardProvider`

This React Context provides a centralized way to manage and access dashboard-related data and functions across various components, reducing prop drilling.

## `DashboardProvider` Props

The `DashboardProvider` component wraps the dashboard content and makes the following props available to its children via the context:

*   `metrics`: `HeroMetrics | null`
*   `usageData`: `UsageChartData[]`
*   `currentConversation`: `{ status: string; lastMessage: string; totalMessages: number; } | null`
*   `quota`: `Subscription | null`
*   `activities`: `UsageLog[]`
*   `openaiStatus`: `SystemStatus | null`
*   `webhookStatus`: `SystemStatus | null`
*   `aiFeedback`: `any`
*   `handleFlushMemory`: `() => void`
*   `refreshDashboardData`: `() => void`
*   `onConversationLoad`: `(messages: ChatMessage[]) => void`
*   `currentConversationMessages`: `ChatMessage[]`

## `useDashboardContext` Hook

This hook allows any child component within the `DashboardProvider` to access the provided dashboard data and functions.

## Usage

```typescript
import { DashboardProvider, useDashboardContext } from '@/lib/context/DashboardContext';

// In a parent component (e.g., pages/dashboard/index.tsx)
<DashboardProvider
  metrics={metrics}
  usageData={usageData}
  // ... other props
>
  <DashboardContent />
</DashboardProvider>

// In a child component (e.g., components/dashboard/DashboardContent.tsx)
const MyDashboardComponent: React.FC = () => {
  const { metrics, usageData } = useDashboardContext();
  // ... use metrics and usageData
};
