import React from 'react';
import { motion } from 'framer-motion';

interface QuotaDangerMessageProps {}

const QuotaDangerMessage: React.FC<QuotaDangerMessageProps> = () => {
  return (
    <motion.div
      className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md flex justify-between items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="font-medium">
        You are nearing your quota limit. Consider contacting support for a custom plan!
      </p>
    </motion.div>
  );
};

export default QuotaDangerMessage;
