import { motion } from 'framer-motion';

interface Plan {
  id: string;
  name: string;
  price: string;
  keyLimit?: string;
  features: string[];
  popular?: boolean;
  button: string;
  link?: string;
}

interface PricingCardProps {
  plan: Plan;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export default function PricingCard({ plan, isSelected, onSelect }: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.2, ease: "easeOut" }}
      whileHover={{ scale: 1.02, boxShadow: '0 10px 20px rgba(0,0,0,0.1)', transition: { duration: 0.15, ease: "easeOut" } }}
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
      <h3 className="text-2xl font-bold mb-2 text-gray-900">{plan.name}</h3>
      <p className="text-4xl font-black mb-2 text-gray-900">{plan.price}</p>
      {plan.keyLimit && <p className="text-sm text-gray-500 mb-4">{plan.keyLimit}</p>}
      <ul className="text-gray-600 space-y-2 flex-grow">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-8">
        {plan.link ? (
          <a href={plan.link} className={`block text-center font-bold py-3 px-6 rounded-full transition-all ${isSelected ? 'bg-magenta text-white' : 'bg-gray-200 text-gray-800'}`}>
            {plan.button}
          </a>
        ) : (
          <button className={`w-full font-bold py-3 px-6 rounded-full transition-all ${isSelected ? 'bg-magenta text-white' : 'bg-gray-200 text-gray-800'}`}>
            {plan.button}
          </button>
        )}
      </div>
    </motion.div>
  );
}
