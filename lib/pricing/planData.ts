import UpgradeButton from '@/components/UpgradeButton';

export const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 'Free',
    keyLimit: '50 AI Conversations / mo',
    features: ['Standard AI Model', 'Chat History'],
    button: 'Start for Free',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$49 / mo',
    keyLimit: '500 AI Conversations / mo',
    features: ['Train AI on Your Own Data (URLs, PDFs)', 'Advanced AI Model (GPT-4)', 'Priority Support'],
    button: 'Get Started with Pro',
    popular: true,
  },
  {
    id: 'business',
    name: 'Business',
    price: '$99 / mo',
    keyLimit: '1,500 AI Conversations / mo',
    features: ['All Pro features, plus:', 'Team Collaboration (3 seats)', 'Advanced Analytics'],
    button: 'Choose Business',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Let\'s Talk',
    keyLimit: 'Custom Volume & Workflows',
    features: ['All Business features, plus:', 'SOC 2 Compliance', 'Dedicated Account Manager', 'Custom Integrations'],
    button: 'Contact Sales',
    link: '/contact',
  },
];
