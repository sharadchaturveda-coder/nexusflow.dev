import React from 'react';

interface PlanBannerProps {
  tokens_used: number;
  quota: number;
}

const PlanBanner: React.FC<PlanBannerProps> = ({ tokens_used, quota }) => {
  const usagePercentage = (tokens_used / quota) * 100;
  let message = '';
  let color = '';

  if (usagePercentage >= 100) {
    message = 'You have exceeded your monthly quota.';
    color = 'bg-red-500';
  } else if (usagePercentage >= 90) {
    message = 'You are approaching your monthly quota.';
    color = 'bg-yellow-500';
  }

  if (!message) {
    return null;
  }

  return (
    <div className={`p-4 text-white ${color}`}>
      <p>{message}</p>
    </div>
  );
};

export default PlanBanner;
