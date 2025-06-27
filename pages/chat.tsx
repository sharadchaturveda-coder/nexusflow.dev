import ChatHistorySidebar from '../components/ChatHistorySidebar';
import ChatDisplay from '../components/chat/ChatDisplay';
import ChatInputForm from '../components/chat/ChatInputForm';
import ChatPageLayout from '../components/chat/ChatPageLayout';
import { useChatLogic } from '@/lib/hooks/useChatLogic';

const ChatPage: React.FC = () => {
  const {
    currentConversationMessages,
    newMessage,
    activeConversationId,
    handleLoadConversation,
    handleNewChat,
    handleSendMessage,
    setNewMessage,
  } = useChatLogic();

  return (
    <ChatPageLayout>
      {/* Sidebar */}
      <div className="flex h-full w-1/4 flex-col bg-gray-800 p-4 text-white">
        <h2 className="text-xl font-bold mb-4">Chat History</h2>
        <button
          onClick={handleNewChat}
          className="mb-4 rounded-md bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
        >
          Start New Chat
        </button>
        <div className="flex-1 overflow-y-auto">
          <ChatHistorySidebar onConversationLoad={handleLoadConversation} activeConversationId={activeConversationId} />
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col">
        <ChatDisplay messages={currentConversationMessages} />
        <ChatInputForm
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </ChatPageLayout>
  );
};

export default ChatPage;
