import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface PersonalityMessage {
  personality: string;
  messages: number;
}

interface GPTModelUsage {
  name: string;
  value: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF'];
const GPT_COLORS = ['#8884d8', '#82ca9d'];

interface ExperimentalAIData {
  personalityMessages: PersonalityMessage[];
  gptModelUsage: GPTModelUsage[];
  insights: string[];
}

interface ExperimentalAIProps {
  data: ExperimentalAIData;
}

const ExperimentalAI: React.FC<ExperimentalAIProps> = ({ data }) => {
  return (
    <div className="w-full p-6 bg-white rounded-xl shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Messages Triggered by Personality</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.personalityMessages}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="messages"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.personalityMessages.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">GPT Models Used</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.gptModelUsage}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.gptModelUsage.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={GPT_COLORS[index % GPT_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Insights</h3>
        {data.insights.map((insight, index) => (
          <p key={index} className="text-gray-700">
            {insight}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ExperimentalAI;
