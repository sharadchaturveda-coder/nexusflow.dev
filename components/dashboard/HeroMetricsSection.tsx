import HeroMetricCard from './HeroMetricCard';
import { EnvelopeIcon, CurrencyDollarIcon, UsersIcon } from '@heroicons/react/24/outline';
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
            icon={<EnvelopeIcon className="h-6 w-6 text-blue-500" />}
          />
          <HeroMetricCard
            title="Tokens Consumed"
            value={formatTokensConsumed(metrics)}
            icon={<CurrencyDollarIcon className="h-6 w-6 text-yellow-500" />}
          />
          <HeroMetricCard
            title="Estimated API Cost"
            value={formatTotalApiCost(metrics)}
            icon={<CurrencyDollarIcon className="h-6 w-6 text-green-500" />}
          />
          <HeroMetricCard
            title="Conversations Active"
            value={formatConversationsActive(metrics)}
            icon={<UsersIcon className="h-6 w-6 text-purple-500" />}
          />
        </>
      ) : (
        <p className="text-gray-500">No metrics available.</p>
      )}
    </section>
  );
};

export default HeroMetricsSection;
