import React from 'react';
import { motion } from 'framer-motion';

interface ActiveBotsPanelProps {
  bots: any[]; // Using any for now as per the plan for placeholder data
}

const ActiveBotsPanel: React.FC<ActiveBotsPanelProps> = ({ bots }) => {
  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal"> {/* Changed text-gray-600 to text-gray-700 */}
              <th className="py-3 px-6 text-left">Bot Name</th>
              <th className="py-3 px-6 text-left">Assigned Personality</th>
              <th className="py-3 px-6 text-left">Last Used</th>
              <th className="py-3 px-6 text-left">Total Usage</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {bots.map((bot, index) => (
              <motion.tr
                key={bot.id}
                className="border-b border-gray-200 hover:bg-gray-50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
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
                    <button className="bg-purple-gradient text-gray-900 font-bold py-1 px-3 rounded-md shadow-md hover:scale-105 transition-all text-xs">
                      View Logs
                    </button>
                    <button className="bg-orange-gradient text-gray-900 font-bold py-1 px-3 rounded-md shadow-md hover:scale-105 transition-all text-xs">
                      Reset Memory
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-md shadow-md hover:scale-105 transition-all text-xs">
                      Disable
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveBotsPanel;
