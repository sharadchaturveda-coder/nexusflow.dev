import React from 'react';

interface PlanCardProps {
  planName: string;
  description: string;
}

const PlanCard: React.FC<PlanCardProps> = ({ planName, description }) => {
  const isFreePlan = planName.toLowerCase() === 'free';

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{planName} Plan</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      {isFreePlan ? (
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Upgrade to Pro
        </button>
      ) : (
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Manage Subscription
        </button>
      )}
    </div>
  );
};

export default PlanCard;