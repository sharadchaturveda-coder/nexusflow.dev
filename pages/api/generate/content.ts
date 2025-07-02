import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

// IMPORTANT! Set the runtime to edge
export const config = {
  runtime: 'edge',
};

// Create an OpenAI API client (that's edge friendly!)
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: Request) {
  // Extract the `contentType` and `topic` from the request body
  const { contentType, topic } = await req.json();

  // Construct a prompt for the AI
  const prompt = `Generate a compelling ${contentType} about the following topic: "${topic}". Make it engaging and relevant to the content type.`;

  // Request the OpenAI API for a streaming chat completion
  const result = await streamText({
    model: openai('gpt-3.5-turbo'),
    messages: [{ role: 'user', content: prompt }],
  });

  // Respond with the stream
  return result.toDataStreamResponse();
}