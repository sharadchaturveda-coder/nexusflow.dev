import React from 'react';
import { motion } from 'framer-motion';

interface ExperimentalAIInsightsProps {
  insights: string[];
}

const ExperimentalAIInsights: React.FC<ExperimentalAIInsightsProps> = ({ insights }) => {
  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Insights</h3>
      {insights && insights.length > 0 ? (
        insights.map((insight: string, index: number) => (
          <motion.p
            key={index}
            className="text-gray-700"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {insight}
          </motion.p>
        ))
      ) : (
        <p className="text-gray-500">No insights available.</p>
      )}
    </div>
  );
};

export default ExperimentalAIInsights;
