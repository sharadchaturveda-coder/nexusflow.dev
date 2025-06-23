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

  const { plan, tokensUsed, tokenLimit } = quota;
  const softOverageZone = tokenLimit * 0.9;
  const isQuotaDanger = tokenLimit > 0 && (tokensUsed / tokenLimit) * 100 >= 90;

  const handleUpgrade = async () => {
    setIsUpgrading(true);
    try {
      const response = await fetch('/api/user/activate-pro-trial', {
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
          {(tokensUsed ?? 0).toLocaleString()} / {(tokenLimit ?? 0).toLocaleString()} Tokens Used
        </span>
      </div>

      <QuotaProgressBar
        tokens_used={tokensUsed}
        token_limit={tokenLimit}
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
