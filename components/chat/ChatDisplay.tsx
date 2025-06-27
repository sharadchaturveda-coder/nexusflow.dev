import { ChatMessage } from '@/types/chat';
import { formatMessageForDisplay } from '@/lib/chat/utils/formatters';

interface ChatDisplayProps {
  messages: ChatMessage[];
}

const ChatDisplay: React.FC<ChatDisplayProps> = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Chat with Nexus Flow AI</h1>
      {messages.length === 0 && (
        <p className="text-gray-500">Start a new conversation or select one from the history.</p>
      )}
      {messages.map((message, index) => (
        <>
          {formatMessageForDisplay(message)}
        </>
      ))}
    </div>
  );
};

export default ChatDisplay;
