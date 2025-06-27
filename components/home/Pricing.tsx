import { useState } from 'react';
import PricingCard from './PricingCard';
import UpgradeButton from '../UpgradeButton';
import { plans } from '@/lib/pricing/planData';

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>('growth');

  const handleSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  return (
    <section className="py-20 px-4 bg-cream">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-600 to-yellow-400 bg-clip-text text-transparent tracking-tight mb-4 pb-4">
          Plans Made to Scale.<br />Or Seduce.
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
            plan={{
              ...plan,
              button: plan.id === 'free' ? <UpgradeButton /> : null,
            }}
            isYearly={isYearly}
            isSelected={selectedPlan === plan.id}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </section>
  );
}
