import React from 'react';
import HeroMetricCard from './HeroMetricCard';
import { FaEnvelope, FaCoins, FaDollarSign, FaUsers } from 'react-icons/fa';
import styles from '../../styles/Dashboard.module.css';
import { HeroMetrics } from '@/types/dashboard'; // Import HeroMetrics

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
            value={metrics.totalMessages?.toLocaleString() || 'N/A'}
            icon={<FaEnvelope />}
            // delta prop removed as it's not in new HeroMetrics
          />
          <HeroMetricCard
            title="Tokens Consumed"
            value={metrics.tokensConsumed ? `${(metrics.tokensConsumed / 1000000).toFixed(1)}M` : 'N/A'}
            icon={<FaCoins />}
            // delta prop removed
          />
          <HeroMetricCard
            title="Estimated API Cost"
            value={metrics.totalApiCost ? `$${metrics.totalApiCost.toFixed(2)}` : 'N/A'}
            icon={<FaDollarSign />}
            // delta prop removed
          />
          <HeroMetricCard
            title="Conversations Active"
            value={metrics.conversationsActive?.toLocaleString() || 'N/A'}
            icon={<FaUsers />}
            // delta prop removed
          />
        </>
      ) : (
        <p className="text-gray-500">No metrics available.</p>
      )}
    </section>
  );
};

export default HeroMetricsSection;
