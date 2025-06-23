import React from 'react';
import { ChatMessage } from '@/types/chat';

interface ConversationDisplayProps {
  conversationId: string;
  messages: ChatMessage[];
}

const ConversationDisplay: React.FC<ConversationDisplayProps> = ({ conversationId, messages }) => {
  return (
    <div className="flex flex-col space-y-4">
      {messages.length > 0 ? (
        messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${
              message.role === 'user'
                ? 'bg-blue-500 text-white self-end'
                : 'bg-gray-200 text-gray-800 self-start'
            }`}
          >
            <p className="font-semibold capitalize">{message.role}</p>
            <p>{message.content}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center py-10">No messages in this conversation.</p>
      )}
    </div>
  );
};

export default ConversationDisplay;
