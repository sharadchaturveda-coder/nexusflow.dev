import React from 'react';
import HeroMetricCard from './HeroMetricCard';
import { FaEnvelope, FaCoins, FaDollarSign, FaUsers } from 'react-icons/fa';
import styles from '../../styles/Dashboard.module.css';

interface MetricData {
  totalMessagesThisMonth: number;
  tokensConsumed: number;
  estimatedApiCost: number;
  conversationsActive: number;
  deltaMessages: string;
  deltaTokens: string;
  deltaApiCost: string;
  deltaConversations: string;
}

interface HeroMetricsSectionProps {
  metrics: MetricData | null;
}

const HeroMetricsSection: React.FC<HeroMetricsSectionProps> = ({ metrics }) => {
  return (
    <section className={`${styles.heroMetrics} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`}>
      {metrics ? (
        <>
          <HeroMetricCard
            title="Total Messages This Month"
            value={metrics.totalMessagesThisMonth.toLocaleString()}
            icon={<FaEnvelope />}
            delta={metrics.deltaMessages}
          />
          <HeroMetricCard
            title="Tokens Consumed"
            value={`${(metrics.tokensConsumed / 1000000).toFixed(1)}M`}
            icon={<FaCoins />}
            delta={metrics.deltaTokens}
          />
          <HeroMetricCard
            title="Estimated API Cost"
            value={`$${metrics.estimatedApiCost.toFixed(2)}`}
            icon={<FaDollarSign />}
            delta={metrics.deltaApiCost}
          />
          <HeroMetricCard
            title="Conversations Active"
            value={metrics.conversationsActive.toLocaleString()}
            icon={<FaUsers />}
            delta={metrics.deltaConversations}
          />
        </>
      ) : (
        <p className="text-gray-500">No metrics available.</p>
      )}
    </section>
  );
};

export default HeroMetricsSection;
