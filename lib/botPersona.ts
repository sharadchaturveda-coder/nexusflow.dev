import fs from 'fs/promises';
import path from 'path';

const USERS_FILE = path.resolve(process.cwd(), 'data/users.json');

interface User {
  id: string;
  planId: string;
  botPersonality?: string;
  locked?: boolean;
}

async function getUsers(): Promise<User[]> {
  try {
    const fileContent = await fs.readFile(USERS_FILE, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    return [];
  }
}

export async function getBotPersona(userId: string): Promise<string | null> {
  const users = await getUsers();
  const user = users.find(u => u.id === userId);
  return user?.botPersonality || null;
}
