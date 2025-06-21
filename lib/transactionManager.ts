import fs from 'fs/promises';
import path from 'path';

const transactionsFilePath = path.resolve(process.cwd(), 'data/transactions.json');

interface Transaction {
  userId: string;
  amount: number;
  description: string;
  timestamp: string;
  type?: 'overage_penalty' | 'invoice';
}

async function getTransactions(): Promise<Transaction[]> {
  try {
    const fileContent = await fs.readFile(transactionsFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    return [];
  }
}

export async function logTransaction(transaction: Transaction): Promise<void> {
  const transactions = await getTransactions();
  transactions.push(transaction);
  await fs.writeFile(transactionsFilePath, JSON.stringify(transactions, null, 2), 'utf-8');
}
