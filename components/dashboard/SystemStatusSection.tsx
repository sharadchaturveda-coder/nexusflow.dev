import React from 'react';
import SystemStatusWidget from './SystemStatusWidget';
import FlushMemoryButton from './FlushMemoryButton';
import styles from '../../styles/Dashboard.module.css';
import { SystemStatus } from '@/types/dashboard';
import { mapStatusToWidgetStatus } from '../../lib/dashboard/utils/systemStatusUtils';

interface SystemStatusSectionProps {
  openaiStatus: SystemStatus | null;
  webhookStatus: SystemStatus | null;
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
          status={mapStatusToWidgetStatus(openaiStatus.status)}
          message={openaiStatus.message || `${openaiStatus.latency}ms`} // Show latency if available
        />
      ) : (
        <p className="text-gray-500">Loading OpenAI status...</p>
      )}
      {webhookStatus ? (
        <SystemStatusWidget
          title="Webhook Health"
          status={mapStatusToWidgetStatus(webhookStatus.status)}
          message={webhookStatus.message}
        />
      ) : (
        <p className="text-gray-500">Loading Webhook status...</p>
      )}
      <SystemStatusWidget
        title="Message Relay Latency"
        status="loading" // This would typically be dynamic, keeping as loading for now
        message="Checking..."
      />
      <FlushMemoryButton onClick={handleFlushMemory} />
    </section>
  );
};

export default SystemStatusSection;
