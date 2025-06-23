import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import SubscriptionCard from '../components/account/SubscriptionCard';
import styles from '../styles/Dashboard.module.css'; // Reusing dashboard styles for layout
import { useUserProTrialActivation } from '@/lib/hooks/useUserProTrialActivation';
import { useBillingData } from '@/lib/hooks/useBillingData';

const BillingPage: React.FC = () => {
  const { handleActivateProTrial } = useUserProTrialActivation();
  const { subscription, loading, error } = useBillingData();

  if (loading) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Nexus Flow AI - Billing</title>
          <meta name="description" content="Nexus Flow AI Billing Page" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <h1 className={styles.title}>Loading...</h1>
          <p className={styles.description}>Loading subscription data...</p>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Nexus Flow AI - Billing</title>
          <meta name="description" content="Nexus Flow AI Billing Page" />
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
    <div className={`${styles.container} font-sans flex`}>
      <Head>
        <title>Nexus Flow AI - Billing</title>
        <meta name="description" content="Nexus Flow AI Billing Page" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      <Navbar />
      <div className="flex-grow p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Manage Your Subscription</h1>
        {subscription ? (
          <SubscriptionCard
            plan={subscription.plan}
            tokens_used={subscription.tokensUsed}
            token_limit={subscription.tokenLimit}
            onActivateProTrial={handleActivateProTrial}
          />
        ) : (
          <p>No subscription data available.</p>
        )}
      </div>
    </div>
  );
};

export default BillingPage;
