# `ChatDisplay` Component

This component is responsible for rendering the messages within a chat conversation. It displays a placeholder message if no messages are present.

## Props

*   `messages` (ChatMessage[]): An array of chat messages to display.

## Usage

```typescript
import ChatDisplay from '@/components/chat/ChatDisplay';
import { ChatMessage } from '@/types/chat';

const messages: ChatMessage[] = [
  { role: 'user', content: 'Hello' },
  { role: 'ai', content: 'Hi there!' },
];

<ChatDisplay messages={messages} />;
