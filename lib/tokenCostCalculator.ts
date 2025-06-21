const COST_PER_1000_TOKENS_INR = {
  'gpt-3.5-turbo': 0.0015,
  'gpt-4o-mini': 0.005,
};

export function calculateCost(
  tokens: number,
  model: 'gpt-3.5-turbo' | 'gpt-4o-mini'
): number {
  const rate = COST_PER_1000_TOKENS_INR[model];
  return (tokens / 1000) * rate;
}
