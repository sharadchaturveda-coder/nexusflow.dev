import { motion } from 'framer-motion';

interface Plan {
  id: string;
  name: string;
  price: string;
  yearlyPrice?: string;
  features: string[];
  popular?: boolean;
}

interface PricingCardProps {
  plan: Plan;
  isYearly: boolean;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export default function PricingCard({ plan, isYearly, isSelected, onSelect }: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className={`p-8 rounded-2xl shadow-lg flex flex-col cursor-pointer transition-all ${
        isSelected ? 'border-2 border-magenta shadow-2xl' : 'border border-gray-200'
      } ${plan.popular ? 'bg-gradient-to-br from-orange-100 to-pink-100' : 'bg-white'}`}
      onClick={() => onSelect(plan.id)}
    >
      {plan.popular && (
        <div className="absolute top-0 -translate-y-1/2 bg-magenta text-white px-3 py-1 rounded-full text-sm font-bold">
          Most Popular
        </div>
      )}
      <h3 className="text-2xl font-bold mb-4 text-gray-900">{plan.name}</h3>
      <p className="text-4xl font-black mb-4 text-gray-900">{isYearly ? plan.yearlyPrice : plan.price}</p>
      <ul className="text-gray-600 space-y-2 flex-grow">
        {plan.features.map((feature, i) => (
          <li key={i}>{feature}</li>
        ))}
      </ul>
      <button className={`mt-8 font-bold py-3 px-6 rounded-full transition-all ${isSelected ? 'bg-magenta text-white' : 'bg-gray-200 text-gray-800'}`}>
        Choose Plan
      </button>
    </motion.div>
  );
}
