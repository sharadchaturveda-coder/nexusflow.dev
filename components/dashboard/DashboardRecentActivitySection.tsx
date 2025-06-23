import React from 'react';
import RecentActivityFeed from './RecentActivityFeed';
import { DashboardSection } from './DashboardLayout';
import { UsageLog } from '@/types/dashboard';

interface DashboardRecentActivitySectionProps {
  activities: UsageLog[];
}

const DashboardRecentActivitySection: React.FC<DashboardRecentActivitySectionProps> = ({ activities }) => {
  return (
    <DashboardSection title="Recent Activity" delay={0.4} className="recentActivity">
      {activities && activities.length > 0 ? <RecentActivityFeed activities={activities} /> : <p className="text-gray-500 text-center py-10">No recent activity to display.</p>}
    </DashboardSection>
  );
};

export default DashboardRecentActivitySection;
