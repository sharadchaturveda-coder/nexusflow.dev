import styles from '../../styles/Dashboard.module.css';

const DashboardHeader: React.FC = () => {
  return (
    <>
      <h1 className={`${styles.title} text-4xl font-extrabold text-gray-900 mb-4 text-center`}>
        Nexus Flow AI Dashboard
      </h1>
      <p className={`${styles.description} text-xl text-gray-600 mb-10 text-center`}>
        Your control nexus.
      </p>
    </>
  );
};

export default DashboardHeader;
