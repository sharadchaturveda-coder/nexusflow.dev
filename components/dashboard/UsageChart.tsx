import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts';

interface ChartData {
  name: string;
  tokens: number;
  messages: number;
  apiCost: number;
}

interface UsageChartProps {
  data: ChartData[];
}

const UsageChart: React.FC<UsageChartProps> = ({ data }) => {
  const [selectedMetric, setSelectedMetric] = useState<'tokens' | 'messages' | 'apiCost'>('tokens');

  const handleMetricChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMetric(event.target.value as 'tokens' | 'messages' | 'apiCost');
  };

  const getLineColor = () => {
    switch (selectedMetric) {
      case 'tokens': return '#8884d8';
      case 'messages': return '#82ca9d';
      case 'apiCost': return '#ffc658';
      default: return '#8884d8';
    }
  };

  const getBarColor = () => {
    switch (selectedMetric) {
      case 'tokens': return '#8884d8';
      case 'messages': return '#82ca9d';
      case 'apiCost': return '#ffc658';
      default: return '#8884d8';
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-end mb-4">
        <select
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
          value={selectedMetric}
          onChange={handleMetricChange}
        >
          <option value="tokens">Tokens</option>
          <option value="messages">Messages</option>
          <option value="apiCost">API Cost</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey={selectedMetric} fill={getBarColor()} opacity={0.3} />
          <Line type="monotone" dataKey={selectedMetric} stroke={getLineColor()} strokeWidth={2} dot={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UsageChart;
