import { motion } from 'framer-motion';

interface QuotaUpgradePromptProps {
  handleUpgrade: () => void;
  isUpgrading: boolean;
}

const QuotaUpgradePrompt: React.FC<QuotaUpgradePromptProps> = ({
  handleUpgrade,
  isUpgrading,
}) => {
  return (
    <motion.div
      className="mt-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded-md flex justify-between items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="font-medium">
        Activate your Pro Trial for more tokens and features!
      </p>
      <button
        className="ml-4 bg-gold-gradient text-white font-bold py-2 px-4 rounded-md shadow-md hover:scale-105 transition-all"
        onClick={handleUpgrade}
        disabled={isUpgrading}
      >
        {isUpgrading ? 'Activating...' : 'Activate Pro Trial'}
      </button>
    </motion.div>
  );
};

export default QuotaUpgradePrompt;
