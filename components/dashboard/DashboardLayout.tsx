import React from 'react';
import { motion } from 'framer-motion';
import styles from '../../styles/Dashboard.module.css';

interface DashboardSectionProps {
  title: string;
  children: React.ReactNode;
  delay: number;
  className?: string;
}

export const DashboardSection: React.FC<DashboardSectionProps> = ({
  title,
  children,
  delay,
  className,
}) => {
  return (
    <motion.section
      className={`${styles.section} shadow-soft-lg bg-white rounded-xl p-6 flex flex-col ${className}`}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h2>
      {children}
    </motion.section>
  );
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <main className={`${styles.main} pt-20 px-4 sm:px-6 lg:px-8`}>
      <h1 className={`${styles.title} text-4xl font-extrabold text-gray-900 mb-4 text-center`}>
        Nexus Flow AI Dashboard
      </h1>
      <p className={`${styles.description} text-xl text-gray-600 mb-10 text-center`}>
        Your control nexus.
      </p>
      <div className="flex flex-col gap-6 mt-10 w-full">
        {children}
      </div>
    </main>
  );
};
