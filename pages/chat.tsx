import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import ChatHistorySidebar from '../components/ChatHistorySidebar';
import { useRouter } from 'next/router';
import { ChatMessage } from '@/types/chat';
import { sendMessageToApi } from '@/lib/chat/chatUtils';
import { formatMessageForDisplay } from '@/lib/chat/utils/formatters';

const ChatPage: React.FC = () => {
  const router = useRouter();
  const { conversationId } = router.query;
  const [currentConversationMessages, setCurrentConversationMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  useEffect(() => {
    if (conversationId && typeof conversationId === 'string') {
      setActiveConversationId(conversationId);
    } else {
      setActiveConversationId(null);
      setCurrentConversationMessages([]); // Clear messages for new chat
    }
  }, [conversationId]);

  const handleLoadConversation = (messages: ChatMessage[]) => {
    setCurrentConversationMessages(messages);
  };

  const handleNewChat = () => {
    router.push('/chat'); // Navigate to /chat to start a new conversation
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = { role: 'user', content: newMessage };
    setCurrentConversationMessages((prev) => [...prev, userMessage]);
    setNewMessage('');

    try {
      const data = await sendMessageToApi(activeConversationId, newMessage);
      setCurrentConversationMessages(data.messages); // Assuming the API returns the full conversation
      setActiveConversationId(data.conversationId); // Update active conversation ID if a new one was created
    } catch (error) {
      console.error('Error sending message:', error);
      // Optionally, display an error message to the user
    }
  };

  return (
    <div className="font-sans">
      <Head>
        <title>Nexus Flow AI - Chat</title>
        <meta name="description" content="Nexus Flow AI Chat Interface" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      <Navbar />
      <div className="flex h-[calc(100vh-theme(height.navbar))]">
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
          {/* Message Display Area */}
          <div className="flex-1 overflow-y-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Chat with Nexus Flow AI</h1>
            {currentConversationMessages.length === 0 && (
              <p className="text-gray-500">Start a new conversation or select one from the history.</p>
            )}
            {currentConversationMessages.map((message, index) => (
              <React.Fragment key={index}>
                {formatMessageForDisplay(message)}
              </React.Fragment>
            ))}
          </div>

          {/* Message Input Form */}
          <div className="p-4 bg-white border-t border-gray-200">
            <form className="flex items-center space-x-4" onSubmit={handleSendMessage}>
              <textarea
                className="flex-1 resize-none rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-500"
                placeholder="Type your message here..."
                rows={1}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
