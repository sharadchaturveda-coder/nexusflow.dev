import Head from 'next/head';
import styles from '../../styles/Dashboard.module.css';

interface DashboardErrorPageProps {
  error: string;
}

const DashboardErrorPage: React.FC<DashboardErrorPageProps> = ({ error }) => {
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
};

export default DashboardErrorPage;
