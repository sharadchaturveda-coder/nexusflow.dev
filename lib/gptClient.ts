import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getGPT4oMiniResponse(prompt: string) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'gpt-4o-mini',
    temperature: 0.7,
    stream: false,
  });

  return completion.choices[0].message.content;
}
