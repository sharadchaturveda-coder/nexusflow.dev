import React from 'react';

interface Bot {
  id: string;
  name: string;
  personality: string;
  lastUsed: string;
  totalUsage: string;
}

interface ActiveBotsPanelProps {
  bots: Bot[];
}

const ActiveBotsPanel: React.FC<ActiveBotsPanelProps> = ({ bots }) => {
  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Bot Name</th>
              <th className="py-3 px-6 text-left">Assigned Personality</th>
              <th className="py-3 px-6 text-left">Last Used</th>
              <th className="py-3 px-6 text-left">Total Usage</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {bots.map((bot) => (
              <tr key={bot.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="font-medium">{bot.name}</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-left">
                  <span className="font-medium">{bot.personality}</span>
                </td>
                <td className="py-3 px-6 text-left">
                  {bot.lastUsed}
                </td>
                <td className="py-3 px-6 text-left">
                  {bot.totalUsage}
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center space-x-2">
                    <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-1 px-3 rounded-md shadow-md hover:scale-105 transition-all text-xs">
                      View Logs
                    </button>
                    <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold py-1 px-3 rounded-md shadow-md hover:scale-105 transition-all text-xs">
                      Reset Memory
                    </button>
                    <button className="bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-1 px-3 rounded-md shadow-md hover:scale-105 transition-all text-xs">
                      Disable
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveBotsPanel;
