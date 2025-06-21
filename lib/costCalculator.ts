export const modelPricingINR = {
  "gpt-4o-mini": { input: 0.05, output: 0.10 }, // INR per 1K tokens
  "gpt-3.5-turbo": { input: 0.015, output: 0.03 },
  "gpt-4": { input: 0.75, output: 1.5 },
};

export function calculateCost(model: keyof typeof modelPricingINR, input: number, output: number): number {
  const rate = modelPricingINR[model];
  if (!rate) return 0;
  const cost = ((input * rate.input) + (output * rate.output)) / 1000;
  return parseFloat(cost.toFixed(2));
}
