import React from 'react';

import UpgradeButton from '../UpgradeButton.tsx'; // Assuming UpgradeButton is needed here

interface Plan {
  id: string;
  name: string;
  price: string;
  keyLimit: string;
  features: string[];
  button: string;
  popular?: boolean;
  link?: string;
}

interface PlanCardProps {
  plan: Plan;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan }) => {
  const isFreePlan = plan.id === 'starter';
  const isEnterprisePlan = plan.id === 'enterprise';

  return (
    <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{plan.name} Plan</h2>
      <p className="text-gray-600 text-xl font-semibold mb-2">{plan.price}</p>
      <p className="text-gray-500 text-sm mb-4">{plan.keyLimit}</p>

      <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
        {plan.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>

      {isEnterprisePlan ? (
        <a href={plan.link} className="block text-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full">
          {plan.button}
        </a>
      ) : (
        <UpgradeButton planId={plan.id} buttonText={plan.button} />
      )}
    </div>
  );
};

export default PlanCard;