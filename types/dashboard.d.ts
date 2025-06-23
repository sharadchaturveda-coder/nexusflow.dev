// types/dashboard.d.ts

export interface Subscription {
  plan: 'free' | 'pro';
  tokensUsed: number;
  tokenLimit: number;
  userId: string;
}

export interface UsageLog {
  createdAt: string;
  description: string;
  tokensUsed: number;
  cost: number;
}

export interface RawUsageChartData {
  createdAt: string;
  tokensUsed: number;
}

export interface Conversation {
  id: string;
  userId: string;
  updatedAt: string;
  // Add other relevant fields from conversations table if needed
}

export interface HeroMetrics {
  totalMessages: number;
  totalApiCost: number;
  tokensConsumed: number;
  conversationsActive: number;
}

export interface UsageChartData {
  date: string;
  tokensUsed: number;
}

export interface DashboardData {
  subscription: Subscription;
  heroMetrics: HeroMetrics;
  usageChartData: UsageChartData[];
  recentActivity: UsageLog[];
}

export interface SystemStatus {
  status: 'ok' | 'error' | 'pending';
  message: string;
  latency: number;
}

export interface Plan {
  name: string;
  tokenLimit: number;
  price: number;
  model: 'gpt-3.5-turbo' | 'gpt-4o-mini';
}
