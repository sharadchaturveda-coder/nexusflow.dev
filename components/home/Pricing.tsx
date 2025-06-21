import { useState } from 'react';
import PricingCard from './PricingCard';
import UpgradeButton from '../UpgradeButton'; // Import the new component

const plans = [
  {
    id: 'free',
    name: 'Free Forever',
    price: '₹0',
    features: ['50 replies/mo', '1 Channel', 'GPT-3.5'],
    button: <UpgradeButton />,
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

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>('growth');

  const handleSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  return (
    <section className="py-20 px-4 bg-cream">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-600 to-yellow-400 bg-clip-text text-transparent tracking-tight mb-4">
          Plans Made to Scale. Or Seduce.
        </h2>
        <p className="text-lg text-gray-700 max-w-xl mx-auto">
          Only pay for what you whisper. Or scream.
        </p>
      </div>
      <div className="flex justify-center items-center mb-12">
        <span className="mr-4 font-bold text-gray-800">Monthly</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" checked={isYearly} onChange={() => setIsYearly(!isYearly)} className="sr-only peer" />
          <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-magenta/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-magenta"></div>
        </label>
        <span className="ml-4 font-bold text-gray-800">Yearly (Save 10%)</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {plans.map((plan) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            isYearly={isYearly}
            isSelected={selectedPlan === plan.id}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </section>
  );
}
