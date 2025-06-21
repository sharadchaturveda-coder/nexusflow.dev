import React from 'react';
import Head from 'next/head';
import styles from '../../styles/Dashboard.module.css';
import DashboardContent from '../../components/dashboard/DashboardContent';
import { useDashboardData } from '../../lib/hooks/useDashboardData';

const DashboardPage: React.FC = () => {
  const {
    metrics,
    usageData,
    bots,
    quota,
    activities,
    openaiStatus,
    webhookStatus,
    aiFeedback,
    loading,
    error,
  } = useDashboardData();

  const handleFlushMemory = () => {
    alert('Flushing system memory...');
    // In a real application, this would trigger an API call
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Nexus Flow AI - Dashboard</title>
          <meta name="description" content="Nexus Flow AI Dashboard" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <h1 className={styles.title}>Loading Dashboard...</h1>
          <p className={styles.description}>Please wait while we fetch your data.</p>
          {/* You could add a global spinner here */}
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Nexus Flow AI - Dashboard</title>
          <meta name="description" content="Nexus Flow AI Dashboard" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <h1 className={styles.title}>Error</h1>
          <p className={styles.description}>{error}</p>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Nexus Flow AI - Dashboard</title>
        <meta name="description" content="Nexus Flow AI Dashboard" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>

      <DashboardContent
        metrics={metrics}
        usageData={usageData}
        bots={bots}
        quota={quota}
        activities={activities}
        openaiStatus={openaiStatus}
        webhookStatus={webhookStatus}
        aiFeedback={aiFeedback}
        handleFlushMemory={handleFlushMemory}
      />
    </div>
  );
};

export default DashboardPage;
