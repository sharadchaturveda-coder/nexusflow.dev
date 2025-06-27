import { motion } from 'framer-motion';

interface FlushMemoryButtonProps {
  onClick: () => void;
}

const FlushMemoryButton: React.FC<FlushMemoryButtonProps> = ({ onClick }) => {
  return (
    <motion.div
      className="col-span-full flex justify-center mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.6 }} // Add a slight delay to appear after other widgets
    >
      <button
        onClick={onClick}
        className="bg-purple-gradient text-white font-bold py-2 px-6 rounded-md shadow-md hover:scale-105 transition-all"
      >
        Flush Memory System-Wide
      </button>
    </motion.div>
  );
};

export default FlushMemoryButton;
