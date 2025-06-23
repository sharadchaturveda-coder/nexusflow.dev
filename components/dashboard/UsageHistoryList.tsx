import React from 'react';
import { UsageLog } from '@/types/dashboard';

interface UsageHistoryListProps {
  usage: UsageLog[];
}

const UsageHistoryList: React.FC<UsageHistoryListProps> = ({ usage }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold">Usage History</h2>
      <ul>
        {usage.map((log, index) => (
          <li key={index} className="border-b p-2">
            {new Date(log.created_at).toLocaleString()}: {log.tokens_used} tokens used (₹{log.cost.toFixed(2)})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsageHistoryList;
