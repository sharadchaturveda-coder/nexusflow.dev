import React from 'react';

interface SubscriptionCardProps {
  plan: string;
  tokensUsed: number;
  tokenLimit: number;
  onActivateProTrial: () => void;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ plan, tokensUsed, tokenLimit, onActivateProTrial }) => {
  const percentageUsed = (tokensUsed / tokenLimit) * 100;

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Subscription & Usage
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Manage your plan and monitor token usage.
        </p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Current Plan
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {plan === 'free' ? 'Free Plan' : 'Pro Plan'}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Token Usage
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-pink-600 h-2.5 rounded-full"
                  style={{ width: `${percentageUsed}%` }}
                ></div>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                {tokensUsed} / {tokenLimit} Tokens Used
              </p>
            </dd>
          </div>
        </dl>
      </div>
      {plan === 'free' && (
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="button"
            onClick={onActivateProTrial}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Activate Pro Trial
          </button>
        </div>
      )}
    </div>
  );
};

export default SubscriptionCard;