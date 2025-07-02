import React from 'react';
import { motion } from 'framer-motion';

const NexusFlowGradient = 'linear-gradient(to right, #6366F1, #8B5CF6)'; // Example Nexus Flow gradient colors

interface ChatMessageProps {
  message: string;
  isAI: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isAI }) => {
  return (
    <motion.div
      className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-4`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`rounded-lg py-2 px-4 max-w-[70%] ${
          isAI
            ? 'text-white'
            : 'bg-gray-200 text-gray-800'
        }`}
        style={isAI ? { background: NexusFlowGradient } : {}}
      >
        {message}
      </div>
    </motion.div>
  );
};

const AnimatedChatCard: React.FC = () => {
  const messages = [
    { id: 1, text: 'Hi there! How can I help you today?', isAI: true },
    { id: 2, text: 'I need to find a product that fits my specific requirements.', isAI: false },
    { id: 3, text: 'No problem! I can help you with that. What kind of product are you looking for?', isAI: true },
    { id: 4, text: 'I need a durable, waterproof, and lightweight backpack for hiking.', isAI: false },
    { id: 5, text: 'Excellent! We have several options that match your criteria. Let me show you our top recommendations.', isAI: true },
    { id: 6, text: 'That sounds great! Thanks for the quick help.', isAI: false },
    { id: 7, text: 'You\'re welcome! Is there anything else I can assist you with?', isAI: true },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-xl p-6 border border-gray-200 overflow-hidden"
      layout // Enable layout animations
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <div className="flex flex-col h-full">
        <div className="flex-grow overflow-y-auto pr-2">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg.text} isAI={msg.isAI} />
          ))}
        </div>
        <div className="mt-4 p-3 bg-gray-100 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-grow bg-transparent outline-none text-gray-800"
            disabled
          />
          <button className="ml-3 text-blue-500 font-semibold">Send</button>
        </div>
      </div>
    </motion.div>
  );
};

export default AnimatedChatCard;