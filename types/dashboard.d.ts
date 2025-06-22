// types/dashboard.d.ts

export interface Subscription {
  plan: 'free' | 'pro';
  tokens_used?: number; // Make optional as it might be fetched from usage_logs
  token_limit?: number; // Make optional as it might be fetched from planChecker
  user_id?: string; // Add user_id to Subscription interface
}

export interface UsageLog {
  created_at: string;
  description: string;
  tokens_used: number;
  cost: number;
}

export interface RawUsageChartData {
  created_at: string;
  tokens_used: number;
}

export interface Conversation {
  id: string;
  user_id: string;
  created_at: string;
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
  tokens_used: number;
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
  token_limit: number;
  price: number;
  model: 'gpt-3.5-turbo' | 'gpt-4o-mini';
}
