import fs from 'fs/promises';
import path from 'path';

const MEMORY_DIR = path.resolve(process.cwd(), 'data/memory');
const MAX_MEMORY_TOKENS = 500;

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

async function ensureMemoryDirExists() {
  try {
    await fs.mkdir(MEMORY_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating memory directory:', error);
  }
}

ensureMemoryDirExists();

function getMemoryFilePath(userId: string): string {
  return path.join(MEMORY_DIR, `${userId}.json`);
}

export async function getUserMemory(userId: string): Promise<Message[]> {
  const filePath = getMemoryFilePath(userId);
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    // If the file doesn't exist, return an empty array
    return [];
  }
}

export async function updateUserMemory(userId: string, newMessage: Message): Promise<void> {
  let memory = await getUserMemory(userId);
  memory.push(newMessage);

  // Truncate memory if it's too long
  let tokenCount = memory.reduce((sum, msg) => sum + msg.content.length, 0);
  while (tokenCount > MAX_MEMORY_TOKENS && memory.length > 1) {
    const removedMessage = memory.shift();
    if (removedMessage) {
      tokenCount -= removedMessage.content.length;
    }
  }
  
  // Keep the last 5 messages
  if (memory.length > 5) {
    memory = memory.slice(memory.length - 5);
  }

  const filePath = getMemoryFilePath(userId);
  await fs.writeFile(filePath, JSON.stringify(memory, null, 2), 'utf-8');
}

export async function clearUserMemory(userId: string): Promise<void> {
  const filePath = getMemoryFilePath(userId);
  try {
    await fs.unlink(filePath);
  } catch (error) {
    // Ignore errors if the file doesn't exist
  }
}
