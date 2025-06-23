# `ChatInputForm` Component

This component provides the input field and send button for typing and submitting chat messages.

## Props

*   `newMessage` (string): The current value of the message input.
*   `setNewMessage` (function): A setter function to update the `newMessage` state.
*   `handleSendMessage` (function): The function to call when the message is submitted.

## Usage

```typescript
import ChatInputForm from '@/components/chat/ChatInputForm';
import { useState } from 'react';

const [message, setMessage] = useState('');
const sendMessage = () => console.log(message);

<ChatInputForm
  newMessage={message}
  setNewMessage={setMessage}
  handleSendMessage={sendMessage}
/>;
