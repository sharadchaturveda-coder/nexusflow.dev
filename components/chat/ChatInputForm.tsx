import React from 'react';

interface ChatInputFormProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: (e: React.FormEvent) => void;
}

const ChatInputForm: React.FC<ChatInputFormProps> = ({ newMessage, setNewMessage, handleSendMessage }) => {
  return (
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
  );
};

export default ChatInputForm;
