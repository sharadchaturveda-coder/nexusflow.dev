import React from 'react';
import ExperimentalAI from './ExperimentalAI';
import { DashboardSection } from './DashboardLayout';

interface DashboardUsageInsightsSectionProps {
  aiFeedback: any;
}

const DashboardUsageInsightsSection: React.FC<DashboardUsageInsightsSectionProps> = ({ aiFeedback }) => {
  return (
    <DashboardSection title="My Usage Insights" delay={0.6} className="aiFeedback">
      {aiFeedback ? <ExperimentalAI data={aiFeedback} /> : <p className="text-gray-500 text-center py-10">No AI feedback data available.</p>}
    </DashboardSection>
  );
};

export default DashboardUsageInsightsSection;
