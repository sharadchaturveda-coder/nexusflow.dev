import UpgradeButton from '@/components/UpgradeButton';

export const plans = [
  {
    id: 'free',
    name: 'Free Trial',
    price: '₹0',
    features: ['50 AI-Handled Conversations', '1 Channel', 'GPT-3.5'],
    button: 'Start Your Free Trial', // This will be rendered dynamically in Pricing.tsx
  },
  {
    id: 'startup',
    name: 'Startup',
    price: '₹4,999',
    yearlyPrice: '₹53,988',
    features: ['10,000 Tokens/mo', '3 Channels', 'GPT-4'],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '₹9,999',
    yearlyPrice: '₹107,988',
    features: ['50,000 Tokens/mo', 'Unlimited Channels', 'GPT-4 Turbo', 'Priority Support'],
    popular: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '₹19,999',
    yearlyPrice: '₹215,988',
    features: ['200,000 Tokens/mo', 'Unlimited Channels', 'GPT-4 Turbo', 'Dedicated Support'],
  },
];
