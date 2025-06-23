import { useEffect, useState } from 'react';

interface Conversation {
  id: string;
  updatedAt: string;
  title: string;
}

export const useChatConversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await fetch('/api/conversations/list');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data: Conversation[] = await response.json();
        setConversations(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  return { conversations, loading, error };
};
