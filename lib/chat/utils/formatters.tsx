import { ChatMessage } from '@/types/chat';

export const formatMessageForDisplay = (message: ChatMessage) => {
  return (
    <div className="mb-4">
      <p className="font-bold">{message.role === 'user' ? 'You:' : 'AI:'}</p>
      <p>{message.content}</p>
    </div>
  );
};
