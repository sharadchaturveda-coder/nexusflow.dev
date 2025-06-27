import {
  Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import { UsageChartData } from '@/types/dashboard'; // Import UsageChartData

interface UsageChartProps {
  data: UsageChartData[];
}

const UsageChart: React.FC<UsageChartProps> = ({ data }) => {
  // Removed selectedMetric state and handlers as we only display tokens_used

  const barColor = 'var(--tw-colors-purple-dark)'; // Use purple-dark from Tailwind config
  const lineColor = 'var(--tw-colors-purple-light)'; // Use purple-light from Tailwind config

  return (
    <div className="w-full">
      {/* Removed the select element for metric change */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="date" /> {/* Changed dataKey to 'date' */}
          <YAxis />
          <Tooltip />
          <Bar dataKey="tokens_used" fill={barColor} opacity={0.3} /> {/* Changed dataKey to 'tokens_used' */}
          <Line type="monotone" dataKey="tokens_used" stroke={lineColor} strokeWidth={2} dot={false} /> {/* Changed dataKey to 'tokens_used' */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UsageChart;
