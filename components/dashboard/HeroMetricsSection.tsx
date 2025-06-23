import React from 'react';
import HeroMetricCard from './HeroMetricCard';
import { FaEnvelope, FaCoins, FaDollarSign, FaUsers } from 'react-icons/fa';
import styles from '../../styles/Dashboard.module.css';
import { HeroMetrics } from '@/types/dashboard';
import { formatTotalMessages, formatTokensConsumed, formatTotalApiCost, formatConversationsActive } from '../../lib/dashboard/utils/metricFormatters';

interface HeroMetricsSectionProps {
  metrics: HeroMetrics | null;
}

const HeroMetricsSection: React.FC<HeroMetricsSectionProps> = ({ metrics }) => {
  return (
    <section className={`${styles.heroMetrics} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`}>
      {metrics ? (
        <>
          <HeroMetricCard
            title="Total Messages"
            value={formatTotalMessages(metrics)}
            icon={<FaEnvelope />}
          />
          <HeroMetricCard
            title="Tokens Consumed"
            value={formatTokensConsumed(metrics)}
            icon={<FaCoins />}
          />
          <HeroMetricCard
            title="Estimated API Cost"
            value={formatTotalApiCost(metrics)}
            icon={<FaDollarSign />}
          />
          <HeroMetricCard
            title="Conversations Active"
            value={formatConversationsActive(metrics)}
            icon={<FaUsers />}
          />
        </>
      ) : (
        <p className="text-gray-500">No metrics available.</p>
      )}
    </section>
  );
};

export default HeroMetricsSection;
