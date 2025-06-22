import React, { useState } from 'react';
import { Subscription } from '@/types/dashboard';
import QuotaProgressBar from './quota/QuotaProgressBar';
import QuotaUpgradePrompt from './quota/QuotaUpgradePrompt';
import QuotaDangerMessage from './quota/QuotaDangerMessage';

interface QuotaOverviewProps {
  quota: Subscription | null;
  refreshDashboardData: () => void;
}

const QuotaOverview: React.FC<QuotaOverviewProps> = ({
  quota,
  refreshDashboardData,
}) => {
  const [isUpgrading, setIsUpgrading] = useState(false);

  if (!quota) {
    return <p className="text-gray-500">No quota information available.</p>;
  }

  const { plan, tokens_used = 0, token_limit = 0 } = quota; // Provide default values for safety
  const softOverageZone = token_limit * 0.9;
  const isQuotaDanger = token_limit > 0 && (tokens_used / token_limit) * 100 >= 90; // Add check for token_limit > 0

  const handleUpgrade = async () => {
    setIsUpgrading(true);
    try {
      const response = await fetch('/api/admin/grant-pro-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Successfully upgraded to Pro Plan!');
        refreshDashboardData();
      } else {
        const errorData = await response.json();
        alert(`Failed to upgrade: ${errorData.error || response.statusText}`);
      }
    } catch (error: any) {
      alert(`An error occurred during upgrade: ${error.message}`);
    } finally {
      setIsUpgrading(false);
    }
  };

  return (
    <div className="w-full p-6 bg-white rounded-xl shadow-soft-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Current Plan: {plan === 'free' ? 'Free Plan' : 'Pro Plan'}</h3>
        <span className="text-lg font-medium text-gray-700">
          {tokens_used?.toLocaleString() || 'N/A'} / {token_limit?.toLocaleString() || 'N/A'} Tokens Used
        </span>
      </div>

      <QuotaProgressBar
        tokensUsed={tokens_used}
        tokenLimit={token_limit}
        softOverageZone={softOverageZone}
      />

      {plan === 'free' && (
        <QuotaUpgradePrompt
          handleUpgrade={handleUpgrade}
          isUpgrading={isUpgrading}
        />
      )}

      {plan === 'pro' && isQuotaDanger && (
        <QuotaDangerMessage />
      )}
    </div>
  );
};

export default QuotaOverview;
