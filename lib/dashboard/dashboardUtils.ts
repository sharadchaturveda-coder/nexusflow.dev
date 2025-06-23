import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ChatMessage } from '@/types/chat';

export const useConversationLoader = (onConversationLoad: (messages: ChatMessage[]) => void) => {
  const router = useRouter();
  const { conversationId } = router.query;

  useEffect(() => {
    if (conversationId && onConversationLoad) {
      const fetchConversationMessages = async () => {
        try {
          const response = await fetch(`/api/conversations/${conversationId}`);
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
          const data = await response.json();
          onConversationLoad(data.messages);
        } catch (error) {
          console.error('Error loading conversation messages:', error);
        }
      };
      fetchConversationMessages();
    }
  }, [conversationId, onConversationLoad]);
};

export const handleFlushMemory = () => {
  alert('Flushing system memory...');
};
