import React from 'react';

interface UsageMeterProps {
  tokensUsed: number;
  tokensAvailable: number | 'unlimited';
}

const UsageMeter: React.FC<UsageMeterProps> = ({ tokensUsed, tokensAvailable }) => {
  const isUnlimited = tokensAvailable === 'unlimited';

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Token Usage</h2>
      {isUnlimited ? (
        <p className="text-gray-600">Unlimited tokens</p>
      ) : (
        <div>
          <p className="text-gray-600 mb-2">
            {tokensUsed.toLocaleString()} / {tokensAvailable.toLocaleString()} tokens used
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${(tokensUsed / (tokensAvailable as number)) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsageMeter;