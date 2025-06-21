import fs from 'fs/promises';
import path from 'path';

const usageLogPath = path.resolve(process.cwd(), 'data/usage.json');

export interface UsageLog {
  userId: string;
  tokensUsed: number;
  cost: number;
  timestamp: string;
}

export async function logUsage(log: UsageLog) {
  let usageData: UsageLog[] = [];
  try {
    const fileContent = await fs.readFile(usageLogPath, 'utf-8');
    usageData = JSON.parse(fileContent);
  } catch (error) {
    // File might not exist yet, which is fine.
  }

  usageData.push(log);
  await fs.writeFile(usageLogPath, JSON.stringify(usageData, null, 2));
}
