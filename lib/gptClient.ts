import OpenAI from 'openai';
import { ChatMessage } from '../types/chat';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getGPTResponse(
  messages: ChatMessage[],
  model: 'gpt-3.5-turbo' | 'gpt-4o-mini',
  systemPrompt?: string | null
) {
  const systemMessages: ChatMessage[] = systemPrompt
    ? [{ role: 'system', content: systemPrompt }]
    : [];

  const completion = await openai.chat.completions.create({
    messages: [...systemMessages, ...messages],
    model: model,
    temperature: 0.7,
    stream: false,
  });

  return completion.choices[0].message.content;
}
