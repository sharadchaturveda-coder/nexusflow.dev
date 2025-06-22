import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import Navbar from '../../components/Navbar';
import styles from '../../styles/Dashboard.module.css';
import DashboardContent from '../../components/dashboard/DashboardContent';
import { useDashboardData } from '../../lib/hooks/useDashboardData';
import { fetchDashboardData } from '../../lib/dashboardDataFetcher';

interface DashboardPageProps {
  metrics: any;
  usageData: any;
  bots: any;
  quota: any;
  activities: any;
  openaiStatus: any;
  webhookStatus: any;
  aiFeedback: any;
  error?: string;
}

const DashboardPage: React.FC<DashboardPageProps> = ({
  metrics,
  usageData,
  bots,
  quota,
  activities,
  openaiStatus,
  webhookStatus,
  aiFeedback,
  error,
}) => {
  const { refreshData } = useDashboardData();

  const handleFlushMemory = () => {
    alert('Flushing system memory...');
  };

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
    <div className={`${styles.container} font-sans`}>
      <Head>
        <title>Nexus Flow AI - Dashboard</title>
        <meta name="description" content="Nexus Flow AI Dashboard" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      <Navbar />
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
        refreshDashboardData={refreshData}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return fetchDashboardData(context);
};

export default DashboardPage;
