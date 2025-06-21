import React from 'react';
import { motion } from 'framer-motion';

interface QuotaOverviewProps {
  currentPlan: string;
  tokensUsed: number;
  tokensMax: number;
  softOverageZone: number; // Percentage of max tokens where soft overage begins
}

const QuotaOverview: React.FC<QuotaOverviewProps> = ({
  currentPlan,
  tokensUsed,
  tokensMax,
  softOverageZone,
}) => {
  const usagePercentage = (tokensUsed / tokensMax) * 100;
  const isSoftOverage = usagePercentage >= softOverageZone;
  const isQuotaDanger = usagePercentage >= 90; // Example: danger if 90% or more

  const getGradientColor = (percentage: number) => {
    if (percentage >= 90) return 'to-red-500';
    if (percentage >= softOverageZone) return 'to-orange-500';
    return 'to-green-500';
  };

  return (
    <div className="w-full p-6 bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Current Plan: {currentPlan}</h3>
        <span className="text-lg font-medium text-gray-600">
          {tokensUsed.toLocaleString()} / {tokensMax.toLocaleString()} Tokens Used
        </span>
      </div>

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
            style={{ left: `${softOverageZone}%`, width: `${100 - softOverageZone}%` }}
          ></div>
        )}
      </div>

      {isQuotaDanger && (
        <motion.div
          className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md flex justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-medium">
            You are nearing your quota limit. Consider upgrading your plan!
          </p>
          <button className="ml-4 bg-gradient-to-r from-gold-500 to-orange-500 text-white font-bold py-2 px-4 rounded-md shadow-md hover:scale-105 transition-all">
            Upgrade Plan
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default QuotaOverview;
