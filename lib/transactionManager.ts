import fs from 'fs/promises';
import path from 'path';

const transactionsPath = path.resolve(process.cwd(), 'data/transactions.json');

export interface Transaction {
  userId: string;
  amount: number;
  description: string;
  timestamp: string;
}

export async function logTransaction(transaction: Transaction) {
  let transactions: Transaction[] = [];
  try {
    const fileContent = await fs.readFile(transactionsPath, 'utf-8');
    transactions = JSON.parse(fileContent);
  } catch (error) {
    // File might not exist yet, which is fine.
  }

  transactions.push(transaction);
  await fs.writeFile(transactionsPath, JSON.stringify(transactions, null, 2));
}
