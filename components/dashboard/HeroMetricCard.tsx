import React from 'react';
import { motion } from 'framer-motion';

interface HeroMetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  delta?: string;
}

const HeroMetricCard: React.FC<HeroMetricCardProps> = ({ title, value, icon, delta }) => {
  return (
    <motion.div
      className="relative p-6 bg-white rounded-xl shadow-lg overflow-hidden hero-metric-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="hero-metric-card-glow absolute inset-0 rounded-xl"></div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="text-4xl font-bold text-gray-800">{value}</div>
        <div className="text-gray-500 text-3xl">{icon}</div>
      </div>
      <div className="text-lg text-gray-600 mb-2">{title}</div>
      {delta && (
        <div className="text-sm text-gray-500">
          {delta}
        </div>
      )}
    </motion.div>
  );
};

export default HeroMetricCard;
