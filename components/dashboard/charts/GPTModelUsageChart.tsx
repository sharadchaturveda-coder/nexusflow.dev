import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const GPT_COLORS = [
  'var(--tw-colors-purple-dark)',
  'var(--tw-colors-purple-light)',
];

interface GPTModelUsage {
  name: string;
  value: number;
}

interface GPTModelUsageChartProps {
  data: GPTModelUsage[];
}

const GPTModelUsageChart: React.FC<GPTModelUsageChartProps> = ({ data }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">GPT Models Used</h3>
      {data && data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="var(--tw-colors-purple-dark)"
              dataKey="value"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry: GPTModelUsage, index: number) => (
                <Cell key={`cell-${index}`} fill={GPT_COLORS[index % GPT_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500 text-center py-10">No GPT model usage data available.</p>
      )}
    </div>
  );
};

export default GPTModelUsageChart;
