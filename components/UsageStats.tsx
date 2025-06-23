import React from 'react';

interface UsageStatsProps {
  tokens_used: number;
  cost: number;
  quota: number;
}

const UsageStats: React.FC<UsageStatsProps> = ({ tokens_used, cost, quota }) => {
  const quotaPercentage = (tokens_used / quota) * 100;

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold">Usage Stats</h2>
      <div className="mt-4">
        <p>Tokens Used: {tokens_used}</p>
        <p>Cost: ₹{cost.toFixed(2)}</p>
      </div>
      <div className="mt-4">
        <p>Quota Usage</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${quotaPercentage}%` }}
          ></div>
        </div>
        <p className="text-sm text-right">{quotaPercentage.toFixed(2)}%</p>
      </div>
    </div>
  );
};

export default UsageStats;
