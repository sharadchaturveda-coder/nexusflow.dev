import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = [
  'var(--tw-colors-purple-dark)',
  'var(--tw-colors-gold-DEFAULT)',
  'var(--tw-colors-orange)',
  'var(--tw-colors-magenta)',
  'var(--tw-colors-purple-light)',
];

interface PersonalityMessage {
  personality: string;
  messages: number;
}

interface PersonalityMessagesChartProps {
  data: PersonalityMessage[];
}

const PersonalityMessagesChart: React.FC<PersonalityMessagesChartProps> = ({ data }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Messages Triggered by Personality</h3>
      {data && data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="var(--tw-colors-purple-dark)"
              dataKey="messages"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry: PersonalityMessage, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500 text-center py-10">No personality message data available.</p>
      )}
    </div>
  );
};

export default PersonalityMessagesChart;
