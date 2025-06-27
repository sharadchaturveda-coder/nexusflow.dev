import UsageChart from './UsageChart';
import { DashboardSection } from './DashboardLayout';
import { UsageChartData } from '@/types/dashboard';

interface DashboardUsageSectionProps {
  usageData: UsageChartData[];
}

const DashboardUsageSection: React.FC<DashboardUsageSectionProps> = ({ usageData }) => {
  return (
    <DashboardSection title="Usage Chart" delay={0.1} className="usageChart">
      {usageData && usageData.length > 0 ? <UsageChart data={usageData} /> : <p className="text-gray-500 text-center py-10">No usage data available.</p>}
    </DashboardSection>
  );
};

export default DashboardUsageSection;
