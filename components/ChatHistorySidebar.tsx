import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Conversation {
  id: string;
  updatedAt: string;
  title: string;
}

const ChatHistorySidebar: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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

  if (loading) {
    return (
      <div className="w-64 bg-gray-800 text-white p-4 h-screen overflow-y-auto">
        Loading chat history...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-64 bg-gray-800 text-white p-4 h-screen overflow-y-auto">
        Error loading chat history: {error}
      </div>
    );
  }

  return (
    <div className="w-64 bg-gray-800 text-white p-4 h-screen overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Chat History</h2>
      <ul>
        {conversations.map((conv) => (
          <li key={conv.id} className="mb-2">
            <Link href={`/dashboard?conversationId=${conv.id}`} className="block p-2 rounded hover:bg-gray-700">
              <p className="font-semibold">{conv.title}</p>
              <p className="text-sm text-gray-400">
                {new Date(conv.updatedAt).toLocaleString()}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatHistorySidebar;