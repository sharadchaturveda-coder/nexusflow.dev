# `useChatLogic` Hook

This hook encapsulates the core logic for the chat interface, managing messages, new message input, active conversation ID, and functions for loading conversations, starting new chats, and sending messages.

## Usage

```typescript
import { useChatLogic } from '@/lib/hooks/useChatLogic';

const {
  currentConversationMessages,
  newMessage,
  activeConversationId,
  handleLoadConversation,
  handleNewChat,
  handleSendMessage,
  setNewMessage,
} = useChatLogic();
```

## Returns

*   `currentConversationMessages`: An array of `ChatMessage` objects for the current conversation.
*   `newMessage`: The current text in the message input field.
*   `activeConversationId`: The ID of the currently active conversation, or `null`.
*   `handleLoadConversation`: Function to load a specific conversation's messages.
*   `handleNewChat`: Function to navigate to a new chat session.
*   `handleSendMessage`: Function to send a new message.
*   `setNewMessage`: Setter function for the `newMessage` state.
