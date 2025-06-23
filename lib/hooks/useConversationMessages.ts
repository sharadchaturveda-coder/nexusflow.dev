import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ChatMessage } from '@/types/chat';

interface UseConversationMessagesProps {
  onConversationLoad: (messages: ChatMessage[]) => void;
}

export const useConversationMessages = ({ onConversationLoad }: UseConversationMessagesProps) => {
  const router = useRouter();

  useEffect(() => {
    const { conversationId } = router.query;
    if (conversationId) {
      const fetchConversationMessages = async () => {
        try {
          const response = await fetch(`/api/conversations/${conversationId}`);
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
          const data: ChatMessage[] = await response.json();
          onConversationLoad(data);
        } catch (err: any) {
          console.error('Error fetching conversation messages:', err);
        }
      };
      fetchConversationMessages();
    }
  }, [router.query, onConversationLoad]);
};
