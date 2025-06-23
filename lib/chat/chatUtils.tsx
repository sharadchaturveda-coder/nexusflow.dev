import { ChatMessage } from '@/types/chat';

export const sendMessageToApi = async (conversationId: string | null, message: string) => {
  const response = await fetch('/api/messages/relay', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      conversationId,
      message,
    }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
};
