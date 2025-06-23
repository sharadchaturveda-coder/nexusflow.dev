import React from 'react';
import { motion } from 'framer-motion';

interface QuotaProgressBarProps {
  tokens_used: number;
  token_limit: number; // Changed tokenLimit to token_limit
  softOverageZone: number;
}

const QuotaProgressBar: React.FC<QuotaProgressBarProps> = ({
  tokens_used,
  token_limit, // Changed tokenLimit to token_limit
  softOverageZone,
}) => {
  const usagePercentage = (tokens_used / token_limit) * 100; // Changed tokenLimit to token_limit
  const isSoftOverage = usagePercentage >= softOverageZone;

  const getGradientColor = (percentage: number) => {
    if (percentage >= 90) return 'to-red-500';
    if (percentage >= softOverageZone) return 'to-orange-500';
    return 'to-green-500';
  };

  return (
    <div className="w-full bg-gray-200 rounded-full h-4 relative overflow-hidden">
      <motion.div
        className={`h-full rounded-full bg-gradient-to-r from-green-400 ${getGradientColor(usagePercentage)} ${isSoftOverage ? 'shadow-lg shadow-orange-300' : ''}`}
        initial={{ width: 0 }}
        animate={{ width: `${usagePercentage}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
      ></motion.div>
      {isSoftOverage && (
        <div
          className="absolute top-0 h-full bg-orange-300 opacity-20"
          style={{ left: `${(softOverageZone / token_limit) * 100}%`, width: `${100 - (softOverageZone / token_limit) * 100}%` }} // Changed tokenLimit to token_limit
        ></div>
      )}
    </div>
  );
};

export default QuotaProgressBar;
