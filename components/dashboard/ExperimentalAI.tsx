import { motion } from 'framer-motion';
import GPTModelUsageChart from './charts/GPTModelUsageChart';
import ExperimentalAIInsights from './ExperimentalAIInsights';

interface PersonalityMessage {
  personality: string;
  messages: number;
}

interface GPTModelUsage {
  name: string;
  value: number;
}

interface ExperimentalAIData {
  personalityMessages: PersonalityMessage[];
  gptModelUsage: GPTModelUsage[];
  insights: string[];
}

interface ExperimentalAIProps {
  data: ExperimentalAIData | null;
}

const ExperimentalAI: React.FC<ExperimentalAIProps> = ({ data }) => {
  if (!data) {
    return <p className="text-gray-500 text-center py-10">No AI feedback data available.</p>;
  }

  const { gptModelUsage, insights } = data;

  return (
    <motion.div
      className="w-full p-6 bg-white rounded-xl shadow-soft-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 gap-6">
        <GPTModelUsageChart data={gptModelUsage} />
      </div>
      <ExperimentalAIInsights insights={insights} />
    </motion.div>
  );
};

export default ExperimentalAI;
