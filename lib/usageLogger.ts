import fs from 'fs/promises';
import path from 'path';

const usageLogPath = path.resolve(process.cwd(), 'data/usage.json');

interface UsageLog {
  userId: string;
  tokensUsed: number;
  cost: number;
  timestamp: string;
}

async function getUsageLogs(): Promise<UsageLog[]> {
  try {
    const fileContent = await fs.readFile(usageLogPath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    return [];
  }
}

export async function logUsage(log: UsageLog): Promise<void> {
  const logs = await getUsageLogs();
  logs.push(log);
  await fs.writeFile(usageLogPath, JSON.stringify(logs, null, 2), 'utf-8');
}

export async function getUserUsage(userId: string): Promise<number> {
    const logs = await getUsageLogs();
    return logs
        .filter(log => log.userId === userId)
        .reduce((total, log) => total + log.tokensUsed, 0);
}
