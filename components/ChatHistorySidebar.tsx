import Link from 'next/link';
import { useChatConversations } from '@/lib/hooks/useChatConversations';
import { useConversationMessages } from '@/lib/hooks/useConversationMessages';
import { ChatMessage } from '@/types/chat';

interface ChatHistorySidebarProps {
  onConversationLoad: (messages: ChatMessage[]) => void;
  activeConversationId: string | null;
}

const ChatHistorySidebar: React.FC<ChatHistorySidebarProps> = ({ onConversationLoad, activeConversationId }) => {
  const { conversations, loading, error } = useChatConversations();
  useConversationMessages({ onConversationLoad });

  if (loading) {
    return (
      <>
        Loading chat history...
      </>
    );
  }

  if (error) {
    return (
      <>
        Error loading chat history: {error}
      </>
    );
  }

  return (
    <>
      <ul>
        {conversations.map((conv) => (
          <li key={conv.id} className="mb-2">
            <Link
              href={`/chat?conversationId=${conv.id}`}
              className={`block p-2 rounded hover:bg-gray-700 ${
                activeConversationId === conv.id ? 'bg-gray-700' : ''
              }`}
            >
              <p className="font-semibold">{conv.title}</p>
              <p className="text-sm text-gray-400">
                {new Date(conv.updatedAt).toLocaleString()}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ChatHistorySidebar;
