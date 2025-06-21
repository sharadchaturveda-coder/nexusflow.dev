import React from 'react';
import SystemStatusWidget from './SystemStatusWidget';
import FlushMemoryButton from './FlushMemoryButton';
import styles from '../../styles/Dashboard.module.css';

interface SystemStatusData {
  service: string;
  status: 'operational' | 'degraded' | 'outage';
  message: string;
  lastChecked: string;
}

interface SystemStatusSectionProps {
  openaiStatus: SystemStatusData | null;
  webhookStatus: SystemStatusData | null;
  handleFlushMemory: () => void;
}

const SystemStatusSection: React.FC<SystemStatusSectionProps> = ({
  openaiStatus,
  webhookStatus,
  handleFlushMemory,
}) => {
  return (
    <section className={`${styles.systemStatus} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 shadow-soft-lg`}>
      {openaiStatus ? (
        <SystemStatusWidget
          title="Ping OpenAI"
          status={openaiStatus.status === 'operational' ? 'success' : openaiStatus.status === 'degraded' ? 'loading' : 'failure'}
          message={openaiStatus.message}
        />
      ) : (
        <p className="text-gray-500">Loading OpenAI status...</p>
      )}
      {webhookStatus ? (
        <SystemStatusWidget
          title="Webhook Health"
          status={webhookStatus.status === 'operational' ? 'success' : webhookStatus.status === 'degraded' ? 'loading' : 'failure'}
          message={webhookStatus.message}
        />
      ) : (
        <p className="text-gray-500">Loading Webhook status...</p>
      )}
      <SystemStatusWidget
        title="Message Relay Latency"
        status="loading" // This would typically be dynamic
        message="Checking..."
      />
      <FlushMemoryButton onClick={handleFlushMemory} />
    </section>
  );
};

export default SystemStatusSection;
