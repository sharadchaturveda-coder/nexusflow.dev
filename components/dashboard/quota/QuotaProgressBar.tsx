import React from 'react';
import { motion } from 'framer-motion';

interface QuotaProgressBarProps {
  tokensUsed: number;
  tokenLimit: number;
  softOverageZone: number;
}

const QuotaProgressBar: React.FC<QuotaProgressBarProps> = ({
  tokensUsed,
  tokenLimit,
  softOverageZone,
}) => {
  const usagePercentage = (tokensUsed / tokenLimit) * 100;
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
          style={{ left: `${(softOverageZone / tokenLimit) * 100}%`, width: `${100 - (softOverageZone / tokenLimit) * 100}%` }}
        ></div>
      )}
    </div>
  );
};

export default QuotaProgressBar;
