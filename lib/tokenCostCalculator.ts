const COST_PER_1000_TOKENS_INR = 0.06;

export function calculateCost(tokens: number): number {
  return (tokens / 1000) * COST_PER_1000_TOKENS_INR;
}
