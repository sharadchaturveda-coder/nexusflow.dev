import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ChatMessage } from '@/types/chat';
import { sendMessageToApi } from '@/lib/chat/chatUtils';

export const useChatLogic = () => {
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

  return {
    currentConversationMessages,
    newMessage,
    activeConversationId,
    handleLoadConversation,
    handleNewChat,
    handleSendMessage,
    setNewMessage,
  };
};
