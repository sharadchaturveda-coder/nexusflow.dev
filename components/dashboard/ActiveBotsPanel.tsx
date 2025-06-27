import { motion } from 'framer-motion';

interface ActiveBotsPanelProps {
  currentConversation: {
    status: string;
    lastMessage: string;
    totalMessages: number;
  } | null;
  onStartNewChat: () => void;
}

const ActiveBotsPanel: React.FC<ActiveBotsPanelProps> = ({ currentConversation, onStartNewChat }) => {
  return (
    <div className="w-full p-6 bg-white rounded-xl shadow-soft-lg">
      <div className="space-y-4">
        {currentConversation ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-800">
            <div>
              <p className="text-sm font-semibold">Status:</p>
              <p className="text-lg">{currentConversation.status}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Last Message:</p>
              <p className="text-lg">{currentConversation.lastMessage}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Total Messages:</p>
              <p className="text-lg">{currentConversation.totalMessages}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-10">No active conversation.</p>
        )}
        <div className="flex justify-center mt-4">
          <button
            onClick={onStartNewChat}
            className="bg-orange-gradient text-gray-900 font-bold py-2 px-4 rounded-md shadow-md hover:scale-105 transition-all text-sm"
          >
            Start New Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActiveBotsPanel;
