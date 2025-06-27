import QuotaOverview from './QuotaOverview';
import { DashboardSection } from './DashboardLayout';
import { Subscription } from '@/types/dashboard';

interface DashboardQuotaOverviewSectionProps {
  quota: Subscription | null;
  refreshDashboardData: () => void;
}

const DashboardQuotaOverviewSection: React.FC<DashboardQuotaOverviewSectionProps> = ({
  quota,
  refreshDashboardData,
}) => {
  return (
    <DashboardSection title="Quota Overview" delay={0.3} className="quotaOverview">
      {quota ? (
        <QuotaOverview
          quota={quota}
          refreshDashboardData={refreshDashboardData}
        />
      ) : (
        <p className="text-gray-500 text-center py-10">No quota information available.</p>
      )}
    </DashboardSection>
  );
};

export default DashboardQuotaOverviewSection;
