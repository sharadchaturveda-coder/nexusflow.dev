import React from 'react';
import Navbar from '../Navbar';
import styles from '../../styles/Dashboard.module.css';
import DashboardHead from './DashboardHead';

interface DashboardLayoutWrapperProps {
  children: React.ReactNode;
}

const DashboardLayoutWrapper: React.FC<DashboardLayoutWrapperProps> = ({ children }) => {
  return (
    <div className={`${styles.container} font-sans flex`}>
      <DashboardHead />
      <Navbar />
      <div className="flex-grow">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayoutWrapper;
